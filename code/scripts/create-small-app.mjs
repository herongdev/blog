import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, mkdtemp, readFile, readdir, rename, rm, rmdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const codeRoot = fileURLToPath(new URL('../', import.meta.url));
const templateRoot = join(codeRoot, 'templates/small-app');
const expectedPackages = ['@herongxhr/design-tokens', '@herongxhr/ui-react', '@herongxhr/identity-client'];
const issuer = 'https://auth.herong.info';
const plainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const help = `创建独立的小应用仓库骨架（官网、管理后台、服务端微信登录接入）。

用法：
  node code/scripts/create-small-app.mjs --id example-tool --name "示例工具" --description "工具的真实用途" --out /path/to/example-tool

必填：
  --id            2–48 位小写应用标识，以字母开头；可含数字、短横线
  --name          应用名称，1–80 字符
  --description   应用说明，1–500 字符，单行
  --out           新项目路径，目标必须不存在

可选：
  --origin        精确 HTTPS origin，不带尾部 /；默认 https://<id>.herong.info
  --brand-light   浅色主题品牌色，#RRGGBB；默认 #5C50B8
  --brand-dark    深色主题品牌色，#RRGGBB；默认 #B5A6E5
  --download      真实 HTTPS 下载地址；未填写时不生成下载按钮
  --port          本地开发入口端口，1024–65533；默认 4310
  --help          显示帮助

生成器不会安装依赖、联网、创建应用账号或生成客户端密钥。
公共包使用 npm 精确版本，安装和构建不依赖 blog 的位置。
不需要预先打包公共组件；项目生成后正常执行 pnpm install。
升级公共包时修改项目 package.json 的 herong.sharedPackages，再运行 pnpm ui:update。
首次真实登录需要在 auth.herong.info 管理后台创建应用和客户端、分配本人角色，
将一次性客户端密钥仅填入服务端环境，并部署已登记的 HTTPS 回调地址。
identity-registration.json 是接入清单，不是自动注册或已有的导入接口。
本地 HTTP 只用于页面开发预览，不会执行真实微信登录。
`;

async function existing(path) {
  try { return await lstat(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function textOption(value, name, maximum) {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum || /[\u0000-\u001f\u007f]/.test(value)) {
    throw new Error(`${name} must contain 1–${maximum} characters without control characters.`);
  }
  return value.trim();
}

function publicOrigin(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('--origin must be an exact HTTPS origin.');
  let url;
  try { url = new URL(value); } catch { throw new Error('--origin must be an exact HTTPS origin.'); }
  if (url.protocol !== 'https:' || url.origin !== value || url.username || url.password || url.search || url.hash) {
    throw new Error('--origin must be an exact HTTPS origin without a trailing slash, credentials, query, or fragment.');
  }
  return url.origin;
}

function downloadUrl(value) {
  if (value === undefined) return null;
  if (value.length > 2048 || /[\s\u0000-\u001f\u007f]/.test(value)) throw new Error('--download must be a valid HTTPS URL.');
  let url;
  try { url = new URL(value); } catch { throw new Error('--download must be a valid HTTPS URL.'); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('--download must be an HTTPS URL without credentials.');
  return url.href;
}

function color(value, name) {
  if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`${name} must be #RRGGBB.`);
  return value.toUpperCase();
}

async function sharedVersions() {
  const packages = [];
  for (const directory of ['design-tokens', 'ui-react', 'identity-client']) {
    const path = join(codeRoot, 'packages/shared', directory, 'package.json');
    const metadata = JSON.parse(await readFile(path, 'utf8'));
    const expectedName = `@herongxhr/${directory}`;
    if (!plainObject(metadata) || metadata.name !== expectedName || typeof metadata.version !== 'string'
        || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(metadata.version)) {
      throw new Error(`The shared package ${directory} must have an exact stable published version.`);
    }
    packages.push({ name: metadata.name, version: metadata.version });
  }
  return packages;
}

async function templateFiles(directory = templateRoot, prefix = '') {
  const info = await lstat(directory);
  if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('The template must contain only regular directories and files.');
  const files = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((left, right) => left.name.localeCompare(right.name))) {
    if (['node_modules', 'dist', '.astro', '.local', '.git'].includes(entry.name)) throw new Error(`Generated content found in template: ${join(prefix, entry.name)}`);
    if (entry.name === '.env' || entry.name.startsWith('.env.')) throw new Error('Environment files must not be copied from the template.');
    if (/\.md$/i.test(entry.name)) throw new Error('Markdown documents are not part of this template.');
    const relativePath = join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await templateFiles(join(directory, entry.name), relativePath));
    else if (entry.isFile()) files.push(relativePath);
    else throw new Error(`Unsupported template entry: ${relativePath}`);
  }
  return files;
}

