export const WORKFLOW_VERSION = 'microcourse-v1';
export const RULES_REF = 'microcourse-workbench-2026-11-09-v1';
const check = (id, label, methods) => ({ id, label, methods });
export const METHODS = ['document_review', 'source_review', 'file_review', 'comparison', 'playback', 'mobile_preview', 'automated'];
export const PRODUCTION_STAGES = [
  { id: 'S01', name: '标题与封面方向', description: '写出真实工作痛点、标题承诺和封面方向；后续学习目标变化时再核对。', requiredChecks: [check('title_promise', '标题和封面承诺与本期范围一致', ['document_review'])] },
  { id: 'S02', name: '唯一学习目标', description: '明确观众、一个可独立完成的动作或判断、前提和排除项。', requiredChecks: [check('single_goal', '只有一个可验证的学习目标，前提与边界明确', ['document_review'])] },
  { id: 'S03', name: '事实与边界', description: '记录来源、核对日期、适用范围；区分官方资料、实际观察、推断和未知。', requiredChecks: [check('sources', '事实有可回查来源，来源和日期已核对', ['source_review']), check('boundaries', '实际观察、推断、未知及适用边界分别说明', ['document_review', 'source_review'])] },
  { id: 'S04', name: '教学路径', description: '围绕一个例子连接问题、答案、操作或判断，以及可观察的检查结果。', requiredChecks: [check('learning_path', '案例兑现学习目标，必要条件和结果检查完整', ['document_review'])] },
  { id: 'S05', name: '视觉焦点与分镜', description: '比较视觉方向，记录选定分镜、焦点交接和有用途的观察停顿。', requiredChecks: [check('visual_focus', '方向比较与分镜明确，一次一个焦点', ['document_review', 'comparison']), check('storyboard_readability', '按手机观看尺寸核对分镜可读性', ['mobile_preview'])] },
  { id: 'S06', name: '口播与停顿', description: '保存逐句口播、术语解释、语义停顿和已选音色要求；修改会影响声音与字幕。', requiredChecks: [check('narration', '口播连贯、术语解释及时，停顿有用途', ['document_review']), check('voice_requirement', '明确音色及参考，不把候选音色当成已验收', ['document_review', 'comparison'])] },
  { id: 'S07', name: '片尾与平台版本', description: '承接本期收获，只留一个主要行动，记录不同平台版本及真实可用入口。', requiredChecks: [check('ending', '片尾贴题，主要行动与推荐入口真实可用', ['document_review', 'source_review'])] },
  { id: 'S08', name: '试看片与验收', description: '归档实际导出的视频、封面、声音和字幕，检查本次文件，不以旧截图或配置代替成片。', requiredChecks: [check('media_playback', '正常速度观看并听查本次成片', ['playback']), check('media_sync', '实际听看声音、字幕和画面同步', ['playback']), check('mobile_readability', '在手机观看尺寸核对字幕、焦点和安全区', ['mobile_preview']), check('learning_loop', '本次成片完整回答问题，观众知道下一步和检查结果', ['playback'])] },
  { id: 'S09', name: '配套 Markdown 文章', description: '整理完整正文、信息头、来源与资源引用，保持文章与当前视频一致；发布另行记录。', requiredChecks: [check('article_consistency', '文章与当前视频的事实、术语和结论一致', ['comparison', 'document_review']), check('frontmatter', 'Markdown 信息头、来源和资源引用合法，无占位内容', ['document_review', 'automated'])] },
];
export const ARTIFACT_CHECKS = {
  video: PRODUCTION_STAGES[7].requiredChecks,
  audio: [check('audio_voice', '实际听查音色、清晰度及停顿', ['playback', 'comparison'])],
  subtitle: [check('subtitle_alignment', '字幕与实际声音对齐，内容和可读性已检查', ['playback', 'mobile_preview'])],
  cover: [check('cover_readability', '封面独立文件及缩略图裁切可读', ['mobile_preview', 'file_review'])],
  article: PRODUCTION_STAGES[8].requiredChecks,
  image: [check('image_review', '实际查看图片及用途，来源和可读性已核对', ['file_review', 'mobile_preview'])],
  project: [check('project_review', '工程文件及引用资源可获取', ['file_review'])],
  other: [check('file_review', '文件可获取且用途明确', ['file_review'])],
};
