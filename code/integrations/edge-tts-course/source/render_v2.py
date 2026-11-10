#!/usr/bin/env python3
"""完整课程 v2：可复现视觉工程。语音只能由真实旧音色的配音轨加入，不伪造同步。"""
from pathlib import Path
import math, json, subprocess, shutil, sys
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
W,H,FPS=720,1280,20
BG='#F8F4ED'; INK='#302B27'; SUB='#665D56'; ORANGE='#B45E40'; OPALE='#F2E1D6'; BLUE='#7D8EA4'; BPALE='#E7EDF2'; LINE='#DBD2C8'; WHITE='#FFFDFC'; GRAY='#AAA49B'
FONT='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'; BOLD='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
from functools import lru_cache
@lru_cache(maxsize=100)
def f(n,b=False):return ImageFont.truetype(BOLD if b else FONT,n)
def text(d,x,y,s,n=32,color=INK,b=False,anchor='mm'):
 d.text((x,y),s,font=f(n,b),fill=color,anchor=anchor)
def box(d,xy,fill=WHITE,stroke=LINE,r=23,sw=2):
 d.rounded_rectangle(xy,radius=r,fill=fill,outline=stroke,width=sw)
def line(d,xy,fill=LINE,width=5):d.line(xy,fill=fill,width=width,joint='curve')
svg=ROOT/'assets/HR-logo.svg'
logo_file=ROOT/'assets/hr-elephant.png'
if not logo_file.exists(): raise FileNotFoundError(logo_file)
LOGO=Image.open(logo_file).convert('RGBA')
# 每句字幕的预算时长只用于画面审阅，不代表按真实语音校正。
BEATS=[
('你是不是也这样？',3.4,'intro'),
('一个聊天，用着用着，',3.2,'mixed'),
('工作、产品、技术全混在一起。',4.3,'mixed'),
('继续聊，怕 AI 越来越不靠谱。',4.2,'worries'),
('新开，又怕前面的理解丢了。',4.2,'worries'),
('不分开，下次又找不到。',3.7,'worries'),
('先别按聊天轮数做决定。',3.8,'question'),
('问问：还是刚才那件事吗？',4.4,'question'),
('比如，我们在做网站搜索。',4.0,'search'),
('问题还没解决，AI 正常推进，',4.3,'search'),
('那就继续聊。',3.2,'continue'),
('觉得它开始变笨了？',3.7,'drift'),
('先做一个小检查。',3.6,'check'),
('我们现在要完成什么？',4.0,'check-goal'),
('哪些要求已经定了？',4.0,'check-rules'),
('下一步准备做什么？',4.1,'check-next'),
('核对它说的对不对。',3.8,'check-result'),
('一次答错，不代表聊天废了。',4.5,'check-result'),
('先纠正，再看看是否能推进。',4.3,'correct'),
('如果关键要求持续丢失，',4.2,'drift'),
('纠正后仍然明显跑偏，',4.3,'drift'),
('核对真实进度，考虑交接新开。',5.1,'handoff'),
('另一种情况：搜索做完了。',4.1,'searchdone'),
('现在要开发登录功能。',4.2,'project'),
('仍是同一个网站，但换了任务。',4.7,'project'),
('可以在同一个 Project 直接新开。',5.0,'project-new'),
('不用每次写一篇交接报告。',4.5,'project-new'),
('可是新聊天知道旧决定吗？',4.3,'project-question'),
('Project 可以提供相关背景，',4.4,'project-question'),
('但不保证每条结论都准确带上。',5.0,'project-question'),
('比如之前分别讨论了：',3.8,'three'),
('数据库、页面、还有权限。',4.8,'three'),
('现在做登录，要用到其中三条决定。',5.0,'extract'),
('只找出需要的结论，',3.9,'extract'),
('核对之后，带进新聊天。',4.2,'extract-done'),
('不要搬运三份聊天记录。',4.2,'extract-done'),
('如果是接着没做完的任务呢？',4.4,'handoff'),
('还要带上已完成、待办和下一步。',5.0,'handoff-details'),
('这才叫交接。',3.0,'handoff-details'),
('想保留方案 A，再试方案 B？',5.1,'fork'),
('那就分叉。',3.1,'fork'),
('分叉不是一键清空旧历史。',4.6,'fork-limit'),
('也不保证更快。',3.0,'fork-limit'),
('来试一下：搜索做完，转做登录，',5.0,'quiz'),
('只需要已有项目说明，怎么办？',5.4,'quiz'),
('',2.0,'quiz'),
('直接新开。',3.0,'quiz-answer'),
('如果还需要旧聊天的三条决定？',5.1,'quiz2'),
('',2.0,'quiz2'),
('找出来、核对，再带过去。',4.6,'quiz2-answer'),
('所以，不是越长就越该换。',4.1,'close'),
('看任务变没变，还缺什么信息。',5.2,'close'),
('把聊天分清，把有用的结论留下。',5.0,'close'),
('下次就不用考古了。',3.8,'end'),
('关注我，下回见。',3.8,'end')
]
CUES=[];s=0
for i,(cap,dur,state) in enumerate(BEATS):
 dur = 2.0 if not cap else max(2.2,min(4.6,0.8+len(cap)/5.0))
 CUES.append({'i':i,'text':cap,'start':round(s,2),'end':round(s+dur,2),'scene':state});s+=dur
