# 产品设计作品集

以 `public/references/style.png` 和黑色 ABOUT ME 参考图为视觉依据的编辑排版作品集。基于 Next.js App Router、TypeScript、Tailwind CSS 4、Motion 与 GSAP，全部可读文字为 HTML 文本。

## 本地运行

```powershell
npm install
npm run dev
```

预览：[http://localhost:3000](http://localhost:3000)。

```powershell
npm run typecheck
npm run build
npm start
node --experimental-strip-types --test tests/radial-geometry.test.mjs tests/radial-hover.test.mjs
```

## 已有内容

- 超大实心／描边 PORTFOLIO 标题、中央橙红矩形、少量定位符号。GSAP 与 MotionPathPlugin 以真实 SVG 圆形轨迹计算字母的纵向与深度位置，形成双股螺旋文字；保留原有字体、字距与文字层次。
- 标题进入视口时播放入场与循环动画，离屏或页面隐藏后暂停；返回视口后继续播放，鼠标轻微视差可正常恢复，移出标题后回正。窄屏收敛运动幅度，`prefers-reduced-motion` 下保留静态标题，不播放螺旋、入场和视差动画。
- 五张卡片沿圆弧循环排列，桌面悬停居中、点击进入对应项目页。
- 悬停感应区在静止时生成快照；140ms 防抖、动画锁定及 20px 选择锚点滞后阈值，避免卡片移动后持续触发。鼠标滚轮保留页面原生滚动。
- 移动端左右滑动、上一项／下一项和“查看项目”入口；已通过 CDP 触屏模拟验证滑动与打开作品，真实触屏设备仍待验证。
- 首页项目索引、类型筛选、独立项目页面、关于页及跨页导航。
- 键盘方向键、Home／End、Enter／Space，清晰焦点、当前项播报和减少动态效果偏好。
- 黑色 ABOUT ME 采用双栏编辑排版，首页与独立 `/about` 页面共用个人资料、教育背景、项目经验、技能和工具。简介、邮箱 `yinhui22609@163.com`、城市与专业信息已使用提供的原文，邮箱可通过 `mailto:` 打开。
- 五个详情页按各自的布局参考重建 HTML 章节，采用真实 UI、完整设备图与展板局部；图片可放大，支持 Esc 关闭、原始尺寸和焦点返回。Keystone 按最新确认标为开发中，不提供虚构产品链接。
- 素材对应表：[asset-map.md](asset-map.md)；首页动效与简介验收：[docs/helix-profile-verification.md](docs/helix-profile-verification.md)。

## 七个页面

| 路由 | 内容 |
| --- | --- |
| `/` | 首页：螺旋文字主视觉、环绕作品、项目索引和黑色个人介绍 |
| `/projects/shiyue` | 十月｜母婴社区 App UI 设计 |
| `/projects/yanyu` | 堰遇青城｜智慧文旅 App UI 设计 |
| `/projects/nianhua` | 纸间风华｜木版年画数字科普网站 |
| `/projects/keystone` | Keystone｜AI 多文档研究助手 · 开发中 |
| `/projects/liaoning` | 山海辽藏｜辽宁物产主题网站 |
| `/about` | 与首页共用资料的独立个人介绍页 |

项目页包含概述、产品功能、UI 与交互、项目成果以及前后作品导航。资料缺失部分已明确标注。首页卡片和项目索引使用真实路由链接，原弹窗预览已移除。

## 结构

- `src/app/`：页面、全局视觉令牌与响应式样式。
- `src/components/portfolio.tsx`：简短首页、项目索引与筛选。
- `src/components/helix-title.tsx`、`helix-title.module.css`：GSAP 双股螺旋文字、入场与鼠标视差；处理离屏暂停、返回恢复及减少动态效果。
- `src/components/about-profile.tsx`、`about-profile.module.css`：黑色 ABOUT ME 共用组件，首页使用二级标题，独立关于页使用一级标题。
- `src/components/site-header.tsx`：首页、项目页和关于页共用的页眉与导航。
- `src/components/project-artwork.tsx`：共用原始作品图／缺图文字封面。
- `src/components/radial-portfolio.tsx`：桌面悬停与触摸滑动环绕作品菜单。
- `src/components/radial-geometry.ts`、`radial-hover.ts`：循环几何与静止感应区快照。
- `src/components/project-detail.tsx`：共用详情页外框、返回入口、编号、元信息及前后作品导航。
- `src/components/cases/`：独立的移动应用、文化网站与 Keystone 案例内容及样式；共用图片预览、章节与页面渐入。
- `src/components/marks.tsx`：可复用定位及图形符号。
- `src/lib/projects.ts`：五个项目的数据、原图路径、slug 与 `projectHref`。
- `src/lib/project-details.ts`：项目定位、内容结构和资料缺失状态。
- `src/lib/profile.ts`：首页与关于页唯一的个人资料来源，集中保存简介、联系方式、教育背景、项目顺序、技能与工具。
- `public/references/`：原始作品资料和五张布局参考，保留原件。
- `public/images/projects/`：五个详情页选用的真实图片、展板派生局部和证据文件。
- `tests/`：圆弧几何与悬停快照的 10 项测试。

## 首页与简介验收（上一轮）

`npm run typecheck`、10 项自动测试与 `npm run build` 均已通过。七个路由正常可访问，页面刷新及浏览器前进、后退保持内部路由行为。

| 检查范围 | 结果 |
| --- | --- |
| 320px、390px、768px、1440px | 已复查首页、标题、作品菜单及 ABOUT ME 的响应式排版 |
| 螺旋文字 | 入场和持续运动正常；离屏冻结，回到视口后恢复 |
| 鼠标视差 | 移出后回正；离屏后返回仍可响应指针 |
| 减少动态效果 | 通过浏览器媒体特性模拟确认静态呈现，无螺旋与视差运动 |
| 桌面作品菜单 | 悬停居中、快速切换稳定，点击进入对应独立项目路由 |
| CDP 触屏模拟 | 左右滑动切换和“查看项目”入口可打开正确作品页 |
| 首页与 `/about` | 简介、邮箱、城市、专业、项目经验、技能及工具内容一致 |

本次交互、动画与媒体特性验收使用独立的 headless Chrome，通过 CDP 控制。该结果属于浏览器模拟验证，不等同于真实手机硬件或系统级设置验证。完整的本次结果见 [docs/helix-profile-verification.md](docs/helix-profile-verification.md)；较早阶段的检查记录保留于 [docs/verification.md](docs/verification.md)。

## 五个项目详情页首轮验收

四档宽度的五页共 20 组检查通过：真实图片加载与比例、文字与页面边界、原图放大、项目入口与首尾切换、刷新和浏览器历史正常。最终类型检查与生产构建通过；首页／导航／ABOUT 等 14 个保护文件校验值未变化。完整文件清单、素材缺口与截图见 [本轮验收记录](docs/project-cases-verification.md)，逐图来源见 [asset-map.md](asset-map.md)。

## 产品经理叙事升级（当前版本）

五案明确产品类型、个人角色和工作重点，均加入产品决策框架，完整界面保留为可展开证据。Keystone按实际Codex与本地文档展示七阶段0–1路径，身份为“AI产品负责人（个人项目）”；仍处开发／公网发布准备阶段。年画套色图改为小游戏机制说明，三张原始全展板在页末展示。学校、专业、项目列表去编号与工具SVG标识已在首页和ABOUT同步。

20组详情默认／展开布局、8组首页／ABOUT同步、图片放大、类型检查和生产构建通过。最新文件清单、证据边界和截图见 [产品叙事验收](docs/product-story-verification.md)，Keystone依据见 [过程核对](docs/keystone-process-evidence.md)。

当前详情页已收紧阅读尺寸：正文最大1240px，桌面图片按视口高度等比缩小，七阶段与三展板改为分栏概览。四档桌面所有默认板块均小于两屏；手机维持自然纵向阅读。30组布局、原图预览、类型和构建检查结果见 [紧凑阅读版验收](docs/compact-layout-verification.md)。

## 尚未完成

1. **首页封面**：本轮只开发详情页，按要求保持首页五张卡片原有内容和视觉。详情页已接入新提供的真实图片，不据此自动替换首页卡片。
2. **案例资料缺口**：十月、堰遇按 UI 概念设计展示；年画与山海提供真实网站入口。Keystone 尚在开发中，缺少清晰原图、资料库／对比／引用核验独立截图与最终链接。未提供的独立视觉规范及山海 AI 协作过程明确留位，不伪造用户数据、工作经历或上线结果。
3. **个人资料边界**：简介、邮箱、城市、学校和专业已提供并共享；本科西南石油大学／数字媒体技术，研究生东北大学／设计。就读时间、具体工作经历、肖像等未提供信息不补写。
4. **设备与额外验证**：四档浏览器视口、CDP 触屏模拟与减少动态媒体特性检查已完成；真实手机硬件触摸、其他浏览器引擎、200% 字体缩放及操作系统级减少动态效果设置仍未验收。

本阶段仅本地预览，未部署上线。
