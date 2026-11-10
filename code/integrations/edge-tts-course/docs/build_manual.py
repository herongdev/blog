"""Render one readable page using the real native-editor screenshot. No installs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 1200, 1698
INK, MUTED, ORANGE, LINE = '#302B27', '#665D56', '#B45E40', '#DBD2C8'
im = Image.new('RGB', (W, H), '#FFFDFC')
d = ImageDraw.Draw(im)
FONT = '/System/Library/Fonts/STHeiti Light.ttc'


def font(size):
    return ImageFont.truetype(FONT, size)


def lines(text, width, size):
    result = []
    for paragraph in text.split('\n'):
        current = ''
        for char in paragraph:
            if d.textlength(current + char, font=font(size)) > width and current:
                if char in '，。；：！？、）】”’.,;:!?':
                    current += char
                    result.append(current)
                    current = ''
                    continue
                if current[-1] in '“‘（【':
                    result.append(current[:-1])
                    current = current[-1] + char
                    continue
                result.append(current)
                current = char
            else:
                current += char
        result.append(current)
    return result


def paragraph(text, x, y, width, size=24, color=INK, leading=36):
    for line in lines(text, width, size):
        d.text((x, y), line, font=font(size), fill=color)
        y += leading
    return y


logo = Image.open(ROOT / 'assets/hr-elephant.png').convert('RGBA')
logo.thumbnail((90, 70))
im.paste(logo, (60, 37), logo)
d.text((175, 35), '微课视频 · 一页操作说明', font=font(38), fill=INK)
d.text((175, 86), '双击“微课视频.app”，无需启动 Codex。', font=font(24), fill=MUTED)
paragraph('首次打开，选择当前 edge-tts-course 工程文件夹，再点“打开工程”。', 60, 133, 1080, 23)
shot = Image.open(ROOT / 'docs/editor-guide.png').convert('RGB')
shot.thumbnail((1080, 600))
im.paste(shot, ((W - shot.width) // 2, 185))
base = 185 + shot.height + 22
d.text((60, base), '实际软件画面：① 场景   ② 台词与停顿   ③ 生成   ④ 结果', font=font(20), fill=MUTED)
base += 43
sections = [
    ('① 改台词或导入整篇', '左侧选场景，修改中间台词，点“保存修改”。\n整篇新稿点“导入新文本”，段落之间留一个空行。原稿自动备份。'),
    ('② 调整每句后的停顿', '修改“句后最少停顿”，单位为秒，例如0.75或2，然后保存。\n原声中更长的自然停顿会保留，语音不变速。'),
    ('③ 选择生成方式', '改台词后点“生成视频”；只改停顿或画面，点“仅更新画面”。\n未改场景复用原声；改一句重配该完整场景。'),
    ('④ 打开结果，遇错看日志', '核验成功后自动打开 MP4，也可点“打开成片”。\n失败看“查看生成日志”；旧成片保留，不表示这次成功。'),
]
for row in range(2):
    ends = []
    for column in range(2):
        title, text = sections[row * 2 + column]
        x = 60 + column * 555
        d.text((x, base), title, font=font(27), fill=ORANGE)
        ends.append(paragraph(text, x, base + 42, 515, 24))
    base = max(ends) + 25
d.line((60, base, 1140, base), fill=LINE, width=2)
base += 19
foot = [
    '命令入口：双击“生成视频.command”或“仅更新画面.command”，不安装、不升级环境。',
    '文稿 lesson.json；备份 projects/history/；原始配音与缓存 narration/，请保留。',
    '输出 output/full-course-original-voice.mp4；完整字幕 output/subtitles.srt。',
    '云希固定：开场 −3%，正文 −5%，音高 +0Hz，音量 +0%。新配音需要连接微软。',
]
for text in foot:
    base = paragraph(text, 60, base, 1080, 21, MUTED, 31) + 5
base = paragraph('工程：/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course', 60, base, 1080, 18, MUTED, 27)
assert base < H - 25, f'Page overflows: {base}'
im.save(ROOT / '操作说明.png', dpi=(144, 144))
print(ROOT / '操作说明.png')
