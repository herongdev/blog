import { useEffect, useState } from 'react';
import { showcaseAsset } from '../lib/assets';

export function DashboardHeader() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const date = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '.');
  const weekday = `星期${'日一二三四五六'[now.getDay()]}`;
  const time = now.toLocaleTimeString('zh-CN', { hour12: false });
  return <header className="hud-header">
    <img className="header-texture" src={showcaseAsset('header_texture-CGls6W0p.png')} alt="" />
    <img className="header-right-decor" src={showcaseAsset('right_decor-DImSc8hz.png')} alt="" />
    <div className="header-left-glow-track">
      <img className="header-left-glow" src={showcaseAsset('left_line_glow-a5bkDd-S.png')} alt="" />
    </div>
    <div className="header-center-glow"><img src={showcaseAsset('center_glow_1-e4ZpVyr5.png')} alt=""/><img src={showcaseAsset('center_glow_2-CVsiyHL5.png')} alt=""/></div>
    <div className="header-breathing-dots">
      <img src={showcaseAsset('header-dot-1.png')} alt="" />
      <img src={showcaseAsset('header-dot-2.png')} alt="" />
      <img src={showcaseAsset('header-dot-3.png')} alt="" />
    </div>
    <div className="hud-title"><h1>智慧燃料集控中心</h1></div>
    <time><b>{date}</b><span>{weekday}</span><b>{time}</b></time>
  </header>;
}
