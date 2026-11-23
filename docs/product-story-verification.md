# 产品经理作品叙事与个人资料更新

日期：2026-11-23。保留现有 Next.js 项目、首页双层螺旋标题、红矩形、环绕作品菜单、导航与项目路由。首页和 ABOUT 的共享个人资料按本轮要求同步修改。

## 准确定位

| 项目 | 产品类型 | 个人角色与工作重点 |
| --- | --- | --- |
| 十月 | C端移动应用概念设计，母婴社区 | 产品设计／UI与交互设计；用户分层、生命周期场景和功能组织 |
| 堰遇青城 | C端移动应用概念设计，智慧文旅 | UI与交互／产品方案设计；旅游任务路径、信息架构与服务入口 |
| 纸间风华 | 文化科普与互动体验产品，网站 | 产品策划／交互设计与网页制作；内容结构与互动教学机制 |
| Keystone | AI多文档研究助手，个人项目 | 用户指定的“AI产品负责人（个人项目）”；AI工作流、需求与范围管理、AI协作开发 |
| 山海辽藏 | 地域文化内容产品，数字档案网站 | 产品设计／AI辅助网页开发；内容模型、关联浏览及收藏输出 |

前两案仍是概念设计，未改写为已上线或已经完成AI实现。年画和山海可访问的网站也不等于已验证用户效果；没有补造访谈、准确率、增长或商业数据。

## 阅读结构

五页各有独立的“用户任务／问题 → 产品决策／取舍 → 对应方案／证据”HTML框架表。移动端逐行展示，避免依赖横向拖动阅读。

- 十月以四状态模型与稳定导航组织生命周期任务，展示范围取舍和下一步验证；堰遇以行前／行中任务、服务与预约路径组织产品方案。
- Keystone依据真实Codex制作记录、本地需求研究、竞品、PRD、开发清单和验收材料，展示七阶段0–1路径、AI／程序／人的分工、证据流程、反馈迭代、有限样本验证和交付。详细来源及状态边界见 [过程材料核对](keystone-process-evidence.md)。
- 年画以科普任务、内容模型、套印状态和教学反馈组织叙事；山海以统一档案字段、地域联系与收藏后输出解释产品决策。
- 默认展示产品思路与关键证据，其余真实界面通过原生 `details` 展开。未删除原始界面材料，展开后仍可点击原图预览。

## 年画更正与三张展板

- 新增 `小游戏设计逻辑.png`、`小游戏设计套色印刷拆解图.png`，以最终版PPT21页和原图为依据。
- 通过HTML输入／动作／状态／反馈表解释“选线稿—刻墨线版—套色—盖章”，保留当前线稿、选中颜色和已用色版的真实状态字段。
- 套色色层图归入 `#nianhua-game-logic`，从视觉配色章节移除，不再作为网站色彩规范解释。
- `#nianhua-boards` 位于案例正文末尾，三张3508×4961原展板完整展示、不折叠、不裁切，可放大到原始尺寸；后续紧凑阅读版调整为桌面并列预览、手机纵向。
- 五张新增图片与源文件SHA-256全部一致，记录见 `artifacts/story-original-assets-check.json`。原始文件保留不变。

## 个人资料

- 本科：西南石油大学／数字媒体技术。
- 研究生：东北大学／设计。简介中的专业背景同步为“设计”，不再称“视觉传达设计”。
- PROJECT EXPERIENCE 改为无编号列表，保留顺序、项目名称和链接，移除数字及空列。
- TOOLS 的八项均有本地SVG代表符号：Figma五瓣图形，Ps／Ai／Ae字标，Cursor指针、VS Code图形、HTML／CSS盾牌及JS／TS双字标。不是远程图片，不新增图标依赖；软件名称保留为真实HTML，图形不重复进入无障碍树。

## 修改文件

新增：

- `src/components/cases/product-framework.tsx`、`product-framework.module.css`
- `src/lib/keystone-process.ts`
- `src/components/tool-icons.tsx`
- `docs/keystone-process-evidence.md`、`mobile-product-story.md`、本文件
- `public/images/projects/nianhua/{game-logic.png,overprint-breakdown.png,board-1.jpg,board-2.jpg,board-3.jpg}`

修改：

- `src/lib/project-details.ts`：定位、角色、工作重点与Keystone状态边界
- `src/components/project-detail.tsx`、`project-detail.module.css`：统一项目信息
- `src/components/cases/{mobile-cases,cultural-cases,keystone-case}.tsx`及其CSS Modules：产品叙事、框架、证据和设计档案
- `src/lib/profile.ts`、`src/components/about-profile.tsx`、`about-profile.module.css`：学校、专业、项目列表与工具标识
- README、`asset-map.md`、`docs/assets-cultural.md`：资料与素材用途同步

## 验收

| 项目 | 结果 |
| --- | --- |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过，五个详情静态路由均成功生成 |
| 五页×1440／768／390／320px | 20组默认与展开检查通过，每页均有产品框架；无页面或文字横向溢出 |
| 全部可见／展开图片 | 正常加载，自然比例；未将隐藏懒加载图片误判为坏图 |
| 原生展开交互 | 点击展开正常，闭合时核心产品叙事独立可读 |
| 展板 | 三张全图在页末、不受details折叠；原尺寸／Esc／焦点／滚动恢复通过 |
| Keystone | 七阶段路径、负责人身份、验证分组和未公开状态符合已读证据 |
| 首页与ABOUT×四档 | 8组通过，学校专业一致，无项目序号，8项工具均有图形 |
| 首页主视觉等保护文件 | 除本轮授权的三个共享资料文件，其余11个文件SHA-256未变化 |
| 浏览器页面脚本错误 | 0 |

Keystone最后微调封面侧标题换行后，另做四档定向复查，合并到最新结果。独立headless Chrome检查与触屏模拟不等同于真实手机、Safari或Firefox验收；本轮没有调用Keystone模型、修改其源项目或进行公网部署。

结构化记录：`artifacts/product-story-acceptance.json`。脚本：`artifacts/qa-runtime/check-product-story.cjs`。

## 截图

- [Keystone七阶段总览](../artifacts/story-keystone-overview.png)
- [年画游戏机制](../artifacts/story-game-logic-1440.png)
- [更新后的ABOUT](../artifacts/story-about-1440.png)
- 五案1440／390px整页及首屏：`artifacts/story-{slug}-{width}.png`、`story-{slug}-{width}-top.png`
