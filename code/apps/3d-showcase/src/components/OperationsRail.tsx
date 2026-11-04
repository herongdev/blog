import type { SamplingSnapshot } from '../lib/api-client';
import { HudIcon } from './HudIcons';
import { HudPanel } from './HudPanel';

const cellOrder = [1, 4, 7, 10, 13, 16, 2, 5, 8, 11, 14, 17, 3, 6, 9, 12, 15, 18];
export function OperationsRail({ snapshot }: { snapshot?: SamplingSnapshot }) {
  const points = snapshot?.realtimeValues ?? [];
  const values = Object.fromEntries(points.map(point => [point.pointCode, point]));
  const records = [...(snapshot?.recentRecords ?? [])].slice(0, 4).reverse();
  const alarms = (snapshot?.activeAlarms ?? []).map(alarm => ({ id: alarm.id, time: new Date(alarm.occurredAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), message: alarm.message }));
  const completedCells = (snapshot?.task.completedPoints ?? 0) * 6;

  return <aside className="operations-rail">
    <HudPanel title="运行状态与数据" className="status-panel">
      <div className="sampling-hud">
        <div className="sampling-board"><div className="sampling-matrix">
          {cellOrder.map((cell, index) => <div key={cell} className={`sampling-cell ${index < completedCells ? 'completed' : ''}`}>
            <i className="frame top"/><i className="frame right"/><i className="frame bottom"/><i className="frame left"/><span>{cell}</span>
          </div>)}
        </div></div>
        <div className="axis-cards">
          <AxisCard label="大车" point={values['SAMPLER.LARGE_CAR_X']} tone="blue" />
          <AxisCard label="小车" point={values['SAMPLER.SMALL_CAR_Y']} tone="amber" />
          <AxisCard label="升降" point={values['SAMPLER.PROBE_Z']} tone="green" />
        </div>
      </div>
    </HudPanel>
    <HudPanel title="采样记录" className="records-panel">
      <div className="record-head"><span>序列号</span><span>车牌号</span><span>采样桶</span><span>采样重量(kg)</span><span>采样区域</span></div>
      <div className="records-scroll">{records.length ? <div className="records-track">{[...records, ...records].map((record, index) => { const rowIndex = index % records.length; return <div className={`record-row ${rowIndex === 0 ? 'selected' : ''}`} key={`${record.id}-${index}`}>
        <b>{rowIndex === 0 ? <HudIcon name="chevronRight"/> : rowIndex + 1}</b><span>{record.plateNumber}</span><span>{record.bucketNumber.slice(-2)}</span><span>{record.sampleWeightKg.toFixed(2)}</span><span>{record.samplingArea}</span>
      </div>; })}</div> : <div className="record-empty">{snapshot ? '当前任务尚无采样记录' : '等待采样数据'}</div>}</div>
    </HudPanel>
    <HudPanel title="实时报警信息" className="alerts-panel">
      <div className="alert-feed">{alarms.length ? <div className="alert-track">{[...alarms, ...alarms].map((alarm, index) => <div className="alert-row" key={`${alarm.id}-${index}`}><HudIcon name="warning"/><span><time>{alarm.time}</time><strong>{alarm.message}</strong></span></div>)}</div> : <div className="alarm-empty"><i/><span>{snapshot ? '暂无活动告警' : '等待告警数据'}</span><small>{snapshot ? '以当前快照为准' : '尚未收到站点快照'}</small></div>}</div>
    </HudPanel>
  </aside>;
}

function AxisCard({ label, point, tone }: { label: string; point?: SamplingSnapshot['realtimeValues'][number]; tone: string }) {
  return <div className={`axis-card ${tone}`}><small>{label}<em>实际值</em></small><strong>{point ? point.value.toFixed(0) : '—'}</strong></div>;
}
