export type ProjectDetailContent = {
  classification: string;
  role: string;
  focus: string;
  status: string;
  scopeNote: string;
};

// Detail-page facts only: homepage data and covers stay untouched.
export const projectDetails: Record<string, ProjectDetailContent> = {
  shiyue: {
    classification: "C 端移动应用概念设计 · 母婴社区",
    role: "产品设计 · UI 与交互设计",
    focus: "用户分层 / 生命周期场景 / 功能组织",
    status: "概念作品 · 未开发上线",
    scopeNote: "展示原始 UI 设计与不同孕育状态下的界面组织。本案例为概念设计，不将界面中的功能表现写为已上线服务，也不添加用户增长或测试数据。",
  },
  yanyu: {
    classification: "C 端移动应用概念设计 · 智慧文旅",
    role: "UI 与交互设计 · 产品方案设计",
    focus: "旅游任务路径 / 信息架构 / 服务入口",
    status: "概念作品 · 未开发上线",
    scopeNote: "依据真实作品展板和手机界面呈现设计方案。景区信息、预约、服务与地图均为 UI 设计内容，不代表已接入实时服务。",
  },
  nianhua: {
    classification: "文化科普与互动体验产品 · 网站",
    role: "产品策划 · 交互设计与网页制作",
    focus: "内容结构 / 互动教学机制 / 网页体验",
    status: "已完成 · 可访问网站",
    scopeNote: "呈现木版年画数字科普网站的真实页面、制作互动与视觉材料，提供原网站访问入口。没有提供的用户研究、性能与使用数据不予补写。",
  },
  keystone: {
    classification: "AI 多文档研究助手 · 个人项目",
    role: "AI 产品负责人（个人项目）",
    focus: "AI 工作流设计 / 需求与范围管理 / AI 协作开发",
    status: "本地验证与公网准备 · 尚未开放",
    scopeNote: "依据真实源码、提交与历史验收记录呈现 AI 产品决策。本轮只读审阅，未调用模型；真实模型、Mock、本地恢复与公网准备分别说明。截至 2026/11/24 尚未完成公网部署、访问保护及云端完整流程，用户价值与部分交付验收仍待验证。",
  },
  liaoning: {
    classification: "地域文化内容产品 · 数字档案网站",
    role: "产品设计 · AI 辅助网页开发",
    focus: "内容模型 / 关联浏览 / 收藏与输出路径",
    status: "已完成 · 可访问网站",
    scopeNote: "根据真实网站、页面截图和设计报告呈现辽宁物产与地域文化内容。AI 协作相关表述以已提供资料为依据，不虚构过程截图或用户成效。",
  },
};
