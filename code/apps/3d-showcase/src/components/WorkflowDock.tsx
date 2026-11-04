import type { SamplingSnapshot, StepStatus } from '../lib/api-client';
import { HudPanel } from './HudPanel';
import { ArrowRight } from 'lucide-react';

const labels: Record<StepStatus, string> = { PENDING: '待处理', PROCESSING: '处理中', COMPLETED: '已完成', WARNING: '异常' };

export function WorkflowDock({ snapshot }: { snapshot?: SamplingSnapshot }) {
  const steps = (snapshot?.workflow ?? []).filter(step => step.code !== 'EXIT_RELEASE');
  return <HudPanel title="采样流程状态" className="workflow-dock"><div className="workflow-cards" role="list">{steps.map((step, index) => <div className={`workflow-step ${step.status.toLowerCase()}`} key={step.code} role="listitem">
    <div className="workflow-shell"><div className="step-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>{index < steps.length - 1 && <ArrowRight className="workflow-arrow" size={16} aria-hidden="true"/>}
      <div className="workflow-card"><div className="workflow-card-top"><div><small>FLOW STEP</small><strong>{step.name}</strong></div><span className="status-badge"><i/>{labels[step.status]}</span></div></div>
    </div>
  </div>)}</div></HudPanel>;
}
