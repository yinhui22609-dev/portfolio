# 项目详情页紧凑阅读版

日期：2026-11-23。针对桌面图片铺满窗口、板块过长的问题，仅调整详情页显示尺寸、分栏和间距，保留现有内容、产品定位、路由及原图。

## 调整

- 案例正文居中，最大宽度1240px；首页、导航、个人简介保持现状。
- 普通图片按原始比例和视口高度共同确定显示宽度，桌面默认高度不超过 `min(62svh, 560px)`；没有裁切、拉伸或修改源文件。
- 手机界面、封面和简报分别使用更紧凑的高度上限，桌面上下留白、标题间距同步缩小。
- Keystone七阶段改为三列概览与最后一行发布阶段，保持完整文字；标题平衡换行，避免尾字单独成行。
- 年画游戏机制改为图文两栏；三张完整展板在桌面并列预览、手机纵向排列，点击查看原始尺寸。
- 不固定板块高度、不截断正文，也不增加嵌套滚轮。完整界面档案仍按需展开。

## 验收结果

独立headless Chrome检查了五页×六档视口，共30组：1440×900、1366×768、1280×720、1920×1080、390×844和320×780。桌面默认板块全部小于两屏；手机保留可读字号和自然纵向阅读，不强行套用桌面高度目标。

1366×768默认最大板块：

| 项目 | 最大高度 | 约占屏数 |
| --- | ---: | ---: |
| 十月 | 715px | 0.93 |
| 堰遇青城 | 663px | 0.86 |
| 纸间风华 | 863px | 1.12 |
| Keystone | 1265px | 1.65 |
| 山海辽藏 | 1019px | 1.33 |

四档桌面中的最大占屏值为约1.76屏，发生于1280×720的Keystone七阶段。普通图片均保持原比例，最大高度符合视口上限。五页默认与展开材料均无文字或页面横向溢出；三展板原图放大、原始尺寸、Esc、焦点和滚动恢复通过。浏览器页面脚本错误为0。

最终 `npm run typecheck` 与 `npm run build` 均通过。文化两案在共享变量落地后补做四档桌面定向复查；Keystone标题平衡换行后在1280×720补测，七阶段高度1264.66px，仍在两屏内。

结果：`artifacts/compact-cases-acceptance.json`。脚本：`artifacts/qa-runtime/check-compact-cases.cjs`。本轮为浏览器模拟验证，未做真实手机硬件或跨浏览器测试。

## 主要文件

- `src/components/project-detail.tsx`、`project-detail.module.css`
- `src/components/cases/case-image.tsx`、`case-primitives.module.css`
- `src/components/cases/product-framework.module.css`
- `src/components/cases/keystone-case.module.css`
- `src/components/cases/mobile-cases.module.css`
- `src/components/cases/cultural-cases.tsx`、`cultural-cases.module.css`

## 截图

- [三张展板同屏预览](../artifacts/compact-boards-1440.png)
- [Keystone紧凑总览](../artifacts/compact-keystone-overview.png)
- 五案默认1440px／390px整页截图：`artifacts/compact-{slug}-{width}.png`
