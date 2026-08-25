# Lloyd-Jahn.github.io

Yi Jiang 的个人主页，基于 [al-folio](https://github.com/alshedivat/al-folio) v1.x（gem 版主题 `al_folio_core`）构建。

## 本地预览

需要 Ruby ≥ 3 和 ImageMagick。

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install
bundle exec jekyll serve --livereload   # http://127.0.0.1:4000
```

## 日常维护

| 想改什么 | 改哪里 |
| --- | --- |
| 个人简介 | `_pages/about.md` |
| 加一篇论文 | `_bibliography/papers.bib`（`selected={true}` 的会出现在首页） |
| 加一条动态 | 在 `_news/` 新建 `YYYY-MM-DD-slug.md` |
| 邮箱、GitHub 等社交图标 | `_data/socials.yml` |
| 导航栏的中文译名 | `_data/i18n.yml` |
| 站点标题、URL、开关项 | `_config.yml` |
| 头像 | 替换 `assets/img/prof_pic.jpg`（3:4 竖版，宽 1400px 左右即可） |
| CV | 把 PDF 命名为 `cv.pdf` 放进 `assets/pdf/`，导航栏的 CV 直接指向它 |
