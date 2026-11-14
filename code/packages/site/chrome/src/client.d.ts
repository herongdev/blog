/** Initialize progressive chrome controls; cleanup is safe to call repeatedly. */
export function initSiteChrome(document: Document): () => void;
/** Apply and persist a preference through the existing chrome controller. Returns whether all legacy keys were saved. */
export function setSiteTheme(document: Document, preference: 'light' | 'dark' | 'system' | 'auto'): boolean;
