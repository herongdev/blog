import { HudIcon, type HudIconName } from './HudIcons';

const items: Array<[HudIconName, string]> = [
  ['sampler', '采样机'], ['truck', '汽车衡'], ['air', '气动传输'], ['bucket', '自动制样'], ['flask', '自动化验'],
  ['archive', '存查样柜'], ['temp', '煤场温度'], ['video', '视频'], ['shield', '门禁'], ['chart', '数据分析'], ['alarm', '告警'],
];

export function SideNavigation() {
  return <nav className="side-nav" aria-label="燃料业务导航">{items.map(([icon, label], index) => <button key={label} className={index === 0 ? 'active' : ''}><HudIcon name={icon}/><span>{label}</span></button>)}</nav>;
}
