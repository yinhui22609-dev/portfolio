export const profile = {
  bio: "你好，我是一名具备数字媒体技术与设计背景的设计师。专注于品牌设计、界面设计与数字体验，项目涉及母婴APP、智慧文旅、非遗数字平台等领域，并在视觉设计与交互体验方面不断探索与实践，致力于通过设计创造更有温度的数字产品。",
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
