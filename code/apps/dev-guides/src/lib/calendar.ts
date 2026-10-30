const localDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' });

export function shanghaiDate(value: Date | string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid publication date');
  const parts = Object.fromEntries(localDay.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function weekStart(value: Date | string): string {
  const day = new Date(`${shanghaiDate(value)}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() - (day.getUTCDay() + 6) % 7);
  return day.toISOString().slice(0, 10);
}

export function weekEnd(start: string): string {
  const day = new Date(`${start}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + 6);
  return day.toISOString().slice(0, 10);
}

export function formatWeekRange(start: string): string {
  const end = weekEnd(start);
  const format = (day: string, year: boolean) => `${year ? `${day.slice(0, 4)} 年 ` : ''}${Number(day.slice(5, 7))} 月 ${Number(day.slice(8, 10))} 日`;
  return `${format(start, true)}至 ${format(end, start.slice(0, 4) !== end.slice(0, 4))}`;
}