DURATION=round(s,2)

def draw_chat(d,mode='mixed'):
 box(d,(111,302,609,804),WHITE,LINE,28)
 for j in range(3):d.ellipse((138+j*20,321,148+j*20,331),fill='#D6C5B7')
 line(d,(130,359,588,359),LINE,2)
 if mode=='mixed':
  for j,(lab,c) in enumerate([('工作',ORANGE),('产品',BLUE),('技术',ORANGE),('生活',BLUE),('工作',ORANGE)]):
   xx=142 if j%2==0 else 237;yy=394+j*76
   box(d,(xx,yy,xx+323,yy+59),OPALE if j%2==0 else BPALE,None,16,0)
   text(d,xx+161,yy+29,lab,31,c,True)
 else:
  for j in range(3):box(d,(141,404+j*96,552,468+j*96),OPALE if j==0 else '#F1ECE5',None,18,0)

def project(d,login=False,question=False):
 box(d,(91,327,629,784),WHITE,LINE,27)
 text(d,360,394,'网站 Project',37,INK,True)
 line(d,(139,437,580,437),LINE,2)
 for i,(lab,active) in enumerate([('搜索功能',False),('登录功能',login)]):
  y=484+112*i
  box(d,(141,y,579,y+78),OPALE if active else '#F3EEE8',ORANGE if active else LINE,17,3 if active else 1)
  text(d,360,y+39,lab,33,ORANGE if active else INK,active)
 if question:text(d,360,851,'旧聊天的决定呢？',38,ORANGE,True)

def search(d,complete=False):
 box(d,(105,314,615,791),WHITE,LINE,26)
 for i in range(3):d.ellipse((132+i*19,335,143+i*19,346),fill='#D6C7B9')
 line(d,(126,380,594,380),LINE,2)
 text(d,156,429,'文章搜索',37,INK,True,'lm')
 box(d,(137,475,582,548),BG,LINE,16)
 text(d,178,513,'关键词...',29,GRAY,False,'lm')
 box(d,(442,486,565,539),ORANGE,None,14,0)
 text(d,503,512,'搜索',28,WHITE,True)
 if complete:
  for i in range(2):
   y=573+i*88
   box(d,(143,y,578,y+72),'#F8F5F0',None,13,0)
   line(d,(175,y+26,472,y+26),fill='#CEBEB2',width=9)
   line(d,(175,y+46,372,y+46),fill='#E5DCD3',width=6)
 else:text(d,360,640,'正在处理搜索任务',30,SUB)

