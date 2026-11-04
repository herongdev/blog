import { icons } from './icons.generated.mjs';
/** Fixed, locally generated official Lucide markup; never supplied by content. */
export function showcaseIcon(name = 'grid') {
    return Object.hasOwn(icons, name) ? icons[name] : icons.grid;
}
const validId = (value) => /^[a-z][a-z0-9-]*$/.test(value);
export function validateShowcase(plan) {
    if (!plan || !plan.title || typeof plan.description !== 'string' || !Number.isInteger(plan.placeholders) || plan.placeholders < 0 || plan.placeholders > 12 || !Array.isArray(plan.categories) || !plan.categories.length || !Array.isArray(plan.hotspots) || !Array.isArray(plan.projects))
        throw Error('Invalid showcase plan');
    const ids = plan.categories.map(c => c.id);
    if (new Set(ids).size !== ids.length || ids.includes('all') || plan.categories.some(c => !validId(c.id) || !c.label))
        throw Error('Invalid showcase categories');
    if (plan.categories.some(c => c.icon !== undefined && !Object.hasOwn(icons, c.icon)))
        throw Error('Invalid showcase icon');
    if (plan.assetBase && new URL(plan.assetBase).protocol !== 'https:')
        throw Error('Invalid showcase asset base');
    if (new Set(plan.projects.map(p => p.id)).size !== plan.projects.length)
        throw Error('Duplicate showcase project');
    for (const h of plan.hotspots)
        if (!ids.includes(h.category) || ![h.x, h.y].every(n => Number.isFinite(n) && n >= 0 && n <= 100))
            throw Error('Invalid showcase hotspot');
    for (const p of plan.projects) {
        if (!validId(p.id) || !ids.includes(p.category) || !p.title || typeof p.summary !== 'string')
            throw Error('Invalid showcase project');
        if (p.cover && !/^assets\/[a-zA-Z0-9._-]+$/.test(p.cover))
            throw Error('Invalid local showcase cover');
        if (p.href && !/^https:\/\/[^\s]+$/.test(p.href) && !/^\.\/[a-zA-Z0-9/._-]+(?:#[a-zA-Z0-9_-]+)?$/.test(p.href))
            throw Error('Invalid showcase project link');
        if (p.reference && (typeof p.reference.label !== 'string' || !p.reference.label.trim() || typeof p.reference.url !== 'string' || !/^https:\/\/[^\s]+$/.test(p.reference.url)))
            throw Error('Invalid showcase reference');
    }
}
export function mountMediaShowcase(container, scene, plan) {
    validateShowcase(plan);
    const assetBase = plan.assetBase ? new URL(plan.assetBase) : null;
    const resolveAsset = src => assetBase ? new URL(src.replace(/^assets\//, ''), assetBase).href : src;
    const cleanups = [];
    const listen = (node, type, handler) => { node.addEventListener(type, handler); cleanups.push(() => node.removeEventListener(type, handler)); };
    const coverObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting)
                continue;
            const image = entry.target;
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
            coverObserver.unobserve(image);
        }
    }, { rootMargin: '240px 0px' });
    cleanups.push(() => coverObserver.disconnect());
    const el = (tag, className, text) => {
        const node = document.createElement(tag);
        node.className = className;
        if (text !== undefined)
            node.textContent = text;
        return node;
    };
    const icon = (name) => { const holder = el('span', 'icon-holder'); holder.innerHTML = showcaseIcon(name); holder.setAttribute('aria-hidden', 'true'); return holder; };
    container.replaceChildren();
    container.className = 'project-showcase';
    container.id = 'projects';
    const inner = el('div', 'showcase-inner'), heading = el('div', 'showcase-heading'), title = el('h2', '', plan.title);
    title.id = 'projects-title';
    container.removeAttribute('aria-labelledby');
    container.setAttribute('aria-label', plan.title);
    const intro = el('div', '');
    intro.append(el('p', 'section-kicker', 'SELECTED WORK'), title, el('p', 'showcase-description', plan.description));
    heading.append(intro, el('span', 'showcase-scope', '业务场景 / 技术实现 / 个人职责'));
    const tabs = el('div', 'project-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', '项目领域');
    const navigation = el('div', 'project-category-nav'), previous = el('button', 'category-scroll'), next = el('button', 'category-scroll');
    previous.append(icon('left'));
    next.append(icon('right'));
    previous.type = next.type = 'button';
    previous.setAttribute('aria-label', '向左浏览行业');
    next.setAttribute('aria-label', '向右浏览行业');
    const updateNavigation = () => {
        const overflow = tabs.scrollWidth > navigation.clientWidth + 1;
        previous.hidden = next.hidden = !overflow;
        previous.disabled = tabs.scrollLeft <= 1;
        next.disabled = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 1;
    };
    navigation.append(previous, tabs, next);
    listen(previous, 'click', () => { tabs.scrollLeft -= tabs.clientWidth * .7; updateNavigation(); });
    listen(next, 'click', () => { tabs.scrollLeft += tabs.clientWidth * .7; updateNavigation(); });
    listen(tabs, 'scroll', updateNavigation);
    const panel = el('div', 'project-panel');
    panel.id = 'project-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
    const status = el('p', 'project-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    const grid = el('div', 'project-grid');
    panel.append(status, grid);
    const categories = [{ id: 'all', label: '全部项目', icon: 'grid' }, ...plan.categories];
    const tabButtons = categories.map(c => { const b = el('button', 'project-tab'); b.append(icon(c.icon), el('span', 'tab-label', c.label)); b.type = 'button'; b.id = 'project-tab-' + c.id; b.dataset.category = c.id; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', panel.id); tabs.append(b); return b; });
    const overlays = el('div', 'scene-hotspots');
    overlays.setAttribute('aria-label', '探索项目领域');
    const hotspotButtons = plan.hotspots.map(h => {
        const label = plan.categories.find(c => c.id === h.category).label, b = el('button', 'scene-hotspot');
        b.type = 'button';
        b.dataset.category = h.category;
        b.style.left = h.x + '%';
        b.style.top = h.y + '%';
        b.setAttribute('aria-label', label + '，查看相关项目');
        const marker = el('span', 'hotspot-marker');
        marker.setAttribute('aria-hidden', 'true');
        marker.append(icon(plan.categories.find(c => c.id === h.category)?.icon));
        b.append(marker, el('span', 'hotspot-label', label));
        overlays.append(b);
        return b;
    });
    const render = (category) => {
        tabButtons.forEach(b => { const selected = b.dataset.category === category; b.setAttribute('aria-selected', String(selected)); b.tabIndex = selected ? 0 : -1; });
        hotspotButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.category === category)));
        const selectedTab = tabButtons.find(b => b.dataset.category === category);
        const tabBox = selectedTab.getBoundingClientRect(), railBox = tabs.getBoundingClientRect();
        if (tabBox.left < railBox.left || tabBox.right > railBox.right)
            tabs.scrollLeft += tabBox.left - railBox.left - (tabs.clientWidth - tabBox.width) / 2;
        panel.setAttribute('aria-labelledby', 'project-tab-' + category);
        panel.dataset.category = category;
        grid.replaceChildren();
        const projects = plan.projects.filter(p => category === 'all' || p.category === category);
        const label = categories.find(c => c.id === category).label;
        status.textContent = projects.length ? `${label} · ${projects.length} 个项目` : `${label} · 案例待补充`;
        for (const project of projects) {
            const card = el('article', 'project-card'), cover = el('div', 'project-cover');
            if (project.cover) {
                const img = el('img', '');
                img.dataset.src = resolveAsset(project.cover);
                if (assetBase)
                    img.crossOrigin = 'anonymous';
                img.alt = project.title + '项目画面';
                img.loading = 'lazy';
                coverObserver.observe(img);
                cover.append(img);
            }
            else
                cover.append(el('span', 'cover-caption', '项目封面'));
            const info = el('div', 'project-info'), name = el('h3', '', project.title);
            info.append(el('p', 'project-category', categories.find(c => c.id === project.category).label), name, el('p', 'project-summary', project.summary));
            if (project.role)
                info.append(el('p', 'project-role', '负责内容 · ' + project.role));
            if (project.reference) {
                const source = el('a', 'project-reference', '参考案例 · ' + project.reference.label);
                source.append(icon('external'));
                source.href = project.reference.url;
                source.target = '_blank';
                source.rel = 'noopener noreferrer';
                source.setAttribute('aria-label', '查看原作：' + project.title);
                info.append(source);
            }
            if (project.href) {
                const link = el('a', 'project-link', '查看项目');
                link.append(icon('external'));
                link.href = project.href;
                link.setAttribute('aria-label', '查看项目：' + project.title);
                info.append(link);
            }
            card.append(cover, info);
            grid.append(card);
        }
        if (!projects.length) {
            for (let i = 0; i < plan.placeholders; i++) {
                const card = el('article', 'project-card is-placeholder');
                card.setAttribute('aria-label', label + ' · 项目占位');
                const cover = el('div', 'project-cover');
                cover.append(el('span', 'cover-grid'), el('span', 'cover-caption', '项目封面'), el('span', 'placeholder-index', String(i + 1).padStart(2, '0')));
                const info = el('div', 'project-info');
                info.append(el('h3', '', '项目名称'), el('p', 'project-summary', '项目简介 · 个人职责'));
                card.append(cover, info);
                grid.append(card);
            }
        }
    };
    tabButtons.forEach((button, index) => {
        listen(button, 'click', () => render(button.dataset.category));
        listen(button, 'keydown', event => {
            const e = event;
            let next = index;
            if (e.key === 'ArrowRight')
                next = (index + 1) % tabButtons.length;
            else if (e.key === 'ArrowLeft')
                next = (index + tabButtons.length - 1) % tabButtons.length;
            else if (e.key === 'Home')
                next = 0;
            else if (e.key === 'End')
                next = tabButtons.length - 1;
            else
                return;
            e.preventDefault();
            render(tabButtons[next].dataset.category);
            tabButtons[next].focus();
        });
    });
    hotspotButtons.forEach(button => listen(button, 'click', () => {
        render(button.dataset.category);
        const target = tabButtons.find(b => b.dataset.category === button.dataset.category);
        target.focus({ preventScroll: true });
        container.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }));
    if (plan.showHeading !== false) {
        inner.append(heading);
        container.setAttribute('aria-labelledby', title.id);
    }
    inner.append(navigation, panel);
    container.append(inner);
    scene.append(overlays);
    render('all');
    updateNavigation();
    const navigationObserver = new ResizeObserver(updateNavigation);
    navigationObserver.observe(navigation);
    cleanups.push(() => navigationObserver.disconnect());
    // Reserve the actual category rail and a glimpse of the content below it in the first viewport.
    // Measuring the shared shell also handles wrapped headings, larger fonts and resized windows.
    const hero = scene.closest('.display-hero');
    if (hero) {
        const header = hero.querySelector('.display-header');
        const previousReserve = hero.style.getPropertyValue('--portfolio-fold-reserve'), previousHeader = hero.style.getPropertyValue('--portfolio-header-space');
        const fitFirstViewport = () => {
            const railHeight = Math.max(0, tabs.getBoundingClientRect().bottom - container.getBoundingClientRect().top);
            const headerSpace = header ? Math.max(0, header.getBoundingClientRect().bottom - hero.getBoundingClientRect().top) + 12 : 16;
            const peek = parseFloat(getComputedStyle(hero).getPropertyValue('--portfolio-content-peek')) || 0;
            hero.style.setProperty('--portfolio-fold-reserve', Math.ceil(railHeight + peek) + 'px');
            hero.style.setProperty('--portfolio-header-space', Math.ceil(headerSpace) + 'px');
        };
        fitFirstViewport();
        const observer = new ResizeObserver(fitFirstViewport);
        observer.observe(tabs);
        if (header)
            observer.observe(header);
        observer.observe(inner);
        listen(window, 'resize', fitFirstViewport);
        cleanups.push(() => { observer.disconnect(); for (const [key, value] of [['--portfolio-fold-reserve', previousReserve], ['--portfolio-header-space', previousHeader]]) {
            if (value)
                hero.style.setProperty(key, value);
            else
                hero.style.removeProperty(key);
        } });
    }
    if (location.hash === '#projects')
        container.scrollIntoView({ behavior: 'instant', block: 'start' });
    return { dispose: () => { cleanups.forEach(f => f()); overlays.remove(); container.replaceChildren(); } };
}
/** Result observation: read rendered UI, rather than the last requested category. */
export function showcaseObservation(container, scene) {
    const selected = container.querySelector('[role="tab"][aria-selected="true"]');
    const tabBox = selected?.getBoundingClientRect(), railBox = container.querySelector('.project-tabs')?.getBoundingClientRect();
    const visibleLabels = [...scene.querySelectorAll('.hotspot-label')].filter(el => {
        const style = getComputedStyle(el), box = el.getBoundingClientRect();
        return Number(style.opacity) > .99 && box.width > 5 && box.height > 0;
    }).map(el => el.textContent).join(',');
    // Native scrolling stops at the end of short pages; do not require impossible top alignment.
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const destination = Math.max(0, Math.min(container.getBoundingClientRect().top + scrollY - padding, document.documentElement.scrollHeight - innerHeight));
    return { showcaseTabsInViewport: !!railBox && railBox.top >= 0 && railBox.bottom <= innerHeight, showcaseSelectedTabVisible: !!tabBox && !!railBox && tabBox.left >= railBox.left - 1 && tabBox.right <= railBox.right + 1, showcaseCategory: selected?.dataset.category ?? '', showcasePanel: container.querySelector('[role="tabpanel"]')?.dataset.category ?? '',
        showcaseCards: container.querySelectorAll('.project-card:not(.is-placeholder)').length, showcasePlaceholders: container.querySelectorAll('.is-placeholder').length,
        showcaseVisibleLabels: visibleLabels, showcaseAtProjects: Math.abs(scrollY - destination) <= 2, showcaseOverflow: document.documentElement.scrollWidth > innerWidth };
}
