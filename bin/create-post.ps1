#!/usr/bin/env pwsh

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Title,
    
    [Parameter()]
    [Alias("t")]
    [string]$Template = "article",
    
    [Parameter()]
    [Alias("d")]
    [string]$Dir = "",
    
    [Parameter()]
    [Alias("f")]
    [string]$Filename = "",
    
    [Parameter()]
    [Alias("h")]
    [switch]$Help
)

function Show-Help {
    Write-Host @"

VitePress 文章创建工具 (PowerShell 版)

用法:
  .\bin\create-post.ps1 [-Template <模板名>] [-Dir <目录路径>] [-Filename <文件名>] <文章标题>

参数:
  -Template, -t <模板名>    使用指定模板 (默认: article)
  -Dir, -d <目录路径>       在指定目录创建文章 (相对于 docs/posts/)
  -Filename, -f <文件名>    指定文件名 (默认根据标题生成)
  -Help, -h                 显示帮助信息

模板选项:
  - article        标准文章模板 (默认)
  - series-intro   系列文章导言模板
  - post           简单文章模板 (来自 scaffolds/)

示例:
  # 在根目录创建文章
  .\bin\create-post.ps1 "我的新文章"
  
  # 使用指定模板
  .\bin\create-post.ps1 -Template series-intro "Vue 系列导言"
  
  # 在指定目录创建
  .\bin\create-post.ps1 -Dir "前端/Vue" "Vue 组件优化"
  
  # 指定文件名
  .\bin\create-post.ps1 -Filename "vue-optimization" "Vue 组件优化"

"@
}

function Convert-TitleToFilename {
    param([string]$Title)
    
    return $Title -replace '[<>:"/\\|?*]', '' -replace '\s+', '-'
}

function Get-TemplateContent {
    param([string]$TemplateName)
    
    $templatePaths = @(
        "docs\posts\_templates\$TemplateName.md",
        "scaffolds\$TemplateName.md"
    )
    
    foreach ($templatePath in $templatePaths) {
        if (Test-Path $templatePath) {
            return Get-Content $templatePath -Raw -Encoding UTF8
        }
    }
    
    # 默认模板
    $dateStr = Get-Date -Format "yyyy-MM-dd"
    return @"
---
title: $($TemplateName -eq 'post' ? '{{ title }}' : '<替换为标题>')
description: <一句话摘要，便于 SEO>
date: $dateStr
tags: []
---

## 内容开始

在这里开始写作...
"@
}

function Update-TemplateVariables {
    param(
        [string]$Content,
        [string]$Title
    )
    
    $dateStr = Get-Date -Format "yyyy-MM-dd"
    
    return $Content -replace '\{\{\s*title\s*\}\}', $Title `
                   -replace '\{\s*\{\s*title\s*\}\s*\}', $Title `
                   -replace '\{\{\s*date\s*\}\}', $dateStr `
                   -replace '\{\s*\{\s*date\s*\}\s*\}', $dateStr `
                   -replace '<替换为标题>', $Title `
                   -replace '2025-01-01', $dateStr
}

# 主逻辑
if ($Help) {
    Show-Help
    exit 0
}

try {
    # 确定文件名
    $finalFilename = if ($Filename) { $Filename } else { Convert-TitleToFilename $Title }
    if (-not $finalFilename.EndsWith('.md')) {
        $finalFilename += '.md'
    }
    
    # 确定目标目录
    $baseDir = "docs\posts"
    $targetDir = if ($Dir) { Join-Path $baseDir $Dir } else { $baseDir }
    
    # 创建目录（如果不存在）
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Host "创建目录: $targetDir" -ForegroundColor Green
    }
    
    # 目标文件路径
    $targetFile = Join-Path $targetDir $finalFilename
    
    # 检查文件是否已存在
    if (Test-Path $targetFile) {
        Write-Error "错误: 文件已存在 $targetFile"
        exit 1
    }
    
    # 获取模板内容
    $templateContent = Get-TemplateContent $Template
    
    # 替换模板变量
    $finalContent = Update-TemplateVariables $templateContent $Title
    
    # 写入文件
    $finalContent | Out-File -FilePath $targetFile -Encoding UTF8
    
    Write-Host "✅ 文章创建成功: $targetFile" -ForegroundColor Green
    Write-Host "📝 模板: $Template" -ForegroundColor Cyan
    Write-Host "📂 目录: $(if ($Dir) { $Dir } else { '根目录' })" -ForegroundColor Cyan
    Write-Host "`n可以开始编辑您的文章了！" -ForegroundColor Yellow
    
} catch {
    Write-Error "错误: $($_.Exception.Message)"
    exit 1
}
