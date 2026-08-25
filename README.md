# Lloyd-Jahn.github.io

Yi Jiang 的个人主页，基于 [al-folio](https://github.com/alshedivat/al-folio) v1.x（gem 版主题 `al_folio_core`）构建。

## 本地预览

需要 Ruby ≥ 3（本机用 `brew install ruby` 装的 4.0.x）和 ImageMagick。

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install             # 首次；gem 装在 vendor/bundle，已 gitignore
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
