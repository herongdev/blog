# 首页领域封面制作记录


## 暗色配对版本

通过内置 imagegen 对每张浅色原图执行编辑，保留构图与主体，替换摄影环境并重新布光。文件为同目录 `{field}-dark-v1.jpg`（六个 field 与上文对应），1200×800 JPEG。明暗图由页面 `.dark` 类切换，非系统媒体查询，支持手动主题选择。无全图亮度或饱和度滤镜。

六张均使用以下完整编辑提示词，各自仅引用对应浅色封面：

Use case: lighting-weather. Edit target: the attached existing portfolio concept cover. Create its DARK THEME matching version. Preserve exactly the subject geometry, object arrangement, viewpoint, framing, proportions and colored glass hue. Change only studio environment and lighting: replace ivory backdrop AND floor with seamless deep graphite #1c2028, low-key professional product photography, controlled soft rim lights revealing titanium bevels and colored glass refraction, no broad white surfaces; porcelain stays material-correct but receives subdued cool gray illumination. Keep rich colored glass and readable fine detail; not a global dimming filter, not desaturated, not underexposed. No neon glow, bloom, text, logos, extra objects. Same 3:2 landscape aspect and composition. Polished but comfortable for night viewing.


使用内置 imagegen 生成六张独立概念封面，不是项目实拍或产品截图。原始 PNG 保留在生成目录，网站使用 1200×800 JPEG（质量 85），无额外滤镜。图片主体完整显示，不裁切关键结构。生成日期：2026-09-23。

素材目录：`code/apps/blog/docs/public/covers/`。

## 完整提示词

### ai-agent

文件：`code/apps/blog/docs/public/covers/ai-agent-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: AI and autonomous orchestration: a precision violet optical core assembled from nested translucent glass prisms, several finely machined branching titanium conduits connect three distinct small modules into one purposeful system. Elegant asymmetrical balance, not a random cluster of cubes.

### enterprise

文件：`code/apps/blog/docs/public/covers/enterprise-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: Digital twins and spatial systems: an architectural terrain model with finely layered porcelain contour lines, a winding emerald glass river, a small beautifully proportioned architectural block cluster, a thin elevated transparent surveying plane. Concrete physical model, not an application screenshot.

### finance

文件：`code/apps/blog/docs/public/covers/finance-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: Realtime financial systems: a sculptural sequence of finely machined titanium vertical fins at varying heights, a single continuous rich cobalt glass ribbon threads through the fins, precise rhythm and measured spatial intervals. Abstract market dynamics, no chart axes or numbers.

### fullstack

文件：`code/apps/blog/docs/public/covers/fullstack-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: Commerce and full stack delivery: an elegant exploded assembly of three porcelain and amber optical-glass modular trays connected by precise titanium alignment pins, a few inset amber modules fitting into corresponding recesses, architectural product-system composition, no boxes with labels or shopping icons.

### video-live

文件：`code/apps/blog/docs/public/covers/video-live-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: Short video and live streaming: a sophisticated optical sculpture with three staggered translucent rose glass aperture frames and a polished titanium lens assembly; a fine sculpted rose glass wave passes through the frames, expressing transmission and motion. Not a camera product advertisement or a play icon.

### learning

文件：`code/apps/blog/docs/public/covers/learning-v1.jpg`

Use case: stylized-concept. Asset type: premium personal engineering portfolio field cover, one independent wide landscape image, 1536x1024. Art direction: collectible precision-engineered sculptural study photographed in a high-end design studio; ivory seamless background, brushed titanium, porcelain and richly colored translucent optical glass, fine bevels, credible refraction, tactile microtexture, soft directional daylight, crisp contact shadows. Restrained sophisticated editorial art, not a stock tech illustration. One coherent central composition with generous negative space; all meaningful geometry inside central 80% width and 65% height so a wide card crop preserves it. No text, letters, digits, UI, screens, interface panels, logos, watermark, people, robots, emojis or pictogram icons. Beautiful material contrast, clear silhouette at small card size. Subject: Technical writing and systematic learning: a fanned sequence of fine porcelain sheets and teal optical-glass layers arranged as an elegant open architectural folio on a titanium spine, visible precise edges and a continuous progression of layers. No writing, books with titles, UI or icons.
