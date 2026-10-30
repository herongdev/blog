import { isIP } from 'node:net';

export const SITE_NAME = '何荣开发工具库';
export const SITE_DESCRIPTION = '按工具、功能或问题查找 Codex、Cursor、TRAE、VS Code 等开发工具的教程与官方资料。已亲测教程写明操作步骤、适用条件和资料来源。';
export const DEFAULT_SITE_URL = 'https://dev.herong.info';
export const AUTHOR_NAME = '何荣';

export const BASE_PATH = process.env.PUBLIC_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(BASE_PATH)) {
  throw new Error('PUBLIC_BASE_PATH must be an absolute path ending in /, such as / or /dev/');
}

export const DEPLOY_ENV = process.env.PUBLIC_DEPLOY_ENV || 'production';
if (!['production', 'staging'].includes(DEPLOY_ENV)) {
  throw new Error('PUBLIC_DEPLOY_ENV must be production or staging');
}
export const IS_STAGING = DEPLOY_ENV === 'staging';
const siteHostname = new URL(process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).hostname;
const unwrappedHostname = siteHostname.startsWith('[') ? siteHostname.slice(1, -1) : siteHostname;
export const BLOCK_INDEXING = IS_STAGING || isIP(unwrappedHostname) !== 0;
