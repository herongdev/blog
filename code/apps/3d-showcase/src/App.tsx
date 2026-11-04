import { lazy, Suspense, useEffect, useState } from 'react';
import { createApiClient, type SamplingSnapshot, type Station } from './lib/api-client';
import { ControlBar } from './components/ControlBar';
import { DashboardHeader } from './components/DashboardHeader';
import { OperationsRail } from './components/OperationsRail';
import { SideNavigation } from './components/SideNavigation';
import { WorkflowDock } from './components/WorkflowDock';

const StationScene = lazy(() => import('./scene/StationScene'));
const api = createApiClient(import.meta.env.VITE_API_BASE_URL || `${import.meta.env.BASE_URL}api`);

export function App() {
  const [station, setStation] = useState<Station>();
  const [snapshot, setSnapshot] = useState<SamplingSnapshot>();
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([api.listStations(controller.signal), api.getSystemInfo(controller.signal)])
      .then(async ([stations]) => {
        const current = stations[0];
        setStation(current);
        if (current) {
          let currentSnapshot = await api.getSamplingSnapshot(current.id, controller.signal);
          if (currentSnapshot.source.simulated && currentSnapshot.task.status === 'IDLE') {
            await api.startSamplingScenario(current.id, 'NORMAL');
            currentSnapshot = await api.getSamplingSnapshot(current.id, controller.signal);
          }
          setSnapshot(currentSnapshot);
        }
      })
      .catch(() => { if (!controller.signal.aborted) setError('数据链路中断，正在等待重新连接'); });
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (!station) return;
    const events = new EventSource(api.samplingEventsUrl(station.id));
    events.addEventListener('snapshot', event => { setSnapshot(JSON.parse((event as MessageEvent).data)); setError(''); });
    events.onerror = () => setError('实时数据通道重连中，当前保留最后有效快照');
    return () => events.close();
  }, [station?.id]);

  const startMonitoring = async () => {
    if (!station) return;
    try {
      if (snapshot?.source.simulated) await api.startSamplingScenario(station.id, 'NORMAL');
      setSnapshot(await api.getSamplingSnapshot(station.id));
      setError('');
      setReload(value => value + 1);
    } catch {
      setError('刷新失败，当前保留最后有效快照，请稍后重试');
    }
  };

  return <main className="dashboard-page">
    <a className="back-to-enterprise" href="https://herong.info/projects/enterprise/">返回政企与数字孪生</a>
    <DashboardHeader />
    <ControlBar station={station} snapshot={snapshot} onRefresh={startMonitoring} />
    <div className="dashboard-stage">
      <SideNavigation />
      <section className="scene-viewport" aria-label="汽车采样站三维组态图">
        <div className="scene-grid"/><div className="scene-vignette"/>
        <Suspense fallback={<div className="scene-loading"><i/>三维场景加载中</div>}><StationScene /></Suspense>
        <div className="scene-tag">DIGITAL TWIN <b>{snapshot ? (snapshot.source.simulated ? 'SIMULATION' : 'LIVE') : 'CONNECTING'}</b></div>
      </section>
      <OperationsRail snapshot={snapshot} />
      <WorkflowDock snapshot={snapshot} />
    </div>
    {error && <div className="link-warning"><i/>{error}</div>}
  </main>;
}
