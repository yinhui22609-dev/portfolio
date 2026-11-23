# 螺旋主标题与黑色个人简介验收

检查日期：2026-11-23。基于现有项目增量修改，保留导航、项目数据、五张卡片封面和独立详情页路由。

## 实现范围

- `src/components/helix-title.tsx`、`helix-title.module.css`：两层真实 HTML 文字。GSAP 驱动时间，SVG MotionPath 采样圆轨道，将逐字相位映射到 CSS 3D 的纵向位置与深度；实心和描边相差半圈，形成交错缠绕，而非整词旋转。
- 两层从相反方向进入，桌面以 18 秒、手机以 24 秒完成一轮。手机降低轨道半径、深度和旋转幅度。桌面鼠标产生轻微视差，离开归零。
- 离开首屏、页面进入后台时暂停。减少动态效果时使用原有静态双层字。GSAP 加载失败时也保留可读静态字。
- 动画逐帧只写 18 个字形的 transform，不更新 React 状态；字形测量只发生在初始化与尺寸变化时。未引入 Three.js，未替换或生成任何作品图片。
- `src/components/about-profile.tsx`、`about-profile.module.css`：按照 `public/references/黑色 ABOUT ME 参考图.png` 实现黑底、白字、红标题、细线、桌面双栏和手机单栏。左侧保留实心／描边艺术字和红矩形。
- `src/lib/profile.ts`：用户提供的简介、邮箱、城市、教育、项目、技能及工具的唯一数据来源，首页与独立 `/about` 共用。
- `src/components/portfolio.tsx`：接入新标题与底部简介；`src/app/about/page.tsx`、`page.module.css`：复用相同资料与简介组件。
- `src/components/radial-portfolio.tsx`：仅修正触摸时子元素向舞台转移隐式指针捕获，避免子元素的 `lostpointercapture` 冒泡提前结束手势。保留其布局、悬停策略、项目封面和路由。
- `package.json`、`package-lock.json`：新增 GSAP 3.15.1。

## 工程检查

| 检查 | 结果 |
| --- | --- |
| `npm run typecheck` | 通过 |
| 圆弧几何与悬停快照单测 | 10 / 10 通过 |
| `npm run build` | 通过，原有页面路由均成功预渲染 |
| 本地预览 `http://localhost:3000/` | HTTP 200，持续运行 |

## 浏览器检查

原生 GUI 自动化工具初始化失败，故使用单独启动的 headless Chrome 检查本地网站，没有控制用户正在使用的浏览器。测试脚本及结构化结果保存在忽略提交的 `artifacts/qa-runtime/check-helix.cjs`、`artifacts/helix-acceptance.json`。

| 检查 | 结果 |
| --- | --- |
| 1440×1050、768×1024、390×844、320×780 | 均无页面横向溢出；标题、导航、卡片入口分区正常 |
| 标题持续动画 | 两层共 18 字形独立改变 transform，通过 |
| 鼠标视差与离开恢复 | 通过 |
| 四档视口离屏暂停 | 两次间隔采样 transform 完全一致，通过 |
| 动态切换 `prefers-reduced-motion` | 切回静态文字，通过 |
| 桌面原有悬停居中、保持与项目点击 | 通过，进入 `/projects/keystone` |
| 移动端滑动并打开作品 | 通过 Chrome CDP 原生触摸事件及入口点击验证 |
| 首页与 `/about` 的资料 | 正文内容一致、邮箱和城市匹配，通过 |
| 浏览器页面脚本错误 | 0 |

没有测量真实设备帧率；以上性能结论限于无逐帧布局测量、无 React 逐帧更新、离屏暂停与减少动态行为。真实手机硬件、Safari／Firefox、200% 文本缩放尚未复查。浏览器触屏模拟不等同于真机验收。

## 截图

- `artifacts/helix-home-1440.png`、`helix-home-768.png`、`helix-home-390.png`、`helix-home-320.png`
- `artifacts/about-profile-1440.png`、`about-profile-768.png`、`about-profile-390.png`、`about-profile-320.png`

手机简介截图为实际视口截屏，完整内容可向下滚动查看。静态截图展示某一动画帧，持续运动由浏览器采样验证。

## 保留的内容缺口

原始项目 UI 截图、架构／流程图及真实交付与验证成果仍未提供，现有卡片与详情页占位继续保留。本轮没有编造上线成果、工作经历、院校名称、学历时间或其他联系方式。网站仍为本地预览，未部署。
