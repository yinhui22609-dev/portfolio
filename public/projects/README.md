# 原始作品素材

请将五个项目的原始图片放入本目录的相应子文件夹。图片不会被生成、重绘、调色或覆盖。

| 项目 | 建议目录 |
| --- | --- |
| 十月 | `october/` |
| 堰遇青城 | `qingcheng/` |
| 纸间风华 | `paper-culture/` |
| Keystone | `keystone/` |
| 辽宁物产 | `liaoning/` |

接入时修改 `src/lib/projects.ts` 中对应项目的 `image` 字段，例如 `/projects/october/cover.png`。保留实际文件扩展名，填写真实的 `imageAlt`。为保证原始 UI 的完整性，页面默认 `object-fit: contain`，不裁切、不加滤镜。

当前目录没有原始作品图，页面以明确标记的文字封面呈现素材缺口。