def check(d,variant):
 box(d,(106,346,614,749),WHITE,LINE,25)
 options=[('目标','现在要做什么'),('要求','哪些决定仍有效'),('下一步','接着做什么')]
 for i,(lab,desc) in enumerate(options):
  y=388+i*110;active=(variant=='result' or (variant=='goal' and i==0) or (variant=='rules' and i<=1) or (variant=='next' and i<=2))
  box(d,(144,y,576,y+80),OPALE if active else '#F4F0EB',ORANGE if active else LINE,15,2 if active else 1)
  text(d,200,y+40,lab,31,ORANGE if active else SUB,True)
  text(d,398,y+40,desc,23,INK if active else GRAY)

def three(d,collect=False):
 labs=['数据库','页面','权限'];cols=[ORANGE,BLUE,'#827F95']
 for i,(lab,col) in enumerate(zip(labs,cols)):
  x=76+i*204
  box(d,(x,403,x+180,555),WHITE,col,21,3)
  text(d,x+90,477,lab,34,col,True)
  if collect:line(d,(x+90,567,360,662),col,5)
 if collect:
  box(d,(166,671,554,787),OPALE,ORANGE,22,3)
  text(d,360,716,'登录任务',38,ORANGE,True)
  text(d,360,764,'只带需要的结论',25,SUB)

def fork(d,limit=False):
 line(d,(360,345,360,490),ORANGE,10)
 d.ellipse((344,473,376,505),fill=ORANGE)
 line(d,(360,489,218,584),ORANGE,8);line(d,(360,489,502,584),BLUE,8)
 for x,c,lab in [(75,ORANGE,'方案 A'),(379,BLUE,'方案 B')]:
  box(d,(x,602,x+266,796),WHITE,c,24,3)
  text(d,x+133,665,lab,41,c,True)
  for j in range(2):box(d,(x+34,704+j*33,x+233,720+j*33),OPALE if x==75 else BPALE,None,7,0)
 if limit:text(d,360,879,'分叉 ≠ 清空上下文',32,ORANGE,True)

def handoff(d,details=False):
 box(d,(159,363,561,796),WHITE,LINE,28)
 text(d,360,430,'交接卡',42,ORANGE,True)
 labels=['当前目标','已完成','待办','下一步']
 for j,lab in enumerate(labels if details else labels[:2]):
  y=496+j*69
  d.ellipse((198,y-12,221,y+11),fill=OPALE)
  text(d,264,y,lab,30,INK,False,'lm')
  line(d,(421,y,511,y),LINE,5)

def draw_scene(d,state):
 if state=='plain':
  line(d,(102,340,618,340),LINE,2)
  line(d,(102,842,618,842),LINE,2)
 elif state in ('intro','mixed'):draw_chat(d,'mixed')
 elif state=='worries':
  draw_chat(d,'mixed')
  text(d,360,869,'越聊越乱？',43,ORANGE,True)
 elif state=='question':
  draw_chat(d,'clean');text(d,360,870,'还是同一件事吗？',41,ORANGE,True)
 elif state in ('search','continue','searchdone'):
  search(d,complete=state=='searchdone')
  if state=='continue':text(d,360,864,'继续聊',45,ORANGE,True)
  if state=='searchdone':text(d,360,864,'搜索完成',42,ORANGE,True)
 elif state=='drift':
  search(d,True)
  box(d,(156,822,564,902),OPALE,ORANGE,16,2);text(d,360,861,'要求又理解错了？',35,ORANGE,True)
 elif state.startswith('check'):
  check(d,{'check':'goal','check-goal':'goal','check-rules':'rules','check-next':'next','check-result':'result'}[state])
 elif state=='correct':
  check(d,'result');text(d,360,857,'先纠正，再核对',37,ORANGE,True)
 elif state in ('handoff','handoff-details'):handoff(d,state=='handoff-details')
 elif state.startswith('project'):
  project(d,state!='project',state=='project-question')
  if state=='project-new':text(d,360,879,'同项目 · 新聊天',34,ORANGE,True)
 elif state in ('three','extract','extract-done'):
  three(d,state!='three')
 elif state in ('fork','fork-limit'):fork(d,state=='fork-limit')
 elif state in ('quiz','quiz-answer','quiz2','quiz2-answer'):
  if state=='quiz2':three(d,False)
  else:project(d,True)
  if state in ('quiz-answer','quiz2-answer'):
   box(d,(149,860,571,936),ORANGE,None,18,0)
   text(d,360,898,'直接新开' if state=='quiz-answer' else '提取结论，再新开',35,WHITE,True)
 elif state in ('close','end'):
  box(d,(109,397,611,733),WHITE,LINE,29)
  text(d,360,501,'任务变了吗？',43,ORANGE,True)
  text(d,360,634,'需要带走什么？',43,INK,True)

