import type { ReactNode } from 'react';
import { showcaseAsset } from '../lib/assets';

export function HudPanel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`hud-panel ${className}`}><header><span className="panel-emblem"><img src={showcaseAsset('panel-spinner.png')} alt=""/><img src={showcaseAsset('panel-icon.png')} alt=""/></span><h2>{title}</h2><span className="panel-line"/><b className="panel-dashes"><i/><i/><i/></b></header><div className="panel-body">{children}</div></section>;
}
