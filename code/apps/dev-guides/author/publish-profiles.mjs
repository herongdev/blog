import { isIP } from 'node:net';

/** Deployment-only switch; publishing origins never come from browser requests. */
export function createPublishProfiles({ target = 'ip', authorOrigin } = {}) {
  if (!['ip', 'domains'].includes(target)) {
    throw new Error('AUTHOR_PUBLISH_TARGET must be ip or domains');
  }
  if (target === 'ip') {
    const origin = new URL(authorOrigin);
    const hostname = origin.hostname.replace(/^\[|\]$/g, '');
    if (origin.protocol !== 'https:' || origin.origin !== authorOrigin || origin.port || !isIP(hostname)) {
      throw new Error('IP publishing requires an HTTPS IP author origin without a port or path');
    }
  }
  return {
    staging: {
      root: '/var/www/herong-dev-guides-staging',
      site: target === 'domains' ? 'https://test-dev.herong.info' : authorOrigin,
      basePath: target === 'domains' ? '/' : '/test-dev/',
    },
    production: {
      root: '/var/www/herong-dev-guides',
      site: target === 'domains' ? 'https://dev.herong.info' : authorOrigin,
      basePath: target === 'domains' ? '/' : '/dev/',
    },
  };
}
