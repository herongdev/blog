export function mountMediaStage(root, plan) {
    if (plan.version !== 1 || !Number.isFinite(plan.aspectRatio) || plan.aspectRatio <= 0 || !Number.isFinite(plan.widthPercent) || plan.widthPercent <= 0 || plan.widthPercent > 100 || !Number.isFinite(plan.timeoutMs) || plan.timeoutMs <= 0)
        throw Error('Invalid media stage dimensions or budget');
    const assetBase = plan.assetBase ? new URL(plan.assetBase) : null;
    if (assetBase && assetBase.protocol !== 'https:')
        throw Error('Invalid media asset base');
    const resolveAsset = src => assetBase ? new URL(src.replace(/^assets\//, ''), assetBase).href : src;
    const layers = [...plan.backdrop, ...plan.layers];
    if (!layers.length || new Set(layers.map(l => l.id)).size !== layers.length)
        throw Error('Media layer IDs must be unique');
    for (const layer of layers)
        if (!/^[a-z][a-z0-9-]*$/.test(layer.id) || !/^assets\/[a-zA-Z0-9._-]+$/.test(layer.src) || !['video', 'image'].includes(layer.kind) || ![layer.x, layer.y, layer.width, layer.height, layer.z, layer.opacity ?? 1, layer.floatSeconds ?? 0].every(Number.isFinite) || layer.width <= 0 || layer.height <= 0 || (layer.opacity ?? 1) < 0 || (layer.opacity ?? 1) > 1 || (layer.floatSeconds ?? 0) < 0)
            throw Error('Invalid local media layer: ' + layer.id);
    if (plan.tilt && (!plan.layers.some(l => l.id === plan.tilt.layer && l.kind === 'video') || ![plan.tilt.perspective, plan.tilt.rotateX, plan.tilt.rotateY, plan.tilt.alphaThreshold].every(Number.isFinite) || plan.tilt.perspective <= 0 || plan.tilt.alphaThreshold < 0 || plan.tilt.alphaThreshold > 1))
        throw Error('Invalid tilt binding');
    let disposed = false, ready = false, paused = false, tilt = { x: 0, y: 0 };
    let settleInitialization = () => { };
    const initialized = new Promise(resolve => { settleInitialization = resolve; });
    const errors = [], cleanups = [], media = new Map();
    root.replaceChildren();
    root.classList.add('media-stage');
    root.tabIndex = 0;
    root.setAttribute('aria-label', plan.label);
    root.style.background = plan.background;
    root.dataset.tiltLayer = plan.tilt?.layer ?? '';
    const stage = document.createElement('div');
    stage.className = 'media-stage-scene';
    stage.style.width = plan.widthPercent + '%';
    stage.style.aspectRatio = String(plan.aspectRatio);
    stage.style.setProperty('--media-stage-aspect', String(plan.aspectRatio));
    stage.style.maxWidth = `calc((100svh - 32px) * ${plan.aspectRatio})`;
    const status = document.createElement('div');
    status.className = 'media-stage-status';
    status.setAttribute('role', 'status');
    status.textContent = '正在载入场景…';
    root.append(stage, status);
    const fail = (message) => { if (disposed)
        return; errors.push(message); ready = false; root.dataset.state = 'error'; status.hidden = false; status.textContent = '场景加载失败，请刷新重试'; };
    const listen = (target, event, callback) => { target.addEventListener(event, callback); cleanups.push(() => target.removeEventListener(event, callback)); };
    const animations = [], imageJobs = [], videoJobs = [];
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const loadOnce = (element, layer, attempt) => new Promise((resolve, reject) => {
        const onError = () => { cleanup(); reject(Error('Media unavailable: ' + layer.id)); };
        const onReady = async () => {
            cleanup();
            if (element instanceof HTMLVideoElement) {
                try {
                    await element.play();
                }
                catch {
                    reject(Error('Playback denied: ' + layer.id));
                    return;
                }
            }
            resolve(true);
        };
        const cleanup = () => {
            element.removeEventListener('error', onError);
            element.removeEventListener(element instanceof HTMLVideoElement ? 'loadeddata' : 'load', onReady);
        };
        element.addEventListener('error', onError, { once: true });
        element.addEventListener(element instanceof HTMLVideoElement ? 'loadeddata' : 'load', onReady, { once: true });
        const source = resolveAsset(layer.src);
        element.src = attempt ? `${source}?retry=${attempt}` : source;
        if (element instanceof HTMLVideoElement)
            element.load();
        cleanups.push(cleanup);
    });
    const loadWithRetry = async (element, layer) => {
        for (let attempt = 0; attempt < 3 && !disposed; attempt++) {
            try {
                return await loadOnce(element, layer, attempt);
            }
            catch (error) {
                if (attempt === 2) {
                    fail(error.message);
                    return false;
                }
                element.removeAttribute('src');
                if (element instanceof HTMLVideoElement)
                    element.load();
                await wait(400 * (attempt + 1));
            }
        }
        return false;
    };
    for (const layer of layers) {
        const element = layer.kind === 'video' ? document.createElement('video') : document.createElement('img');
        element.dataset.layer = layer.id;
        media.set(layer.id, element);
        element.className = 'media-stage-layer';
        Object.assign(element.style, { left: layer.x + '%', top: layer.y + '%', width: layer.width + '%', height: layer.height + '%', zIndex: String(layer.z), opacity: String(layer.opacity ?? 1), objectFit: layer.fit ?? 'contain' });
        element.setAttribute('aria-hidden', 'true');
        if (element instanceof HTMLVideoElement) {
            element.muted = true;
            element.loop = true;
            element.playsInline = true;
            element.preload = 'auto';
            element.autoplay = true;
            element.disablePictureInPicture = true;
        }
        else {
            element.alt = '';
            element.draggable = false;
        }
        if (assetBase)
            element.crossOrigin = 'anonymous';
        (plan.backdrop.includes(layer) ? root : stage).append(element);
        (element instanceof HTMLVideoElement ? videoJobs : imageJobs).push(() => loadWithRetry(element, layer));
        if (layer.floatSeconds)
            animations.push(element.animate([{ transform: 'translateY(-50%) translateX(0)' }, { transform: 'translateY(-50%) translateX(15px)' }, { transform: 'translateY(-50%) translateX(0)' }], { duration: layer.floatSeconds * 1000, iterations: Infinity, easing: 'ease-in-out' }));
    }
    // Preserve the original media quality while preventing the old HTTP/2
    // server from opening every large WebM stream at once.
    const loads = imageJobs.map(job => job());
    loads.push(videoJobs.reduce((chain, job) => chain.then(job), Promise.resolve(true)));
    root.dataset.state = 'loading';
    const timer = setTimeout(() => {
        // A slow public connection is not a broken scene. Reveal every layer
        // that has arrived and keep allowing the remaining videos to settle.
        status.hidden = true;
        settleInitialization(false);
    }, plan.timeoutMs);
    cleanups.push(() => clearTimeout(timer));
    void Promise.all(loads).then(() => {
        clearTimeout(timer);
        if (disposed || errors.length) {
            settleInitialization(false);
            return;
        }
        ready = true;
        root.dataset.state = 'ready';
        status.hidden = true;
        settleInitialization(true);
    }).catch(() => { clearTimeout(timer); settleInitialization(false); });
    const videos = () => [...media.values()].filter((el) => el instanceof HTMLVideoElement);
    const setPaused = async (value) => {
        if (!ready || disposed)
            return false;
        paused = value;
        if (value) {
            videos().forEach(v => v.pause());
            animations.forEach(a => a.pause());
        }
        else {
            try {
                await Promise.all(videos().map(v => v.play()));
                animations.forEach(a => a.play());
            }
            catch {
                fail('Playback could not resume');
                return false;
            }
        }
        return true;
    };
    listen(root, 'keydown', event => { const e = event; if (e.target === root && e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        void setPaused(!paused);
    } });
    let mask, maskContext = null;
    if (plan.tilt) {
        const spec = plan.tilt, target = media.get(spec.layer);
        target.style.pointerEvents = 'auto';
        target.style.transition = 'transform 150ms ease-out';
        mask = document.createElement('canvas');
        maskContext = mask.getContext('2d', { willReadFrequently: true });
        const neutral = () => { tilt = { x: 1, y: 0 }; target.style.transform = `perspective(${spec.perspective}px) rotateX(1deg) rotateY(0deg)`; };
        listen(target, 'pointerenter', () => { if (!ready)
            return; const r = target.getBoundingClientRect(); mask.width = Math.ceil(r.width); mask.height = Math.ceil(r.height); try {
            maskContext?.drawImage(target, 0, 0, mask.width, mask.height);
        }
        catch {
            fail('Media alpha mask unavailable');
        } });
        listen(target, 'pointermove', event => {
            if (!ready || !mask?.width || !maskContext)
                return;
            const e = event, r = target.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            if (x < 0 || x >= 1 || y < 0 || y >= 1) {
                neutral();
                return;
            }
            try {
                if (maskContext.getImageData(Math.floor(x * mask.width), Math.floor(y * mask.height), 1, 1).data[3] / 255 <= spec.alphaThreshold) {
                    neutral();
                    return;
                }
                tilt = { x: spec.rotateX * (.5 - y), y: spec.rotateY * (x - .5) };
                target.style.transform = `perspective(${spec.perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
            }
            catch {
                fail('Media alpha mask unreadable');
            }
        });
        listen(target, 'pointerleave', neutral);
    }
    return {
        initialized, setPaused,
        snapshot: () => ({ ready, disposed, paused, errors: [...errors], tilt: { ...tilt }, media: [...media.entries()].map(([id, el]) => el instanceof HTMLVideoElement ? { id, kind: 'video', readyState: el.readyState, currentTime: el.currentTime, paused: el.paused, width: el.videoWidth, height: el.videoHeight, decodedFrames: el.getVideoPlaybackQuality().totalVideoFrames } : { id, kind: 'image', complete: el.complete, width: el.naturalWidth, height: el.naturalHeight }) }),
        dispose: () => { if (disposed)
            return; disposed = true; ready = false; settleInitialization(false); cleanups.forEach(f => f()); animations.forEach(a => a.cancel()); videos().forEach(v => { v.pause(); v.removeAttribute('src'); v.load(); }); root.replaceChildren(); root.removeAttribute('data-state'); }
    };
}
/** Adapter for result-based scene-check; reads actual media elements, not command acknowledgements. */
export function mediaStageObservation(root, stage) {
    return { version: 1, snapshot: () => {
            const s = stage.snapshot(), videos = [...root.querySelectorAll('video')];
            const primary = [...root.querySelectorAll('video')].find(v => v.dataset.layer === root.dataset.tiltLayer);
            return { version: 1, ready: s.ready, errors: s.errors, camera: {}, selected: null,
                state: { videoCount: videos.length, playing: videos.length > 0 && videos.every(v => !v.paused && v.readyState >= 2), allPaused: videos.length > 0 && videos.every(v => v.paused),
                    times: videos.map(v => v.currentTime), frames: videos.map(v => v.getVideoPlaybackQuality().totalVideoFrames),
                    tiltX: s.tilt.x, tiltY: s.tilt.y, transform: primary ? getComputedStyle(primary).transform : 'none',
                    hotspotCount: root.querySelectorAll('.scene-hotspot').length,
                    menuCount: root.querySelectorAll('a,nav,button:not(.scene-hotspot),input,select,textarea').length } };
        } };
}
