import { useEffect, useMemo, useState } from 'react';
import { BookOpenText, ChevronLeft, ChevronRight, History } from 'lucide-react';
import IconButton from './IconButton';
import AuthorSelect from './AuthorSelect';
import { scheduleLookup } from './schedule-lookup';
import type { ScheduleEntry, ScheduleState } from './ScheduleBoard';
import type { LibraryArticle } from './ArticleLibrary';

const PAGE_SIZE = 20;
export default function ScheduleLookup({ data, articles, archivedItems, archiveLoading, query, onOpen }: {
  data: ScheduleState; articles: ScheduleEntry[]; archivedItems: LibraryArticle[]; archiveLoading: boolean; query: string;
  onOpen: (entry: ScheduleEntry, tab: 'article') => void;
}) {
  const searching = Boolean(query.trim());
  const [week, setWeek] = useState('all');
  const [page, setPage] = useState(1);
  const results = useMemo(() => scheduleLookup(data, articles, archivedItems, query, !searching), [data, articles, archivedItems, query, searching]);
  const filtered = searching || week === 'all' ? results : results.filter((result) => result.week === week);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); const currentPage = Math.min(page, pages);
  useEffect(() => { setPage(1); }, [query, week, searching]);
  const groups = new Map<string, typeof results>();
  for (const result of filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)) {
    const group = searching ? '搜索结果' : result.location;
    groups.set(group, [...(groups.get(group) ?? []), result]);
  }
  return <section className="schedule-lookup" aria-labelledby="schedule-lookup-title">
    <header className="schedule-section-heading"><div className="schedule-section-label"><h2 id="schedule-lookup-title">{searching ? '搜索结果' : '历史教程'}</h2><span className="schedule-count" role="status">{filtered.length} {searching ? '篇内容' : '条记录'}</span></div>
      {!searching && <AuthorSelect value={week} onValueChange={setWeek} label="按历史周筛选" options={[{ value: 'all', label: '全部历史周' }, ...[...data.history].sort((a, b) => b.start.localeCompare(a.start)).map((item) => ({ value: item.start, label: `${item.start} 至 ${item.end}` }))]} />}
    </header>
    <p className="schedule-lookup-hint">{searching ? '搜索全部内容，包含本周、候选、历史与已归档；不受目录筛选限制。' : '按最近一周优先排列。点标题查看和编辑正文；已拍不代表已发布。'}</p>
    {archiveLoading && <p className="schedule-lookup-hint" role="status">正在补充归档内容…</p>}
    {[...groups].map(([label, rows]) => <section key={label} className="schedule-history-group" aria-label={label}>
      {!searching && <h3><History size={16} aria-hidden="true" />{label}</h3>}
      <ul className="schedule-list">{rows.map(({ entry, title, location, week: recordWeek, done, archived }) => <li className="schedule-result" key={`${recordWeek ?? location}/${entry.slug}`}>
        <div className="schedule-result-content"><button className="schedule-title" type="button" disabled={entry.missing} onClick={() => onOpen(entry, 'article')}>{title}{entry.missing && <span className="schedule-missing">文章已不存在</span>}</button>
          <div className="schedule-result-meta">{searching && <span>{recordWeek ? `历史 · ${location}` : location}</span>}<span>{entry.kind === 'draft' ? '草稿' : entry.status === 'published' ? '实测教程' : '功能线索'}</span>{done !== undefined && <span className={done ? 'is-complete' : undefined}>{done ? '已拍' : recordWeek ? '当周未拍完' : '待拍'}</span>}{archived && <span>已归档</span>}{!searching && title !== entry.title && <span>现标题：{entry.title}</span>}</div>
        </div><IconButton type="button" className="schedule-icon-button" aria-label={`查看和编辑：${title}`} disabled={entry.missing} onClick={() => onOpen(entry, 'article')}><BookOpenText aria-hidden="true" /></IconButton>
      </li>)}</ul>
    </section>)}
    {!filtered.length && <p className="schedule-empty">{searching ? '没有匹配内容，试试标题中的几个词或文章地址。' : '暂无历史教程；跨周后会保留当周的安排和拍摄记录。'}</p>}
    {pages > 1 && <nav className="schedule-pagination" aria-label={searching ? '搜索结果分页' : '历史教程分页'}><span>{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} / {filtered.length} 条</span><div><IconButton type="button" className="schedule-icon-button" aria-label="上一页" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft aria-hidden="true" /></IconButton><span>第 {currentPage} / {pages} 页</span><IconButton type="button" className="schedule-icon-button" aria-label="下一页" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><ChevronRight aria-hidden="true" /></IconButton></div></nav>}
  </section>;
}
