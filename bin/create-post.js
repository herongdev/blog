#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);

function showHelp() {
    console.log(`
VitePress 文章创建工具

用法:
  node bin/create-post.js [选项] <文章标题>

选项:
  --template, -t <模板名>    使用指定模板 (默认: article)
  --dir, -d <目录路径>       在指定目录创建文章 (相对于 docs/posts/)
  --filename, -f <文件名>    指定文件名 (默认根据标题生成)
  --help, -h                显示帮助信息

模板选项:
  - article        标准文章模板 (默认)
  - series-intro   系列文章导言模板
  - post           简单文章模板 (来自 scaffolds/)

示例:
  # 在根目录创建文章
  node bin/create-post.js "我的新文章"
  
  # 使用指定模板
  node bin/create-post.js -t series-intro "Vue 系列导言"
  
  # 在指定目录创建
  node bin/create-post.js -d "前端/Vue" "Vue 组件优化"
  
  # 指定文件名
  node bin/create-post.js -f "vue-optimization" "Vue 组件优化"
  
  # 使用 scaffolds 模板
  node bin/create-post.js -t post "简单文章"
`);
}

function parseArgs() {
    const options = {
        template: 'article',
        dir: '',
        filename: '',
        title: ''
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--help' || arg === '-h') {
            showHelp();
            process.exit(0);
        } else if (arg === '--template' || arg === '-t') {
            options.template = args[++i];
        } else if (arg === '--dir' || arg === '-d') {
            options.dir = args[++i];
        } else if (arg === '--filename' || arg === '-f') {
            options.filename = args[++i];
        } else if (!arg.startsWith('-')) {
            options.title = arg;
            break;
        }
    }

    if (!options.title) {
        console.error('错误: 请提供文章标题');
        showHelp();
        process.exit(1);
    }

    return options;
}

function titleToFilename(title) {
    // 将标题转换为合适的文件名
    return title
        .replace(/[<>:"/\\|?*]/g, '') // 移除不合法字符
        .replace(/\s+/g, '-') // 空格转为连字符
        .toLowerCase();
}

function getTemplateContent(templateName) {
    const templatePaths = [
        path.join(__dirname, '..', 'docs', 'posts', '_templates', `${templateName}.md`),
        path.join(__dirname, '..', 'scaffolds', `${templateName}.md`)
    ];

    for (const templatePath of templatePaths) {
        if (fs.existsSync(templatePath)) {
            return fs.readFileSync(templatePath, 'utf8');
        }
    }

    // 如果没找到模板，使用默认模板
    return `---
title: ${templateName === 'post' ? '{{ title }}' : '<替换为标题>'}
description: <一句话摘要，便于 SEO>
date: ${new Date().toISOString().split('T')[0]}
tags: []
---

## 内容开始

在这里开始写作...
`;
}

function replaceTemplateVariables(content, options) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    return content
        .replace(/\{\{\s*title\s*\}\}/g, options.title)
        .replace(/\{\s*{\s*title\s*}\s*\}/g, options.title) // 处理带空格的情况
        .replace(/\{\{\s*date\s*\}\}/g, dateStr)
        .replace(/\{\s*{\s*date\s*}\s*\}/g, dateStr) // 处理带空格的情况
        .replace(/<替换为标题>/g, options.title)
        .replace(/2025-01-01/g, dateStr); // 替换模板中的默认日期
}

function createPost(options) {
    // 确定文件名
    const filename = options.filename || titleToFilename(options.title);
    const fullFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

    // 确定目标目录
    const baseDir = path.join(__dirname, '..', 'docs', 'posts');
    const targetDir = options.dir ? path.join(baseDir, options.dir) : baseDir;

    // 创建目录（如果不存在）
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`创建目录: ${path.relative(process.cwd(), targetDir)}`);
    }

    // 目标文件路径
    const targetFile = path.join(targetDir, fullFilename);

    // 检查文件是否已存在
    if (fs.existsSync(targetFile)) {
        console.error(`错误: 文件已存在 ${path.relative(process.cwd(), targetFile)}`);
        process.exit(1);
    }

    // 获取模板内容
    const templateContent = getTemplateContent(options.template);

    // 替换模板变量
    const finalContent = replaceTemplateVariables(templateContent, options);

    // 写入文件
    fs.writeFileSync(targetFile, finalContent, 'utf8');

    const relativePath = path.relative(process.cwd(), targetFile);
    console.log(`✅ 文章创建成功: ${relativePath}`);
    console.log(`📝 模板: ${options.template}`);
    console.log(`📂 目录: ${options.dir || '根目录'}`);
    console.log(`\n可以开始编辑您的文章了！`);
}

// 主函数
function main() {
    try {
        const options = parseArgs();
        createPost(options);
    } catch (error) {
        console.error('错误:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
