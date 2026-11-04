export interface Station {
  id: string;
  code: string;
  name: string;
  location: string;
  status: 'IDLE' | 'RUNNING' | 'OFFLINE';
}

export interface SystemInfo {
  name: string;
  version: string;
  dataMode: 'local-demo' | 'dm8' | 'mysql';
}

export type SamplingScenario = 'NORMAL' | 'POINT_MISMATCH' | 'COMMUNICATION_LOSS';
export type StepStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'WARNING';
export type DataQuality = 'GOOD' | 'UNCERTAIN' | 'BAD' | 'STALE';

export interface SamplingSnapshot {
  stationId: string;
  source: { type: string; provider: string; contractVersion: string; simulated: boolean };
  scenario: SamplingScenario;
  generatedAt: string;
  task: { id: string | null; status: 'IDLE' | 'IN_PROGRESS' | 'WARNING' | 'COMPLETED'; startedAt: string | null; completedAt: string | null; currentStep: string | null; vehicle: { plateNumber: string; supplier: string; samplingUnit: string; bucketNumber: string } | null; plannedPoints: number; completedPoints: number };
  workflow: Array<{ code: string; name: string; status: StepStatus; message: string | null }>;
  devices: Array<{ id: string; name: string; type: string; status: 'READY' | 'RUNNING' | 'WARNING' | 'OFFLINE'; online: boolean; updatedAt: string }>;
  realtimeValues: Array<{ pointCode: string; value: number; unit: string; quality: DataQuality; sourceTimestamp: string; receivedAt: string; sequence: number }>;
  activeAlarms: Array<{ id: string; deviceId: string; code: string; level: 'INFO' | 'WARNING' | 'CRITICAL'; status: string; message: string; occurredAt: string; recoveredAt: string | null }>;
  recentRecords: Array<{ id: string; taskId: string; serialNumber: string; plateNumber: string; bucketNumber: string; sampleWeightKg: number; samplingArea: string; recordedAt: string }>;
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createApiClient(baseUrl: string) {
  async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
      headers: { Accept: 'application/json' },
      // Initial dashboard hydration can compete with Babylon's first-load chunks
      // on slow links. The component-owned signal still cancels on unmount; only
      // standalone refreshes use a fixed timeout.
      signal: signal ?? AbortSignal.timeout(30_000),
    });
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new ApiError('服务暂不可用，请稍后重试', response.status, 'INVALID_RESPONSE');
    }
    const body = await response.json() as ApiResponse<T>;
    if (!response.ok || body.code !== 'OK') {
      throw new ApiError(body.message || '请求失败', response.status, body.code || 'REQUEST_FAILED');
    }
    return body.data;
  }
  async function post<T>(path: string): Promise<T> {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
      method: 'POST', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10_000),
    });
    const body = await response.json() as ApiResponse<T>;
    if (!response.ok || body.code !== 'OK') throw new ApiError(body.message || '请求失败', response.status, body.code || 'REQUEST_FAILED');
    return body.data;
  }
  return {
    listStations: (signal?: AbortSignal) => get<Station[]>('/stations', signal),
    getStation: (id: string, signal?: AbortSignal) => get<Station>(`/stations/${encodeURIComponent(id)}`, signal),
    getSystemInfo: (signal?: AbortSignal) => get<SystemInfo>('/system/info', signal),
    getSamplingSnapshot: (stationId: string, signal?: AbortSignal) => get<SamplingSnapshot>(`/v1/sampling/stations/${encodeURIComponent(stationId)}/snapshot`, signal),
    startSamplingScenario: (stationId: string, scenario: SamplingScenario) => post(`/v1/simulation/stations/${encodeURIComponent(stationId)}/scenarios/${scenario}/start`),
    resetSamplingScenario: (stationId: string) => post(`/v1/simulation/stations/${encodeURIComponent(stationId)}/reset`),
    samplingEventsUrl: (stationId: string) => `${baseUrl.replace(/\/$/, '')}/v1/sampling/stations/${encodeURIComponent(stationId)}/events`,
  };
}
