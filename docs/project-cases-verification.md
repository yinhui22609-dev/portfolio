# 五个独立项目详情页 · 验收记录

日期：2026-11-23。本轮在既有 Next.js 16.4.6 / TypeScript / Tailwind / Motion 项目中增量完成五个详情页，没有重建项目，也没有新增生产依赖。

此文记录首轮详情页版本。后续产品经理叙事、角色定位、年画展板／机制与教育信息更新，见 [当前版本验收](product-story-verification.md)。

## 页面与真实素材

先建立 [素材对应表](../asset-map.md)，遍历 97 张参考图片并按内容分类。全部逐图原路径、尺寸、选择理由、输出路径及裁切参数见 [移动项目分表](assets-mobile.md) 与 [文化项目分表](assets-cultural.md)。原件位于 `public/references`，最终素材整理在 `public/images/projects`。

| 页面 | 真实展示材料 | 状态 |
| --- | --- | --- |
| [十月](http://localhost:3000/projects/shiyue) | 22 张：启动样机、四状态设置、经期记录／备孕／孕期／宝宝内容、登录与个人中心、问答／广场／话题、成长／食材／营养／产检／儿歌、品牌与手持图 | UI 概念设计，未开发上线 |
| [堰遇青城](http://localhost:3000/projects/yanyu) | 17 张：展板双手机封面、五一级模块、门票／详情／预约、导游／非遗、架构／图标／色彩／字体／Logo、启动页 | UI 概念设计，未将实时服务或 AI 入口写为已实现能力 |
| [纸间风华](http://localhost:3000/projects/nianhua) | 12 张：完整设备封面、历史、地图、四步制作、首页、经典环展、工艺、传承人、分色色版；历史／传承人两张从真实线上页面补拍 | 已完成网站设计与制作，提供真实网站入口 |
| [Keystone](http://localhost:3000/projects/keystone) | 2 张：现有工作台原 JPEG、正式导出简报第1页完整渲染；另附原简报与 PRD 文件入口 | 用户最新确认为开发中，无虚构产品链接；产品规划与现有证据分别说明 |
| [山海辽藏](http://localhost:3000/projects/liaoning) | 10 张：首页、17件物产探索、单品详情、成长链、图谱／展开状态、收藏后路线、海报、游戏、路线初始状态 | 已完成网站，按真实导航和实际 17 件档案组织内容 |

共展示 63 张作品／证据图片。图片内的原 UI 不重绘、不调色、不改变比例；正文、标题、架构与导航均为 HTML。五张 `layouts` 仅作为版式参考，未作为网页背景或内容整图。

## 展板裁切

最终使用的展板局部全部来自堰遇 `展板1.png`：`cover-mockups.webp`、`logo-study.webp`、`palette.webp`、`icons.webp`、`architecture.webp`、`typography.webp`。坐标与输出尺寸逐项记录在移动项目分表。只截取对应独立区域，未截断手机界面与重要说明。

年画尝试从展板顶部提取封面，但会夹入下一模块设备或使文字贴边，因此改用用户已有的独立完整设备图 `图层 1 拷贝6.png`，不裁切。山海使用原始首页。十月使用原始手机样机。Keystone 的简报图为原 PDF 完整第1页渲染，并非裁切或重新绘制。

## 实现与主要文件

修改：

- `src/app/projects/[slug]/page.tsx`：原路由不变，调整详情页 metadata，山海使用完整项目名称。
- `src/lib/project-details.ts`：按真实状态记录设计方向与范围，Keystone 更新为开发中。
- `src/components/project-detail.tsx`、`project-detail.module.css`：共用页眉、返回、编号、元信息、页尾注释、循环前后作品导航。

新增：

- `src/components/cases/mobile-cases.tsx`、`mobile-cases.module.css`：十月和堰遇的独立内容、手机界面组图与视觉章节。
- `src/components/cases/cultural-cases.tsx`、`cultural-cases.module.css`：年画四步互动叙事与山海档案／地域／路线叙事。
- `src/components/cases/keystone-case.tsx`、`keystone-case.module.css`：工作台、规划架构、证据、现有输出与材料缺口。
- `src/components/cases/case-primitives.tsx`、`case-primitives.module.css`：可复用章节、标题与素材占位。
- `src/components/cases/case-image.tsx`：Next Image 优化、自然比例、轻微进入动画、原生 dialog 放大／原始尺寸／Esc／焦点返回／滚动恢复。
- `src/components/cases/case-transition.tsx`：轻微页面淡入，支持减少动态效果。
- `public/images/projects/{shiyue,yanyu,nianhua,keystone,liaoning}/`：所选真实素材和证据文件。
- `asset-map.md`、`docs/assets-mobile.md`、`docs/assets-cultural.md`、本文件；README 同步资料状态。

## 验收结果

| 检查 | 结果 |
| --- | --- |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过，现有页面与五个项目静态路由均成功生成 |
| 1440×1050、768×1024、390×844、320×780 | 五页共 20 组均 HTTP 200；无页面／文字横向溢出，全部图片正常加载且比例正确 |
| 首页五个项目入口 | 均进入正确详情页 |
| 页面刷新、浏览器后退与前进 | 五页逐一通过 |
| 前后作品 | 路径顺序正确，首尾循环通过 |
| 桌面图片放大 | 打开、原始尺寸、Esc、焦点返回、关闭后恢复页面滚动通过 |
| 移动预览 | 触屏模拟点击打开／关闭通过 |
| 正常动态 | 离屏图片进入视口后 opacity 0→1，轻微淡入通过 |
| 减少动态效果 | 四档检查使用 reduce 偏好，内容正常显示、无需等待动画 |
| 首页保护 | 14 个首页／导航／简介／ABOUT／共享项目数据相关文件 SHA-256 未变化 |
| 浏览器页面脚本错误 | 0 |
| PDF 材料访问 | 原 PRD 返回 HTTP 200，文件可打开 |

十月最后加入“宝宝起名素材待补”说明后，额外完成四档定向复查与最终类型检查／构建。最新检查数据已合并于 `artifacts/project-cases-acceptance.json`。检查脚本是忽略目录下的 `artifacts/qa-runtime/check-project-cases.cjs`。使用独立 headless Chrome 与触屏模拟，未控制用户正在使用的浏览器；不代表真实手机、Safari、Firefox或硬件帧率已验收。原网站只核对可访问页面和截图对应功能，没有深测所有外站操作。

## 仍需补充的真实材料

- 十月：独立宝宝起名界面、字体／字号／组件规范；经期仅提供记录页，未把它冒充独立经期首页。
- 堰遇：本轮指定展示已有真实材料覆盖；若需扩展 AR／AI 功能验证，应补真实原型或实现证据，当前仅为 UI 概念。
- 年画：独立 LOGO、图标和字体规范文件。
- Keystone：更清晰工作台原图，资料库、对比表、原文核验、结果编辑／导出操作界面，实际完成与验证记录、最终产品链接。当前 JPEG 原始文字已模糊，按原样保留，没有生成替代细节。
- 山海：独立 LOGO、图标和字体规范文件，以及真实 AI 提示／协作／迭代过程记录。

研究、流量、转化、准确率、工作经历等未提供的数据不补写。网站保持本地预览，未部署。

## 截图

- [五页桌面总览](../artifacts/case-desktop-overview.png)
- 1440px：`artifacts/case-{shiyue,yanyu,nianhua,keystone,liaoning}-1440.png`
- 390px：`artifacts/case-{shiyue,yanyu,nianhua,keystone,liaoning}-390.png`
- 首屏图为同名 `-top.png`；图片原图预览：`artifacts/case-lightbox-desktop.png`。
