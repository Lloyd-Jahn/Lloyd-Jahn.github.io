# Lloyd-Jahn.github.io

姜毅 / Yi Jiang 的个人主页，基于 [al-folio](https://github.com/alshedivat/al-folio) v1.x（gem 版主题 `al_folio_core`）构建，
默认英文，带一个 EN / 中文 切换按钮。

线上地址：<https://lloyd-jahn.github.io>

## 本地预览

需要 Ruby ≥ 3（本机用 `brew install ruby` 装的 4.0.x，系统自带的 2.6 不行）和 ImageMagick。

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install             # 首次；gem 装在 vendor/bundle，已 gitignore
bundle exec jekyll serve --livereload   # http://127.0.0.1:4000
```

改 `_config.yml` 不会热更新，要 `Ctrl-C` 重启才生效；其他文件都会自动重建。

## 部署

推到 `main` 后由 `.github/workflows/deploy.yml` 自动构建并推送到 `gh-pages` 分支。

首次需要在 GitHub 上设置一次：**Settings → Pages → Source → Deploy from a branch → `gh-pages` / `(root)`**。

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

⚠️ `_bibliography/papers.bib` 不能删。它是论文列表的唯一数据来源，删掉之后首页的
Selected publications 和 `/publications/` 页会一起消失，并且构建会直接报错。

论文条目里可用的字段：`abbr`（右侧色块，颜色在 `_data/venues.yml` 里配）、`selected`、`arxiv`、
`preview`（缩略图，放在 `assets/img/publication_preview/`）。作者姓氏后加 `*` 表示共同一作，
写成 `{Jiang*, Yi}` 而不是 `{Jiang, Yi*}`，否则星号会跑到名字前面。

## 中英切换是怎么实现的

al-folio 本身没有 i18n。这里的做法是：**两种语言都写进 HTML，用 CSS 只显示其中一种**。

- 正文里成对写 `<span class="i18n-en">…</span><span class="i18n-zh">…</span>`；
  整段落用 `<div class="i18n-en" markdown="1">` / `<div class="i18n-zh" markdown="1">`。
- 页面标题、描述：在 front matter 里加 `title_zh:` / `description_zh:`。
- 导航栏文字：中文写在 `_data/i18n.yml` 的 `nav:` 下，key 必须和页面 front matter 里的英文
  `title` 完全一致（现在是 `About` / `Publications` / `CV`）。
- `assets/js/lang-toggle.js` 在 `<html>` 上设置 `data-lang`，`_sass/_i18n.scss` 据此隐藏另一种语言。
  语言存在 `localStorage`，也支持用 `?lang=zh` 链接直接打开中文版。
- 默认英文；没有写中文的地方会自动回落到英文，不会变成空白。

### 覆写了主题的哪些文件

主题模板都在 gem 里（`vendor/bundle/.../al_folio_core-*/`），下面这几个是本地覆写版。
升级 al-folio 后如果这些文件在上游有改动，需要拿新版重新打一遍补丁：

| 文件 | 改动 |
| --- | --- |
| `_includes/header.liquid` | 语言按钮、导航栏文字双语、CV 直链 PDF、引入 `lang-toggle.js` |
| `_includes/news.liquid` | 动态日期按语言切换格式 |
| `_includes/footer.liquid` | Last updated 用缩写月份（`Aug` 而不是 `August`） |
| `_layouts/about.liquid` | 段落标题双语并首字母大写、社交图标移到头像下方、头像 alt 用真名 |
| `_layouts/page.liquid` | 支持 `title_zh` / `description_zh` |
| `assets/css/main.scss` | 末尾多一行 `@use "i18n"` |

新增（不是覆写）：`_includes/nav_label.liquid`、`_sass/_i18n.scss`、`assets/js/lang-toggle.js`、`_data/i18n.yml`。

`_sass/_i18n.scss` 除了语言切换，还放了几条本地样式微调：作者名加粗（主题默认是下划线）、
头像列宽 25%（默认 30%）、头像下方图标大小。

`purgecss.config.js` 里把 `data-lang` 和 `i18n-*` 加进了 safelist —— 这两个只在运行时出现在 DOM 上，
不加的话 CI 的 CSS 清理步骤会把中文模式的样式删掉。
