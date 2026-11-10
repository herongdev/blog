#!/usr/bin/env python3
"""Restore the verified episode-one voice and render the approved complete course.
No paid API, no alternative voice, no silent 'final' export. Network required for Edge TTS.
"""
from __future__ import annotations
import argparse, importlib.util, json, os, math, shutil, subprocess, sys, wave
from pathlib import Path
from functools import lru_cache
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
OUT = Path(os.environ.get('COURSE_OUTPUT_DIR', str(BASE / 'output'))).resolve()
OUT.mkdir(exist_ok=True)
LESSON = Path(os.environ.get('COURSE_LESSON_FILE', str(BASE / 'lesson.json'))).resolve()
W, H, FPS, SIZE = 720, 1280, 24, 48
VOICE = 'zh-CN-YunxiNeural'

def setup_ffmpeg():
    binary = shutil.which('ffmpeg')
    if not binary:
        import imageio_ffmpeg
        binary = imageio_ffmpeg.get_ffmpeg_exe()
    # The original generator calls the executable name, so expose the packaged binary on PATH.
    bindir = BASE / '.bin'; bindir.mkdir(exist_ok=True)
    link = bindir / ('ffmpeg.exe' if os.name == 'nt' else 'ffmpeg')
    if not link.exists():
        try: link.symlink_to(binary)
        except OSError: shutil.copy2(binary, link)
    os.environ['PATH'] = str(bindir) + os.pathsep + os.environ.get('PATH', '')
    return str(link)

FFMPEG = setup_ffmpeg()

def ff(args):
    subprocess.run([FFMPEG, '-nostdin', '-hide_banner', '-v', 'error', '-y', *map(str,args)], check=True)

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

def font_paths():
    candidates = [os.environ.get('COURSE_FONT',''),
                  '/System/Library/Fonts/PingFang.ttc',
                  '/System/Library/Fonts/STHeiti Light.ttc',
                  '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
                  '/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf',
                  'C:/Windows/Fonts/msyh.ttc']
    regular = next((p for p in candidates if p and Path(p).is_file()), None)
    if not regular:
        raise RuntimeError('未找到中文字体。请安装 Noto Sans CJK 或设置 COURSE_FONT，不能使用缺字字体。')
    bold = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
    return regular, bold if Path(bold).is_file() else regular

def prepare_renderer():
    module = load_module('visuals', BASE / 'source/render_v2.py')
    module.FONT, module.BOLD = font_paths()
    module.f.cache_clear()
    return module

def norm_positions(text):
    import unicodedata
    return [i for i,c in enumerate(text) if not c.isspace() and not unicodedata.category(c).startswith('P')]

def make_caption_chunks(text, events, base_time, cue_end, font):
    """Split only at genuine TTS word boundaries; preserve every original character."""
    pos = norm_positions(text)
    spans=[]; cursor=0
    for ev in events:
        n = len(norm_positions(ev['text']))
        if not n: continue
        a = 0 if cursor==0 else pos[cursor]
        cursor += n
        b = len(text) if cursor == len(pos) else pos[cursor]
        spans.append((a,b,ev))
    if cursor != len(pos):
        raise RuntimeError('字幕与真实语音词序未对应；停止，不制造逐词时间。')
    # Dynamic programming balances short semantic chunks without shrinking typography.
    n=len(spans); memo={n:(0.0, [])}
    for i in range(n-1,-1,-1):
        choices=[]
        for j in range(i+1,n+1):
            snippet=text[spans[i][0]:spans[j-1][1]]
            width=font.getlength(snippet)
            if width>642: break
            if j not in memo: continue
            count=len(norm_positions(snippet))
            punctuation = snippet.rstrip().endswith(('，','。','？','；','！','：'))
            cost=100 + (642-width)/45 + (24 if count<4 else 0) - (5 if punctuation else 0)
            choices.append((cost+memo[j][0],[(i,j)]+memo[j][1]))
        if choices: memo[i]=min(choices,key=lambda x:x[0])
    if 0 not in memo: raise RuntimeError('单个语音词太长，无法在固定字号下显示。')
    result=[]
    for i,j in memo[0][1]:
        a,b=spans[i][0],spans[j-1][1]
        words=[]
        for x,y,ev in spans[i:j]:
            words.append({'start':base_time+ev['offset']/1e7,
                          'end':base_time+(ev['offset']+ev['duration'])/1e7,
                          'character_end':y-a,'text':text[x:y]})
        start=words[0]['start']
        end=(base_time+spans[j][2]['offset']/1e7) if j<n else cue_end
        result.append({'start':start,'end':end,'text':text[a:b], 'words':words})
    return result

