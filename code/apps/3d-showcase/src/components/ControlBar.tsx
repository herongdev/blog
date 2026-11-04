import type { SamplingSnapshot, Station } from '../lib/api-client';
import { showcaseAsset } from '../lib/assets';
import { HudIcon } from './HudIcons';

export function ControlBar({ station, snapshot, onRefresh }: { station?: Station; snapshot?: SamplingSnapshot; onRefresh: () => void }) {
  const vehicle = snapshot?.task.vehicle;
  return <div className="control-bar">
    <div className="control-left">
      <button className="station-select" title={station?.name}><i/>1#采样机<HudIcon name="chevron"/></button>
      <button className="view-tab active">组态图</button><button className="view-tab">实时监控</button>
    </div>
    <div className="data-ribbon">
      <span className="data-brand"><img src={showcaseAsset('data-label.png')} alt="DATA"/><img src={showcaseAsset('diamond.png')} alt=""/></span>
      <DataItem label="车牌号" value={vehicle?.plateNumber}/><DataItem label="来煤单位" value={vehicle?.supplier}/>
      <DataItem label="采样单位" value={vehicle?.samplingUnit}/><DataItem label="当前采样桶号" value={vehicle?.bucketNumber}/>
    </div>
    <div className="control-right"><button className="monitor-button" onClick={onRefresh}><HudIcon name="pulse"/>运行监测</button><button><HudIcon name="gear"/>设备控制</button></div>
  </div>;
}

function DataItem({ label, value }: { label: string; value?: string }) {
  return <div className="data-item"><small><i/><span>{label}</span></small><strong>{value || '----'}</strong></div>;
}
