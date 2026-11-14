export type Role = 'owner' | 'admin' | 'editor' | 'viewer';
export type PlatformRole = 'platform_owner' | 'platform_admin' | 'none';
export interface User { id: string; name: string; nickname?: string; avatarUrl?: string; profileUpdatedAt?: number | null; status: string; platformRole: PlatformRole; version: number; createdAt: string | number }
export interface Session { authenticated: boolean; user?: User; csrfToken?: string; issuer?: string }
export interface Permission { key: string; label: string; roles: Role[] }
export interface App { id: string; slug: string; name: string; description: string; homepageUrl: string; status: string; permissionCatalog: Permission[]; version: number; createdAt: string | number; updatedAt: string | number; memberCount: number; clientCount: number }
export interface Client { clientId: string; appId: string; name: string; redirectUris: string[]; enabled: boolean; version: number; previousSecretUntil?: string | number }
export interface Member { subject?: string; userId?: string; id?: string; name?: string; userName?: string; role: Role; status: string; version: number; createdAt?: string | number }
export interface Invite { id: string; appId: string; appName?: string; role: Role; label: string; status: string; createdAt: string | number; expiresAt: string | number; version: number; claimedBy?: string; claimantName?: string; claimantId?: string; claimantSubject?: string }
export interface Audit { id: string; action?: string; actorName?: string; actorId?: string; actorSubject?: string; resourceType?: string; resourceId?: string; appId?: string; details?: unknown; targetType?: string; targetId?: string; outcome?: string; result?: string; createdAt?: string | number; at?: string | number; detail?: string }
export interface Page<T> { items: T[]; page: number; pageSize: number; total: number }
