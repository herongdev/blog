'use strict';

(() => {
  const $ = (id) => document.getElementById(id);
  const sceneNames = {
    intro: '开场', continue: '继续聊', check: '核对与纠正', new: '新开会话',
    combine: '提取结论', handoff: '任务交接', fork: '分叉方案', quiz: '练习', close: '结尾',
  };
  const phases = { preflight: '检查运行环境', generating: '处理旁白、停顿与画面', synthesis: '生成旁白与停顿', narration: '生成旁白与停顿', render: '生成画面与字幕', rendering: '生成画面与字幕', validating: '检查视频和音轨', verify: '检查视频和音轨', verification: '检查视频和音轨', publishing: '保存本次成片', publish: '保存本次成片', complete: '生成完成' };
  const state = {
    project: null, baseline: null, visuals: [], sceneId: null, cueIndex: 0,
    edits: new Map(), saving: false, launching: false, importing: false, running: false,
    outputAvailable: false, outputUrl: '/media/final.mp4', activeTab: 'scene',
    ownJobId: null, openedJobId: null, lastVideoVersion: null, pollBusy: false,
    previewSerial: 0, previewTimer: null, conflict: false,
  };
  const themeState = { choiceRevision: 0, writeQueue: Promise.resolve() };

  class ApiError extends Error {
    constructor(message, status) { super(message); this.status = status; }
  }

  async function api(path, body) {
    const options = body === undefined ? { cache: 'no-store' } : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    };
    let response;
    try { response = await fetch(path, options); }
    catch (_) { throw new ApiError('无法连接本机编辑器。请重新打开“微课视频”。', 0); }
    const content = response.headers.get('content-type') || '';
    let result;
    try { result = content.includes('application/json') ? await response.json() : { error: await response.text() }; }
    catch (_) { throw new ApiError('收到的本机响应不完整，请重试。', response.status); }
    if (!response.ok) {
      const error = result.error || result.message;
      const message = typeof error === 'string' ? error : error?.message;
      throw new ApiError(message || `操作未完成（${response.status}）。`, response.status);
    }
    return result;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function notice(message, kind = 'info', reload = false) {
    $('message-text').textContent = message;
    $('message').dataset.kind = kind;
    $('message').hidden = false;
    $('reload-button').hidden = !reload;
  }

  function showError(error) {
    if (error.status === 409 && error.message.includes('重新载入')) {
      state.conflict = true;
      notice(`${error.message} 当前未保存的修改仍保留在窗口中。`, 'error', true);
    } else notice(error.message || String(error), 'error');
    syncControls();
  }

  function selectedScene() { return state.project?.lesson.scenes.find((s) => s.id === state.sceneId); }
  function dirty() { return state.edits.size > 0; }
  function busy() { return state.saving || state.launching || state.importing || state.running; }
  function sceneName(scene, index) { return sceneNames[scene.id] || scene.title || (index === 0 ? '开场' : `段落 ${index + 1}`); }

  function syncControls() {
    const loaded = Boolean(state.project);
    $('save-button').disabled = !loaded || !dirty() || busy() || state.conflict;
    $('generate-button').disabled = !loaded || busy() || state.conflict;
    $('render-button').disabled = !loaded || busy() || state.conflict;
    $('import-button').disabled = !loaded || busy() || state.conflict;
    $('open-output').disabled = !state.outputAvailable;
    $('generate-button').textContent = state.launching ? '正在启动' : state.running ? '生成中' : '生成视频';
    $('save-state').textContent = state.saving ? '正在保存' : state.conflict ? '文稿已在其他位置更新' : dirty() ? `${state.edits.size} 句有未保存修改` : loaded ? '已保存到本机' : '正在读取文稿';
    $('save-state').parentElement.dataset.dirty = String(dirty());
    document.querySelectorAll('.cue textarea, .cue input, .cue select').forEach((input) => { input.disabled = busy(); });
    $('confirm-import').disabled = state.importing || state.saving || state.running;
    $('confirm-import').textContent = state.importing ? '正在导入' : '导入文稿';
    ['import-name', 'import-text', 'close-import', 'cancel-import'].forEach((id) => { $(id).disabled = state.importing; });
  }

  function adoptProject(project, keepSelection = true) {
    state.project = project;
    state.baseline = JSON.parse(JSON.stringify(project.lesson));
    state.edits.clear();
    state.conflict = false;
    if (!keepSelection || !project.lesson.scenes.some((s) => s.id === state.sceneId)) {
      state.sceneId = project.lesson.scenes[0]?.id || null;
      state.cueIndex = 0;
    }
    const scene = selectedScene();
    state.cueIndex = Math.min(state.cueIndex, Math.max(0, (scene?.cues.length || 1) - 1));
    $('project-title').textContent = project.lesson.title || '微课文稿';
    $('project-title').title = project.lesson.title || '';
    const count = project.lesson.scenes.reduce((sum, s) => sum + s.cues.length, 0);
    $('script-summary').textContent = `${project.lesson.scenes.length} 个场景 · ${count} 句台词 · 文稿保存在本机`;
    renderScenes();
    renderCues();
    syncControls();
  }

  function renderScenes() {
    const list = $('scene-list');
    list.replaceChildren();
    $('scene-count').textContent = state.project.lesson.scenes.length;
    state.project.lesson.scenes.forEach((scene, index) => {
      const button = el('button', 'scene-button');
      button.type = 'button';
      button.dataset.sceneId = scene.id;
      button.setAttribute('aria-current', String(scene.id === state.sceneId));
      button.setAttribute('aria-label', `${index + 1} ${sceneName(scene, index)}，${scene.cues.length}句`);
      button.append(el('span', 'scene-number', String(index + 1).padStart(2, '0')), el('span', 'scene-name', sceneName(scene, index)), el('span', 'scene-cue-count', `${scene.cues.length}句`));
      button.addEventListener('click', () => {
        state.sceneId = scene.id; state.cueIndex = 0;
        renderScenes(); renderCues();
      });
      list.append(button);
    });
  }

  function selectCue(index) {
    state.cueIndex = index;
    document.querySelectorAll('.cue').forEach((row) => { row.dataset.selected = String(Number(row.dataset.cueIndex) === index); });
    schedulePreview();
  }

  function recordEdit(scene, index) {
    const cue = scene.cues[index];
    const before = state.baseline.scenes.find((s) => s.id === scene.id).cues[index];
    const patch = { scene_id: scene.id, cue_index: index };
    ['text', 'pause_after_min_seconds', 'visual_state'].forEach((key) => {
      if (cue[key] !== before[key]) patch[key] = cue[key];
    });
    const key = `${scene.id}:${index}`;
    if (Object.keys(patch).length > 2) state.edits.set(key, patch);
    else state.edits.delete(key);
    syncControls();
  }

  function renderCues() {
    const scene = selectedScene();
    const list = $('cue-list'); list.replaceChildren();
    if (!scene) { list.append(el('p', 'loading-text', '文稿中没有场景，请导入文本。')); return; }
    const sceneIndex = state.project.lesson.scenes.findIndex((s) => s.id === scene.id);
    $('scene-title').textContent = sceneName(scene, sceneIndex);
    $('scene-rate').textContent = scene.id === 'intro' ? '开场 −3%' : '正文 −5%';
    scene.cues.forEach((cue, index) => {
      const row = el('article', 'cue'); row.dataset.cueIndex = index; row.dataset.selected = String(index === state.cueIndex);
      const heading = el('div', 'cue-title');
      const label = el('label', '', `第 ${index + 1} 句`); label.htmlFor = `cue-text-${index}`;
      const preview = el('button', 'quiet', '预览此句'); preview.type = 'button'; preview.addEventListener('click', () => { selectCue(index); switchPreview('scene'); });
      heading.append(label, preview);
      const textarea = el('textarea'); textarea.id = `cue-text-${index}`; textarea.value = cue.text; textarea.rows = 2;
      textarea.setAttribute('aria-label', `${sceneName(scene, sceneIndex)}第${index + 1}句台词`);
      textarea.addEventListener('focus', () => selectCue(index));
      textarea.addEventListener('input', () => {
        cue.text = textarea.value; scene.captions[index] = textarea.value;
        textarea.setAttribute('aria-invalid', String(!textarea.value.trim()));
        recordEdit(scene, index); selectCue(index);
      });
      const controls = el('div', 'cue-controls');
      const pauseLabel = el('label', '', '句后最少停顿');
      const pause = el('input', 'pause-input'); pause.type = 'number'; pause.min = '0'; pause.max = '30'; pause.step = '0.05'; pause.value = String(cue.pause_after_min_seconds ?? 0);
      pause.setAttribute('aria-label', `第${index + 1}句后最少停顿，秒`);
      pause.addEventListener('focus', () => selectCue(index));
      pause.addEventListener('input', () => {
        const value = pause.value === '' ? NaN : Number(pause.value);
        const valid = Number.isFinite(value) && value >= 0 && value <= 30;
        pause.setAttribute('aria-invalid', String(!valid));
        cue.pause_after_min_seconds = valid ? value : null;
        recordEdit(scene, index);
      });
      pauseLabel.append(pause, el('span', '', '秒'));
      const visualLabel = el('label', '', '画面');
      const visual = el('select', 'visual-select'); visual.setAttribute('aria-label', `第${index + 1}句画面`);
      const visuals = state.visuals.some((v) => v.id === cue.visual_state) ? state.visuals : [...state.visuals, { id: cue.visual_state, label: cue.visual_state }];
      visuals.forEach((item) => { const option = el('option', '', item.label); option.value = item.id; option.selected = item.id === cue.visual_state; visual.append(option); });
      visual.addEventListener('change', () => { cue.visual_state = visual.value; recordEdit(scene, index); selectCue(index); });
      visualLabel.append(visual); controls.append(pauseLabel, visualLabel); row.append(heading, textarea, controls); list.append(row);
    });
    syncControls(); schedulePreview();
  }

  function schedulePreview() {
    clearTimeout(state.previewTimer);
    state.previewTimer = setTimeout(updatePreview, 180);
  }

  function updatePreview() {
    const cue = selectedScene()?.cues[state.cueIndex];
    if (!cue) return;
    const serial = ++state.previewSerial;
    $('preview-caption').textContent = `第 ${state.cueIndex + 1} 句 · 画面预览`;
    const url = `/api/preview?${new URLSearchParams({ state: cue.visual_state, text: cue.text })}`;
    const preload = new Image();
    preload.onload = () => {
      if (serial !== state.previewSerial) return;
      $('preview-image').src = url; $('preview-image').hidden = false; $('preview-placeholder').hidden = true;
    };
    preload.onerror = () => {
      if (serial !== state.previewSerial) return;
      $('preview-image').hidden = true; $('preview-placeholder').textContent = '当前画面暂时无法预览，请查看生成日志。'; $('preview-placeholder').hidden = false;
    };
    preload.src = url;
  }

  function switchPreview(tab) {
    state.activeTab = tab;
    $('scene-preview').hidden = tab !== 'scene'; $('video-preview').hidden = tab !== 'video';
    $('scene-tab').setAttribute('aria-selected', String(tab === 'scene')); $('video-tab').setAttribute('aria-selected', String(tab === 'video'));
    if (tab !== 'video') $('output-video').pause();
  }

  function validateEdits() {
    for (const scene of state.project.lesson.scenes) {
      for (let i = 0; i < scene.cues.length; i += 1) {
        const cue = scene.cues[i];
        if (!cue.text.trim() || !Number.isFinite(cue.pause_after_min_seconds) || cue.pause_after_min_seconds < 0 || cue.pause_after_min_seconds > 30) {
          state.sceneId = scene.id; state.cueIndex = i; renderScenes(); renderCues();
          throw new ApiError(`请检查第 ${i + 1} 句：台词不能为空，停顿须为 0 到 30 秒。`, 400);
        }
      }
    }
  }

  async function save() {
    if (!dirty()) return true;
    if (state.conflict) throw new ApiError('文稿已在其他位置更新，请先重新载入。', 409);
    validateEdits(); state.saving = true; syncControls();
    try {
      const project = await api('/api/project', { revision: state.project.revision, edits: Array.from(state.edits.values()) });
      adoptProject(project);
      notice('修改已保存到本机。', 'success');
      return true;
    } finally { state.saving = false; syncControls(); }
  }

  async function generate(mode) {
    if (busy()) return;
    try {
      await save();
      state.launching = true; syncControls();
      const job = await api('/api/generate', { mode });
      state.ownJobId = job.job_id || job.id; state.running = true;
      notice(mode === 'render-only' ? '正在更新画面与停顿。' : '正在生成视频。');
      await pollStatus();
    } catch (error) { showError(error); }
    finally { state.launching = false; syncControls(); }
  }

  function refreshOutput(status) {
    state.outputAvailable = Boolean(status.output_available);
    state.outputUrl = status.output_url || '/media/final.mp4';
    const version = status.last_run?.status === 'success' ? status.last_run.run_id || status.last_run.finished_at : state.lastVideoVersion || 'existing';
    if (state.outputAvailable && (state.lastVideoVersion !== version || !$('output-video').getAttribute('src'))) {
      state.lastVideoVersion = version;
      const separator = state.outputUrl.includes('?') ? '&' : '?';
      $('output-video').src = `${state.outputUrl}${separator}version=${encodeURIComponent(version)}`;
      $('output-video').hidden = false; $('video-placeholder').hidden = true;
    }
    if (!state.outputAvailable) { $('output-video').hidden = true; $('video-placeholder').hidden = false; }
  }

  async function pollStatus() {
    if (state.pollBusy) return;
    state.pollBusy = true;
    try {
      const status = await api('/api/status');
      state.running = Boolean(status.running);
      refreshOutput(status);
      const job = status.job;
      const run = status.last_run;
      const currentRun = run && (!job?.started_at || (run.started_at && run.started_at >= job.started_at));
      // A command run can be newer than the last editor job. Never label an old
      // successful job as the outcome of that newer (possibly failed) command.
      const effective = currentRun ? run : job || run;
      const current = state.running ? 'running' : effective?.status || 'idle';
      $('job-state').dataset.status = current;
      if (state.running) {
        $('job-status').textContent = currentRun ? '正在生成' : '正在启动';
        $('job-detail').textContent = !currentRun ? '正在准备本次任务，请稍候。' : run.phase === 'complete' ? '正在完成本次生成，请稍候。' : phases[run.phase] || '正在处理旁白、停顿与画面，请稍候。';
      } else if (current === 'failed') {
        $('job-status').textContent = '最近一次生成未完成';
        $('job-detail').textContent = effective?.error || '已保留运行日志，上次成功的成片未被替换。';
      } else if (current === 'success') {
        $('job-status').textContent = state.ownJobId && job?.job_id === state.ownJobId ? '生成完成' : '上次生成完成';
        const seconds = run?.duration_seconds || run?.duration;
        $('job-detail').textContent = seconds ? `成片 ${Number(seconds).toFixed(2)} 秒，已保存到输出文件夹。` : '成片已检查并保存到输出文件夹。';
      } else {
        $('job-status').textContent = '就绪';
        $('job-detail').textContent = state.outputAvailable ? '可查看上次成片，或修改文稿后重新生成。' : '保存后即可生成视频。';
      }
      if (state.ownJobId && job?.job_id === state.ownJobId && !state.running) {
        if (current === 'success' && job.status === 'success' && state.openedJobId !== state.ownJobId) {
          state.openedJobId = state.ownJobId;
          notice('视频已生成并保存。', 'success'); switchPreview('video');
          try { await api('/api/open-output', {}); }
          catch (error) { notice(`视频已保存，自动打开未完成：${error.message}`, 'error'); }
        } else if (current === 'failed') {
          notice(job.error || run?.error || '本次生成失败，已保留日志。', 'error');
          state.ownJobId = null;
        }
      }
      if ($('log-details').open && state.running) await refreshLog();
      syncControls();
    } catch (error) {
      $('job-status').textContent = '连接中断'; $('job-detail').textContent = error.message;
    } finally { state.pollBusy = false; }
  }

  async function refreshLog() {
    try { const result = await api('/api/log'); $('run-log').textContent = result.text || '暂无本次运行日志。'; }
    catch (error) { $('run-log').textContent = error.message; }
  }

  async function reloadProject() {
    if (dirty() && !window.confirm('重新载入会放弃窗口中未保存的修改。继续吗？')) return;
    try {
      adoptProject(await api('/api/project'));
      $('message').hidden = true;
    } catch (error) { showError(error); }
  }

  function setTheme(value) {
    const theme = ['light', 'dark', 'system'].includes(value) ? value : 'system';
    document.documentElement.dataset.theme = theme; $('theme-select').value = theme;
    try { localStorage.setItem('course-editor-theme', theme); }
    catch (_) { /* The project preference remains the persistent source. */ }
    return theme;
  }

  async function restoreThemePreference() {
    const revision = themeState.choiceRevision;
    try {
      const preference = await api('/api/preferences');
      // A late startup response must never replace this session's user choice.
      if (revision === 0 && themeState.choiceRevision === revision) setTheme(preference.theme);
    } catch (_) {
      if (themeState.choiceRevision === revision) notice('外观设置暂时无法读取，已保留当前外观。');
    }
  }

  function chooseTheme(value) {
    const theme = setTheme(value);
    const revision = ++themeState.choiceRevision;
    // Serialize writes so rapid light/dark/system choices persist in that order.
    // Applying the appearance is immediate; saving never blocks document editing.
    themeState.writeQueue = themeState.writeQueue.catch(() => {}).then(() => api('/api/preferences', { theme })).catch(() => {
      if (themeState.choiceRevision === revision) notice('外观已应用，暂时无法保存到工程。');
    });
  }

  $('save-button').addEventListener('click', () => save().catch(showError));
  $('generate-button').addEventListener('click', () => generate('full'));
  $('render-button').addEventListener('click', () => generate('render-only'));
  $('scene-tab').addEventListener('click', () => switchPreview('scene'));
  $('video-tab').addEventListener('click', () => switchPreview('video'));
  ['scene-tab', 'video-tab'].forEach((id) => $(id).addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const target = id === 'scene-tab' ? 'video-tab' : 'scene-tab';
      $(target).focus(); switchPreview(target === 'video-tab' ? 'video' : 'scene');
    }
  }));
  $('dismiss-message').addEventListener('click', () => { $('message').hidden = true; });
  $('reload-button').addEventListener('click', reloadProject);
  $('open-output').addEventListener('click', () => api('/api/open-output', {}).catch(showError));
  $('open-folder').addEventListener('click', () => api('/api/open-folder', {}).catch(showError));
  $('refresh-log').addEventListener('click', refreshLog);
  $('log-details').addEventListener('toggle', () => { if ($('log-details').open) refreshLog(); });
  $('theme-select').addEventListener('change', (event) => chooseTheme(event.target.value));
  $('help-button').addEventListener('click', () => $('help-dialog').showModal());
  ['close-help', 'help-done'].forEach((id) => $(id).addEventListener('click', () => $('help-dialog').close()));
  $('import-button').addEventListener('click', () => { $('import-error').hidden = true; $('import-dialog').showModal(); });
  ['close-import', 'cancel-import'].forEach((id) => $(id).addEventListener('click', () => { if (!state.importing) $('import-dialog').close(); }));
  $('import-dialog').addEventListener('cancel', (event) => { if (state.importing) event.preventDefault(); });
  $('import-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (state.importing) return;
    const text = $('import-text').value; const title = $('import-name').value;
    if (!text.trim() || !title.trim()) return;
    $('import-error').hidden = true;
    try {
      await save();
      state.importing = true; syncControls();
      const project = await api('/api/import', { revision: state.project.revision, text, title });
      adoptProject(project, false); $('import-dialog').close();
      notice('新文稿已导入，原文稿已备份。请检查每句台词和停顿。', 'success');
      $('import-text').value = ''; $('import-name').value = ''; switchPreview('scene');
    } catch (error) {
      $('import-error').textContent = error.message; $('import-error').hidden = false;
      if (error.status === 409) showError(error);
    } finally { state.importing = false; syncControls(); }
  });
  window.addEventListener('beforeunload', (event) => { if (dirty()) { event.preventDefault(); event.returnValue = ''; } });
  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault(); if (!busy() && state.project) save().catch(showError);
    }
  });
  window.CourseEditor = Object.freeze({ hasUnsavedChanges: () => dirty() });

  try { setTheme(localStorage.getItem('course-editor-theme') || 'system'); }
  catch (_) { document.documentElement.dataset.theme = 'system'; }
  restoreThemePreference();

  async function boot() {
    try {
      const [project, visuals] = await Promise.all([api('/api/project'), api('/api/visuals')]);
      state.visuals = Array.isArray(visuals) ? visuals : visuals.visuals || [];
      adoptProject(project, false); await pollStatus();
    } catch (error) { showError(error); }
    setInterval(pollStatus, 1500);
  }
  boot();
})();
