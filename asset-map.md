# 项目详情页素材对应表

首轮先遍历 `public/references` 全部子目录并读取图片元数据，再根据实际图片内容决定模块。首轮发现 97 张图片（包含两张原有全站参考、五张详情布局参考及 90 张项目图片）；机器清单见 `artifacts/reference-inventory.json`。后续年画新增与更名的机制材料，见下方补充记录及文化项目分表。

原始文件全部保留。最终页面素材放在 `public/images/projects/`。复制保持原像素；展板局部单独导出并记录裁切矩形。不把 `layouts` 效果图作为页面内容或背景，不生成产品 UI，不用同一界面假冒不同功能。

| 素材范围 | 项目／类型 | 页面用途 | 裁切 |
| --- | --- | --- | --- |
| `public/references/style.png` 696×744 | 原有首页视觉参考 | 本轮不修改首页，不加入详情页 | 不使用 |
| `public/references/黑色 ABOUT ME 参考图.png` 1672×941 | 原有简介视觉参考 | 本轮不修改个人简介，不加入详情页 | 不使用 |
| `public/references/layouts/01-october.png` 724×2172 | 十月，布局参考 | 浅粉／奶油白、多组手机界面与状态叙事 | 不进入页面 |
| `public/references/layouts/02-yanyu.png` 941×1672 | 堰遇，布局参考 | 青绿、品牌封面、五导航与功能组图 | 不进入页面 |
| `public/references/layouts/03-zhijian.png` 1024×1536 | 年画，布局参考 | 宣纸米白、朱红、设备及四步互动 | 不进入页面 |
| `public/references/layouts/04-keystone.png` 750×2098 | Keystone，布局参考 | 深蓝侧栏、浅蓝白、工作流与证据 | 不进入页面，不采用其中示意指标 |
| `public/references/layouts/05-shanhai.png` 935×1683 | 山海，布局参考 | 山林绿、横向大图、地域内容与视觉 | 不进入页面 |
| `public/references/01-october/**` | 十月，手机UI／设备实拍及PDF | 四用户状态、孕育工具、社区、成长记录、个人中心 | 逐图见下方分表 |
| `public/references/02-yanyu/**` | 堰遇，手机UI／展板及PPT | 品牌封面、首页／服务／发现／文创／我的、景区与地图 | 逐图及展板裁切见分表 |
| `public/references/03-zhijian/**` | 年画，网页／小游戏机制图／三展板及最终版PPT | 文化科普产品框架、内容结构、套印输入与状态、真实界面、页末完整展板 | 当前详情页封面为 `电脑画卷.png`，原件复制至 `nianhua/cover-scroll.png`，无裁切；其余逐项见分表 |
| `public/references/05-shanhai/**` | 山海，真实网页与设计报告 | 首页封面、长页内容、地域地图、详情、文化与路线 | 逐图见分表 |
| `public/references/04-keystone/download.jpg` 1440×900 | Keystone，真实研究问答工作台截图 | 产品封面和界面展示（只展示一次，不充当多模块截图） | 否，复制为 `public/images/projects/keystone/research-workspace.jpg` |
| `public/references/04-keystone/研究简报-正式导出.pdf` 3页 | Keystone，实际交付文件 | 导出结果展示、原PDF下载 | 第1页完整渲染为 `brief-page-1.png`，不裁切；保留PDF |
| `public/references/04-keystone/AI-Knowledge-Research-Copilot-PRD-V1.0.pdf` 16页 | Keystone，产品需求文档 | 设计定位、工作流与能力边界参考、原PDF下载 | 不作为已实现功能证据，不裁切 |

## 逐图分表

- [十月与堰遇青城](docs/assets-mobile.md)：原始路径、尺寸、实际内容、最终用途及展板裁切参数。
- [纸间风华与山海辽藏](docs/assets-cultural.md)：原始路径、尺寸、内容、最终用途及展板裁切参数；包含线上内容核对。

## 年画本轮补充材料与用途修正

当前详情页版头将用户提供的 `public/references/03-zhijian/电脑画卷.png`（1430 × 887，PNG）与真实HTML书法标题组合排版。电脑画卷复制为 `public/images/projects/nianhua/cover-scroll.png`，无裁切、无缩放、无重编码，已核对字节一致。旧设备封面 `nianhua/cover.png` 保留但不使用。版头的纸纹、山水、梅枝与印章从原始展板局部提取，坐标见文化分表；不使用整张参考图作背景，也不涉及首页。

| 原件 | 分辨率／规模 | 完整复制文件 | 用途与边界 |
| --- | --- | --- | --- |
| `03-zhijian/小游戏设计逻辑.png` | 1291 × 740 | `nianhua/game-logic.png` | 互动机制证据；HTML 先说明输入、动作、状态与反馈 |
| `03-zhijian/小游戏设计套色印刷拆解图.png` | 2600 × 2040 | `nianhua/overprint-breakdown.png` | 套印叠加逻辑，不属于网页配色规范；原“年画图层叠加_原始色版准确版.png”的当前命名 |
| `03-zhijian/展板1.jpg` | 3508 × 4961 | `nianhua/board-1.jpg` | 页末完整展板一，桌面三列预览、手机纵向；不折叠、可放大 |
| `03-zhijian/展板2.jpg` | 3508 × 4961 | `nianhua/board-2.jpg` | 页末完整展板二，不裁切；不把原稿调研标注改写成新增效果数据 |
| `03-zhijian/展板3.jpg` | 3508 × 4961 | `nianhua/board-3.jpg` | 页末完整展板三，不作背景图 |
| `03-zhijian/木版年画网站开发最终版.pptx` | 21 页 | 提取证据文本见 `artifacts/nianhua-final-ppt-evidence.txt` 与 `artifacts/cultural/木版年画网站开发最终版.txt` | 替换旧 19 页汇报；第 17–18 页佐证当前线稿、选中颜色与已用色版状态 |

上述五张图片均保留原件并原文件复制，目标前缀为 `public/images/projects/`，无重绘、调色或裁切。纸间风华与山海辽藏的用户任务／产品取舍／证据框架使用真实 HTML 表；普通界面放在语义化 `details`，年画最后三张展板保持展开。缺少量化调研或验证的部分不补写虚构指标。

## Keystone 材料与状态边界

用户于本轮明确补充：**Keystone 尚未制作完成，当前界面即所提供截图，后续再放置链接**。因此详情页标记“开发中”，不提供虚构产品地址。PRD 的版本页明确写有“阶段：MVP 定义”，不能把其中权限、联网研究、企业治理、支持格式和验收指标直接写成上线能力。导出简报含研究结论及来源编号，作为现有输出材料展示，不据此推断准确率、使用人数或完整产品验证。

后续用户授权参考实际Codex制作过程，已读取对应记录及 `D:/产品` 的需求、开发和阶段验收文档，补充可核对的0–1产品过程。当前准确状态为：本地核心流程有阶段验证，整体开发迭代／公网发布准备中，尚未正式公开；数据清理与完整删除等仍需开发与验收。原工作台图与简报仍按原样使用。详细边界见 [过程证据](docs/keystone-process-evidence.md)。

素材缺口：Keystone 清晰工作台原图、资料库管理、多文档对比、引用核验等独立界面与最终访问链接；山海的 AI 协作过程记录若没有真实文档／过程图，不编造聊天截图。其余项目的缺项随逐图审阅记录更新。

Keystone 当前 JPEG 虽为 1440×900，原始文字已经存在模糊。页面与预览保留该素材，不通过重绘、锐化或 AI 替换伪造细节。导出 PDF 第1页为完整渲染，图像 849×1200。