def timecode(t):
    n=round(t*1000); h,n=divmod(n,3600000); m,n=divmod(n,60000);s,ms=divmod(n,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'

def render():
    gen=load_module('original_narration', BASE/'source/generate_narration.py')
    visual=prepare_renderer(); font=ImageFont.truetype(visual.BOLD,SIZE)
    lesson=json.loads(LESSON.read_text())
    timeline=[]; audio_paths=[]; total_samples=0; sr=48000
    for scene in lesson['scenes']:
        folder=BASE/'narration'
        meta=json.loads((folder/f"{scene['id']}.metadata.json").read_text())
        if meta.get('status')!='complete' or meta.get('voice') != VOICE:
            raise RuntimeError('配音缺失或音色不一致，禁止导出成片。')
        if meta.get('request_sha256')!=gen.request_fingerprint(scene):
            raise RuntimeError('缓存属于旧稿，禁止将旧声音盖到新版画面上。')
        path=folder/meta['audio']; audio_paths.append(path)
        with wave.open(str(path),'rb') as w:
            if (w.getframerate(), w.getnchannels(), w.getsampwidth())!=(sr,1,2):
                raise RuntimeError('旁白格式不一致。')
            count=w.getnframes()
        base=total_samples/sr; duration=count/sr
        events=json.loads((folder/meta['words']).read_text())
        mapping=gen.map_cues(scene,events)
        for i,(cue,span) in enumerate(zip(scene['cues'],mapping)):
            selected=events[span['first_event']:span['last_event']+1]
            cue_end = base + (events[mapping[i+1]['first_event']]['offset']/1e7 if i+1<len(mapping) else duration)
            chunks=make_caption_chunks(cue['text'],selected,base,cue_end,font)
            for c in chunks:
                c['scene']=cue['visual_state']; timeline.append(c)
        total_samples += count
    actual=total_samples/sr
    # Audio is never stretched. All source samples, including verified teaching pauses, remain intact.
    master=OUT/'narration.wav'
    with wave.open(str(master),'wb') as dst:
        dst.setnchannels(1); dst.setsampwidth(2); dst.setframerate(sr)
        for path in audio_paths:
            with wave.open(str(path),'rb') as src:
                dst.writeframes(src.readframes(src.getnframes()))
    (OUT/'actual-timing.json').write_text(json.dumps({'voice':VOICE,'duration':actual,'cues':timeline},ensure_ascii=False,indent=2))
    (OUT/'subtitles.srt').write_text('\n\n'.join(f'{i+1}\n{timecode(c["start"])} --> {timecode(c["end"])}\n{c["text"]}' for i,c in enumerate(timeline))+'\n')
    frames=OUT/'frame-cache';frames.mkdir(exist_ok=True)
    @lru_cache(maxsize=40)
    def background(state):return visual.draw_frame(state,'')
    @lru_cache(maxsize=800)
    def caption_frame(state,text,until):
        im=background(state).copy();d=ImageDraw.Draw(im)
        if state == 'plain':
            center_font=ImageFont.truetype(visual.BOLD,54)
            lines=[]; current=''
            for char in text:
                if current and center_font.getlength(current+char)>600:
                    lines.append(current); current=char
                else: current+=char
            if current: lines.append(current)
            top=590-len(lines)*38
            for index,line in enumerate(lines):
                d.text(((W-center_font.getlength(line))/2,top+index*76),line,
                       font=center_font,fill='#302B27',anchor='lt')
        width=font.getlength(text);x=(W-width)/2;y=1068
        if width>642:raise RuntimeError('字幕超宽。')
        d.rounded_rectangle((x-17,y-15,x+width+17,y+68),radius=18,fill='#FFFDFC')
        d.text((x,y),text,font=font,fill='#302B27',anchor='lt')
        # The complete phrase is readable; only real spoken word events change its color.
        if until:d.text((x,y),text[:until],font=font,fill='#B45E40',anchor='lt')
        return im
    # Render a sparse, deterministic sequence, preserving exact speech time at frame boundaries.
    last_frame=math.ceil(actual*FPS)
    changes={0:(timeline[0]['scene'],timeline[0]['text'],0)}
    for c in timeline:
        start=max(0,round(c['start']*FPS));end=min(last_frame,round(c['end']*FPS))
        changes[start]=(c['scene'],c['text'],0)
        for word in c['words']:
            f=min(end-1,max(start,round(word['start']*FPS)))
            changes[f]=(c['scene'],c['text'],word['character_end'])
    points=sorted(k for k in changes if k<last_frame)+[last_frame]
    playlist=['ffconcat version 1.0'];last_png=None
    for idx,(a,b) in enumerate(zip(points,points[1:])):
        if b<=a:continue
        state,text,until=changes[a]
        png=frames/f'{idx:05}.png'
        caption_frame(state,text,until).save(png)
        # A relative path avoids quote and non-ASCII directory escaping problems.
        playlist.extend([f"file 'frame-cache/{png.name}'",f'duration {(b-a)/FPS:.9f}'])
        last_png=png
    playlist.append(f"file 'frame-cache/{last_png.name}'")
    concat=OUT/'pictures.ffconcat';concat.write_text('\n'.join(playlist)+'\n')
    picture=OUT/'picture.mp4'
    ff(['-f','concat','-safe','0','-i',concat,'-vf',f'fps={FPS},format=yuv420p',
        '-frames:v',last_frame,'-c:v','libx264','-preset','fast','-crf','18',picture])
    final=OUT/'full-course-original-voice.mp4'
    ff(['-i',picture,'-i',master,'-map','0:v:0','-map','1:a:0','-c:v','copy',
        '-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',final])
    ff(['-i',final,'-map','0:v:0','-map','0:a:0','-f','null','-'])
    (OUT/'verification.json').write_text(json.dumps({'voice':VOICE,'original_voice_config_verified':True,
      'speech_speed_modified_after_synthesis':False,'actual_audio_seconds':actual,
      'video_frame_count':last_frame,'fps':FPS,'max_audio_video_delta_seconds':abs(last_frame/FPS-actual),
      'complete_decode_passed':True,'auditory_quality_review':'not_performed','paid_plugins_used':False},indent=2))
    print('\n生成完成：',final,'\n实际旁白时长：',round(actual,2),'秒。请正常速度听看后审阅。')
    if sys.platform=='darwin' and os.environ.get('COURSE_NO_OPEN') != '1':
        subprocess.run(['/usr/bin/open',str(final)],check=False)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--render-only',action='store_true');args=parser.parse_args()
    try:
        narration_args = ['--cache-only'] if args.render_only else []
        subprocess.run([sys.executable,str(BASE/'source/generate_narration.py'),*narration_args],check=True)
        render()
    except Exception as exc:
        print('\n没有生成完成版：',str(exc),'\n没有切换声音、没有使用收费服务，也不会把静音文件冒充完成版。',file=sys.stderr)
        raise SystemExit(1)
