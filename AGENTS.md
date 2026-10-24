# 本仓库对 AI 助手的要求

这个文件是本仓库内 AI 协作的唯一入口。人类贡献者的规范在 [CONTRIBUTING.md](CONTRIBUTING.md)，许可在 [LICENSE](LICENSE)（源码 MIT）与 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)（条目数据与文档 CC BY-NC-SA 4.0）。

## 这个项目是什么

一个只做导航的高校 Wiki 站点入口目录。纯静态、无后端、无数据库，部署在 GitHub Pages。

**它的价值来自克制**：不复制正文、不评价对方内容、不收个人信息、条目宁少不错。任何"顺手加个功能"的冲动都先问维护者。

## 允许改动的文件

| 路径 | 能做什么 |
| --- | --- |
| `src/content/docs/wikis.md` | 增删改条目表格行、地区分组、状态与核查日期 |
| `src/content/docs/about.md`、`index.mdx` | 站点定位、免责、维护带宽等对外声明 |
| `astro.config.mjs` | Starlight 配置项（标题、侧栏、编辑链接、语言） |
| `README.md`、`CONTRIBUTING.md`、`.github/**` | 治理文档与表单 |

## 不允许做的事

1. **不要写自定义组件、不要写 CSS/JS、不要加 UI 框架。** 维护者的原话是不再让 AI 从头搓前端。目录内容必须是 Markdown 表格。若确实需要数据驱动渲染（例如条目过百），先提出方案取得同意，因为那会引入 MDX 里的 JSX。
2. **不要引入 CI 校验、schema、lint、husky、自动检查工作流**，除非维护者明确要求。这类东西目前是明确推迟状态，不是遗漏。
3. **不要往条目里写正文摘录、站内截图、他人昵称、个人 QQ 或私人邮箱。** git 历史无法安全擦除。
4. **不要把站点改名、改域名、买域名或改 `base`/`site`**；只发 `eryuemu.github.io/college-wiki-hub/`。
5. **不要为了"完整"而收录维护者自己的站点。** 本目录当前明确不收入运营者本人的站点。
6. 不要主动新增学校条目。地址必须经过实际核查，见下。

## Starlight 的四个坑（本版本 0.42.7 / Astro 7.2.10 实测）

1. **提示框语法**：用 `:::note[标题]` / `:::tip` / `:::caution` / `:::danger`，配对的 `:::` 收尾。**`> [!NOTE]` 这种 GitHub/VitePress 写法不认**，会把方括号原文渲染出来。
2. **中文界面**：必须写 `locales: { root: { label, lang } }`。只写 `defaultLocale: 'zh-CN'` 时 `<html lang>` 仍是 `en`、界面仍是英文。
3. **标题拼接**：本版本没有 `titleTemplate`，`<title>` 永远是「页面标题 | 站点标题」。想让首页不出现「高校 Wiki 目录 | 高校 Wiki 目录」，就把首页 frontmatter 的 `title` 写成「首页」。
4. **访问路径**：`base: '/college-wiki-hub/'`，本地必须访问 `http://localhost:4321/college-wiki-hub/`，根路径返回 404 是正常行为。Markdown 内部链接用相对路径（`about/`），不要用 `/` 开头的绝对路径，否则不带 base。

构建期无害但会刷屏的两条警告可以忽略：`The collection "i18n" does not exist or is empty`、`Entry docs → 404 was not found`。

## 核查一个站点的正确姿势

**HTTP 200 不算证据。** 静态托管的 404 页、空壳首页、域名停放页都可能返回 200。

1. 抓首页，看返回体积是否正常（几 KB 的壳要警惕）。
2. 核对 `<title>` 原文，并数校名关键词在页面里出现的次数。
3. 单页应用（React/Vue）另找数据端点确认里面真有内容。例：重庆大学 `cqu-openlib.cn` 首页只有 2.5 KB，但 `/nav-index.json` 有 555 KB 课程树。
4. 本机打不开**不等于**站点失效。TLS 失败、DNS 黑洞都可能是本地网络问题，标准做法是：先标 `待核实`，并说明"本机无法建立连接，未确认站点状态"；只有多次、多网络都无法访问才写 `已失效`，并把证据和日期写进状态后面。

## 开发命令

需要 Node.js 22 或更高版本。

```bash
npm ci
npx astro dev --background    # 后台起开发服务器
npx astro dev status          # 查看是否在跑
npx astro dev logs            # 看日志
npx astro dev stop            # 停掉
npm run build                 # 构建到 dist/
npm run preview               # 预览构建产物
```

## 交付前必须验证

改完不要只说"我改好了"，要跑一遍并把结果贴出来：

```bash
npm run build                                    # 无 ERROR、页数符合预期
grep -rn '\[!\(caution\|note\|tip\|danger\)\]' src/content/docs/ || echo "提示框语法正确"
```

再对渲染结果做一次实际检查：条目行数、状态用词是否只在四个之内、内部链接是否带上 `/college-wiki-hub/` 前缀、`<aside>` 是否生成。**自己写的检查脚本也要验证**——先让它复现一个文档里已知的数字，再相信它的输出。

## Commit 与 PR

沿用南开 NKUwiki 那一档：`type(scope): 中文描述`，type 取 `data` `docs` `fix` `feat` `chore` `ci`，`scope` 用学校英文简称。**创建 commit 不等于获得推送、开 PR 或合并的授权**，那些要单独确认。

远端常常领先本地（多机工作）：先 `git fetch`，看清差异，必要时 rebase，**不要 force push**。