async function main() {
  const { values } = parseArgs({ options: {
    help: { type: 'boolean' }, id: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' },
    origin: { type: 'string' }, out: { type: 'string' }, 'brand-light': { type: 'string', default: '#5C50B8' },
    'brand-dark': { type: 'string', default: '#B5A6E5' }, download: { type: 'string' },
    port: { type: 'string', default: '4310' },
  }, allowPositionals: false, strict: true });
  if (values.help) { process.stdout.write(help); return; }
  if (typeof values.id !== 'string' || !/^[a-z][a-z0-9-]{0,46}[a-z0-9]$/.test(values.id)) throw new Error('--id must be a 2–48 character lowercase slug, starting with a letter and ending with a letter or digit.');
  const id = values.id;
  const name = textOption(values.name, '--name', 80);
  const description = textOption(values.description, '--description', 500);
  const origin = publicOrigin(values.origin ?? `https://${id}.herong.info`);
  if (!/^\d{4,5}$/.test(values.port) || Number(values.port) < 1024 || Number(values.port) > 65533) throw new Error('--port must be an integer from 1024 to 65533.');
  const product = {
    id, name, description, origin,
    brand: { lightAccent: color(values['brand-light'], '--brand-light'), darkAccent: color(values['brand-dark'], '--brand-dark') },
    links: { download: downloadUrl(values.download) },
    auth: { issuer, clientId: `${id}-admin`, permission: `${id}.admin.read` },
    dev: { port: Number(values.port) },
  };
  if (typeof values.out !== 'string' || !values.out.trim() || /[\u0000-\u001f\u007f]/.test(values.out)) throw new Error('--out is required and must be a new project path.');
  const output = resolve(values.out);
  if (output === templateRoot || output.startsWith(templateRoot + sep)) throw new Error('The output cannot be inside the source template.');
  if (await existing(output)) throw new Error('The output already exists; choose a new project path.');
  const packages = await sharedVersions();
  const files = await templateFiles();
  const requiredFiles = ['apps/website/package.json', 'apps/admin/package.json', 'packages/brand/package.json', 'services/api/package.json', 'services/api/src/server.mjs', 'scripts/dev.mjs', 'scripts/update_shared.mjs'];
  if (requiredFiles.some((path) => !files.includes(path))) throw new Error('The application template is incomplete.');
  const versions = new Map(packages.map((entry) => [entry.name, entry.version]));
  const parent = dirname(output);
  await mkdir(parent, { recursive: true });
  let temporary = await mkdtemp(join(parent, `.${id}-create-`));
  let reservation;
  try {
    const write = async (path, content) => {
      const destination = join(temporary, path);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, content, { flag: 'wx', mode: 0o644 });
    };
    for (const path of files) {
      const source = join(templateRoot, path);
      const destination = join(temporary, path);
      await mkdir(dirname(destination), { recursive: true });
      if (path.endsWith('package.json')) {
        const metadata = JSON.parse(await readFile(source, 'utf8'));
        for (const kind of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
          if (!plainObject(metadata[kind])) continue;
          for (const packageName of expectedPackages) if (packageName in metadata[kind]) metadata[kind][packageName] = versions.get(packageName);
        }
        await writeFile(destination, json(metadata), { flag: 'wx', mode: 0o644 });
      } else await copyFile(source, destination, constants.COPYFILE_EXCL);
    }
    await write('package.json', json({
      name: `${id}-workspace`, private: true, type: 'module', packageManager: 'pnpm@10.28.0', engines: { node: '>=24.22.0' },
      scripts: {
        build: 'pnpm --filter @app/brand build && pnpm --filter @app/website build && pnpm --filter @app/admin build && pnpm run api:check',
        check: 'pnpm --filter @app/brand build && pnpm --filter @app/website check && pnpm --filter @app/admin check && pnpm run api:check',
        'api:check': 'pnpm --filter @app/api check',
        'ui:update': 'node scripts/update_shared.mjs',
        dev: 'node scripts/dev.mjs',
        start: 'node --env-file-if-exists=.env services/api/src/server.mjs',
      },
      herong: { sharedPackages: Object.fromEntries(packages.map(({ name: packageName, version }) => [packageName, version])) },
    }));
    await write('pnpm-workspace.yaml', 'packages:\n  - apps/*\n  - packages/*\n  - services/*\n');
    await write('packages/config/package.json', json({ name: '@app/config', version: '0.1.0', private: true, type: 'module', exports: { './product.json': './product.json' } }));
    await write('packages/config/product.json', json(product));
    await write('identity-registration.json', json({
      schemaVersion: 1, issuer, managementUrl: `${issuer}/admin/`,
      metadata: {
        automaticRegistration: false,
        purpose: '接入清单；当前统一后台没有此 JSON 的自动导入接口。',
        steps: ['创建应用并填写下方权限目录。', '在该应用下创建登录客户端，把仅显示一次的客户端密钥保存在应用服务端 AUTH_CLIENT_SECRET 环境变量中。', '在成员权限中添加现有本人账号，授予应用 owner 角色；新管理员另行邀请并批准。', '部署正式 HTTPS 域名与已登记回调后，再验证真实微信登录。'],
      },
      app: { slug: id, name, description, homepageUrl: `${origin}/`, permissionCatalog: [{ key: product.auth.permission, label: '访问管理后台', roles: ['owner', 'admin', 'editor', 'viewer'] }] },
      client: { clientId: product.auth.clientId, name: [...`${name}管理后台`].slice(0, 80).join(''), redirectUris: [`${origin}/api/auth/callback`] },
      initialMembership: { role: 'owner', status: 'active' },
      requiredServerSecrets: ['AUTH_CLIENT_SECRET'],
    }));
    await write('.env.example', '# Server-only credential returned once by the identity management console.\nAUTH_CLIENT_SECRET=\n');
    await write('.gitignore', 'node_modules/\ndist/\n.astro/\n.local/\n.env\n.env.*\n!.env.example\n.DS_Store\n');

    // mkdir is the no-clobber operation. Only replace our own empty reservation;
    // rename then publishes all generated contents together on the same volume.
    await mkdir(output);
    reservation = await lstat(output);
    const current = await lstat(output);
    if (current.dev !== reservation.dev || current.ino !== reservation.ino || !current.isDirectory() || current.isSymbolicLink()) throw new Error('The output path changed while the project was being created.');
    await rename(temporary, output);
    temporary = null;
    reservation = null;
    process.stdout.write(`已生成独立应用：${output}\n公共包使用 npm 精确版本，不依赖其他仓库目录。\n下一步：进入新项目，执行 pnpm install --ignore-scripts，然后 pnpm check 和 pnpm build。\n本地页面预览使用 pnpm dev；真实微信登录按 identity-registration.json 完成一次性注册和 HTTPS 部署。\n`);
  } finally {
    if (temporary) await rm(temporary, { recursive: true, force: true });
    if (reservation) {
      const current = await existing(output);
      if (current?.isDirectory() && !current.isSymbolicLink() && current.dev === reservation.dev && current.ino === reservation.ino) {
        await rmdir(output).catch((error) => { if (!['ENOENT', 'ENOTEMPTY'].includes(error.code)) throw error; });
      }
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Project generation failed.';
  process.stderr.write(`${message}\nUse --help to see the supported options.\n`);
  process.exitCode = 1;
});
