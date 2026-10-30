#!/usr/bin/env node
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { checkMedia, publishMedia } from './media-core.mjs';
import { createS3Storage } from './media-s3.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localEnv = path.join(projectRoot, '.env.media.local');
if (existsSync(localEnv)) process.loadEnvFile(localEnv);
const directory = path.join(projectRoot, 'src/content/tutorials');
const command = process.argv[2];
const options = new Set(process.argv.slice(3));

async function main() {
  if (command === 'check' && options.size === 0) {
    const issues = await checkMedia({ directory, baseUrl: process.env.MEDIA_PUBLIC_BASE_URL });
    if (issues.length) {
      console.error(`发现 ${issues.length} 处未发布的教程图片：\n${issues.map((issue) => `- ${issue}`).join('\n')}`);
      console.error('请先运行 pnpm media:publish，再构建网站。');
      process.exitCode = 1;
    } else {
      console.log('教程图片检查通过：没有待发布的本地引用。');
    }
    return;
  }
  if (command === 'publish' && [...options].every((option) => option === '--dry-run')) {
    const result = await publishMedia({
      directory,
      baseUrl: process.env.MEDIA_PUBLIC_BASE_URL,
      dryRun: options.has('--dry-run'),
      storageFactory: () => createS3Storage(),
    });
    if (result.assets === 0) {
      console.log('没有待发布的本地教程图片。');
    } else if (result.dryRun) {
      console.log(`预览：${result.articles} 篇教程、${result.assets} 张图片。不会上传或改写文件。`);
      for (const url of result.urls) console.log(url);
    } else {
      console.log(`完成：${result.articles} 篇教程、${result.assets} 张图片；新上传 ${result.uploaded}，远端已有 ${result.existing}。`);
    }
    return;
  }
  throw new Error('用法：pnpm media:check 或 pnpm media:publish [--dry-run]');
}

main().catch((error) => {
  console.error(`媒体发布失败：${error.message}`);
  process.exitCode = 1;
});
