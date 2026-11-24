export const profile = {
  bio: "你好，我拥有数字媒体技术与视觉传达设计的跨学科学习背景，关注 AI 产品、用户体验与数字化产品创新。\n\n我的项目实践涵盖 AI 研究工具、智慧文旅、母婴社区及非遗数字平台，涉及需求分析、产品功能规划、信息架构、交互设计与开发实现等环节。\n\n相比单纯的视觉表达，我更关注产品背后的用户需求、功能逻辑与实际使用体验，尝试将技术理解与设计能力相结合，从问题分析逐步推进到可实现的产品方案。",
  email: "yinhui22609@163.com",
  cities: "成都、北京、上海、深圳等",
  education: [
    { level: "本科", school: "西南石油大学", discipline: "数字媒体技术" },
    { level: "研究生", school: "东北大学", discipline: "设计" },
  ],
  projects: [
    { name: "Keystone", description: "AI多文档研究助手", href: "/projects/keystone" },
    { name: "辽宁物产", description: "山海辽藏主题网站设计", href: "/projects/liaoning" },
    { name: "纸间风华", description: "木版年画数字科普网站", href: "/projects/nianhua" },
    { name: "堰遇青城", description: "智慧文旅App设计", href: "/projects/yanyu" },
    { name: "十月", description: "母婴社区App UI设计", href: "/projects/shiyue" },
  ],
  skills: ["产品设计", "UI/UX设计", "交互设计", "视觉设计", "AI协作开发", "网页设计"],
  tools: ["Figma", "Photoshop", "Illustrator", "After Effects", "Cursor", "VS Code", "HTML/CSS", "JavaScript/TypeScript"],
} as const;
