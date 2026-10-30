/** Resolve a path within this app, using the same base as Astro's generated assets. */
export function withBase(path = '/'): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
