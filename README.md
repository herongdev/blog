# herong.info 站点仓库

这个仓库同时管理站点代码和站点相关资料。

- `code/`：所有可运行代码，使用 pnpm monorepo 管理。
- `.github/`：仓库级 CI/CD 配置。
- 根目录其他文件：备案、简历、审核素材等非代码资料。

代码目录和常用命令见 [`code/README.md`](code/README.md)。技术博客仍然保留在 `code/apps/blog/`，现有文章、RSS 和 GitHub Pages/VPS 发布流程均继续使用。

> 证件、私钥、商户证书等敏感原件不要提交到 Git；部署私钥请放到已忽略的 `code/secrets/` 目录。
