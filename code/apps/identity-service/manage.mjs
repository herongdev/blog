import { loadConfig, privateJson } from './config.mjs';
import { IdentityStore } from './store.mjs';

process.umask(0o077);
let store;
try {
  const config = loadConfig();
  const [command, argument, name, ...extra] = process.argv.slice(2);
  if (extra.length) throw new Error('Unexpected arguments');
  if (command !== 'import-owner' && command !== 'set-owner-active') throw new Error('Usage: node manage.mjs import-owner /absolute/private/wechat-account.json [display-name] | set-owner-active true|false');
  if (command === 'import-owner' && !argument) throw new Error('Owner source path is required');
  if (command === 'set-owner-active' && (!['true', 'false'].includes(argument) || name)) throw new Error('Active state must be true or false');
  store = new IdentityStore(config.dataDirectory);
  if (command === 'import-owner') {
    const added = store.importOwner(privateJson(argument, 16384), config.appId, name || '管理员');
    process.stdout.write(added ? 'Verified owner imported.\n' : 'Same verified owner already imported; no changes.\n');
  } else {
    store.setOwnerActive(argument === 'true');
    process.stdout.write('Owner access updated.\n');
  }
} catch (error) {
  // Do not include source file contents, provider identifiers, or environment values.
  process.stderr.write(`${error instanceof SyntaxError ? 'Invalid private JSON configuration' : error.message}\n`);
  process.exitCode = 1;
} finally { store?.close(); }
