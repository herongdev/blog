import { Activity, Truck, Wind, Trash2, FlaskConical, Archive, Thermometer, Video, ShieldCheck, ChartNoAxesColumn, Bell, Settings, TriangleAlert, ChevronDown, ChevronRight } from 'lucide-react';

const icons = {
  sampler: Activity, truck: Truck, air: Wind, bucket: Trash2,
  flask: FlaskConical, archive: Archive, temp: Thermometer, video: Video,
  shield: ShieldCheck, chart: ChartNoAxesColumn, alarm: Bell, pulse: Activity,
  gear: Settings, warning: TriangleAlert, chevron: ChevronDown, chevronRight: ChevronRight,
};
export type HudIconName = keyof typeof icons;

export function HudIcon({ name }: { name: HudIconName }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" />;
}
