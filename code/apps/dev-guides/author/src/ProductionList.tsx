import { AuthorButton } from './AuthorUI';
import { useState } from 'react';
import { ArrowRight, CircleAlert, Clapperboard, LoaderCircle, RefreshCw } from 'lucide-react';
import IconButton from './IconButton';
import AuthorSelect from './AuthorSelect';
import { ProductionSearch, ProductionToolbar, productionOverviewLabel, type ProductionOverviewItem, type ProductionOverviewState } from './ProductionHub';
import './production-list.css';

type Props = { overview: ProductionOverviewState; embedded?: boolean; onOpen: (item: ProductionOverviewItem) => void; onLibrary: () => void };

export default function ProductionList({ overview, embedded = false, onOpen, onLibrary }: Props) {
  const { items, loading, loaded, error, refresh } = overview;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const query = search.trim().toLocaleLowerCase();
  const visible = items.filter(item => {
    const state = productionOverviewLabel(item);
    const matchesState = filter === 'all' || item.status === filter || (filter === 'blocked' && state.label === '受阻') || (filter === 'needs_review' && state.label === '需复核');
    return matchesState && [item.title, item.nextAction, item.stage?.name].filter(Boolean).join(' ').toLocaleLowerCase().includes(query);
  });
  const progressActions = <>{loaded && <span className="production-list-count">{items.length} 期</span>}<IconButton aria-label="刷新制作进度" onClick={() => void refresh()} disabled={loading}><RefreshCw size={17} className={loading ? 'spin' : undefined} aria-hidden="true" /></IconButton></>;
  return <main className="production-list" aria-label="全部制作进度" aria-busy={loading}>
    {!embedded && <header className="production-list-heading"><h1>制作</h1>{progressActions}</header>}
    <ProductionToolbar search={<ProductionSearch value={search} onValueChange={setSearch} label="搜索制作档案" placeholder="搜索标题、阶段或下一动作" />} filters={<AuthorSelect label="制作状态" value={filter} onValueChange={setFilter} options={[{ value: 'all', label: '全部状态' }, { value: 'active', label: '制作中' }, { value: 'paused', label: '已暂停' }, { value: 'blocked', label: '受阻' }, { value: 'needs_review', label: '需复核' }, { value: 'completed', label: '制作完成' }]} />} actions={embedded ? progressActions : null} />
    {error && <p className="production-list-error" role="alert"><CircleAlert size={17} aria-hidden="true" /><span>{error}{loaded ? '，以下为上次读取的进度。' : ''}</span><AuthorButton variant="secondary" type="button" disabled={loading} onClick={() => void refresh()}>重试</AuthorButton></p>}
    {loading && !loaded ? <p className="production-list-loading" role="status"><LoaderCircle size={18} className="spin" aria-hidden="true" />正在读取制作档案…</p> : !loaded && error ? null : visible.length ? <ul className="production-list-items">{visible.map(item => {
      const state = productionOverviewLabel(item);
      return <li key={item.id}><button type="button" onClick={() => onOpen(item)}><div className="production-list-title"><strong>{item.title}</strong><span className={`tone-${state.tone}`}>{state.label}</span></div><span className="production-list-stage">{item.stage?.name || '阶段待选择'}</span><span className="production-list-next">{item.blockers?.[0]?.reason || item.nextAction}</span><ArrowRight size={17} aria-hidden="true" /></button></li>;
    })}</ul> : loaded ? <div className="production-list-empty"><Clapperboard size={28} aria-hidden="true" /><h2>{items.length ? '没有符合条件的制作档案' : '从一条内容开始制作'}</h2><p>{items.length ? '调整搜索词或状态继续查找。' : '在内容库打开选题，进入“制作”建立本期档案。'}</p>{!items.length && <AuthorButton variant="primary" type="button" onClick={onLibrary}>打开内容库</AuthorButton>}</div> : null}
  </main>;
}