def draw_frame(scene,caption,progress=1.0):
 im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
 d.arc((-270,-260,265,360),10,94,fill='#E9DDD0',width=33)
 d.arc((570,997,980,1510),112,240,fill='#E9DDD0',width=34)
 # 原始 HR 小象标志，以原 svg 渲染，保持完整比例。
 scaled=LOGO.resize((91,59),Image.Resampling.LANCZOS)
 im.paste(scaled,(594,55),scaled)
 d=ImageDraw.Draw(im)
 draw_scene(d,scene)
 if scene=='plain' and caption:
  # A new script gets its own readable text, never an unrelated website illustration.
  chunks=[];current=''
  for char in caption:
   if d.textlength(current+char,font=f(48,True))>600 and current:
    chunks.append(current);current=char
   else:current+=char
  if current:chunks.append(current)
  for i,chunk in enumerate(chunks[:6]):text(d,360,590+(i-(min(6,len(chunks))-1)/2)*68,chunk,48,INK,True)
 # 底部仅此一处字幕，居中且可读；展示时长由分镜预算决定。
 if caption:
  fs=42
  while d.textbbox((0,0),caption,font=f(fs,True))[2]>655 and fs>29:fs-=2
  tw=d.textbbox((0,0),caption,font=f(fs,True))[2]
  box(d,(max(14,int(360-tw/2-20)),1057,min(706,int(360+tw/2+20)),1148),WHITE,None,18,0)
  text(d,360,1102,caption,fs,INK,True)
 return im

def run():
 frames=ROOT/'frames_v2';frames.mkdir(exist_ok=True)
 playlist=['ffconcat version 1.0']
 previous=None
 for i,c in enumerate(CUES):
  current=draw_frame(c['scene'],c['text'])
  dur=round(c['end']-c['start'],3)
  # 旧内容短暂退出、新画面进入后保持静止；转场不占满阅读时间。
  if previous is not None:
   for j,a in enumerate([0.38,0.76]):
    transitional=Image.blend(previous,current,a)
    fn=frames/f'{i:03}-transition-{j}.png';transitional.save(fn,optimize=True)
    playlist+=['file '+str(fn),'duration 0.10']
   dur-=0.20
  fn=frames/f'{i:03}.png';current.save(fn,optimize=True)
  playlist+=['file '+str(fn),'duration '+str(round(dur,3))]
  previous=current
  if i%10==0:print('rendered scene',i+1,'/',len(CUES),flush=True)
 playlist+=['file '+str(fn)]
 (frames/'timeline.ffconcat').write_text('\n'.join(playlist)+'\n')
 (ROOT/'timeline_v2.json').write_text(json.dumps({'type':'silent_visual_preview','length_seconds':DURATION,'cues':CUES,'note':'timestamps are storyboard durations, not speech-aligned'},ensure_ascii=False,indent=2))
 out=ROOT/'长任务微课-完整新版v2-画面试看.mp4'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(frames/'timeline.ffconcat'),'-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=48000','-vf',f'fps={FPS},format=yuv420p','-map','0:v:0','-map','1:a:0','-t',str(DURATION),'-c:v','libx264','-preset','veryfast','-crf','19','-c:a','aac','-b:a','96k','-movflags','+faststart',str(out)],check=True)
 print('wrote',out,DURATION)
 indices=[2,8,14,21,25,32,37,40,53]
 thumbs=[]
 for i in indices:
  thumbs.append(Image.open(frames/f'{i:03}.png').resize((180,320)))
 sheet=Image.new('RGB',(180*len(thumbs),320),BG)
 for i,im in enumerate(thumbs):sheet.paste(im,(i*180,0))
 sheet.save(ROOT/'新版画面检查.png')
if __name__=='__main__':run()
