export type Section = 'tutorials' | 'articles' | 'tools' | 'apps' | 'projects' | 'about';
export interface ChromeOptions {
  homeUrl?: string;
  guidesUrl?: string;
  toolsUrl?: string;
  active?: Section;
}
export interface NavigationItem { id: Section; label: string; href: string; }
export function getNavigation(options?: ChromeOptions): NavigationItem[];
export function renderHeader(options?: ChromeOptions): string;
export function renderFooter(): string;
export const CONTACT_EMAIL: string;
export const BRAND_NAME: string;
export const BRAND_DESCRIPTION: string;
export const FILING_NUMBER: string;
export const FILING_URL: string;
export const BRAND_LOGO_DATA_URL: string;
export const themeBootstrapScript: string;
