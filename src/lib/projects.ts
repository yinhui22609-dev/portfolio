export type Project = {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  category: string;
  medium: string;
  description: string;
  theme: string;
  image: string | null;
  imageAlt: string;
};

// Original local artwork only. Set image to /projects/<folder>/<file> when supplied.
// An empty image renders an explicit typographic cover, never a fabricated UI.
export const projects: Project[] = [
  {
    id: "october",
    slug: "shiyue",
    title: "十月",
    englishTitle: "OCTOBER",
    category: "母婴社区 App UI 设计",
    medium: "APP / COMMUNITY",
    description: "围绕母婴社区的连接与交流，探索温暖、清晰的移动端界面表达。",
    theme: "october",
    image: null,
    imageAlt: "十月母婴社区 App 原始 UI 作品截图",
  },
  {
    id: "qingcheng",
    slug: "yanyu",
    title: "堰遇青城",
    englishTitle: "QINGCHENG",
    category: "智慧文旅 App UI 设计",
    medium: "APP / TRAVEL",
    description: "以都江堰与青城山为主题，探索文旅信息与移动端游览体验的结合。",
    theme: "qingcheng",
    image: null,
    imageAlt: "堰遇青城智慧文旅 App 原始 UI 作品截图",
  },
  {
    id: "paper-culture",
    slug: "nianhua",
    title: "纸间风华",
    englishTitle: "PAPER & CULTURE",
    category: "木版年画数字科普网站",
    medium: "WEB / CULTURE",
    description: "让传统木版年画走入数字阅读，以网站承载文化知识与视觉叙事。",
    theme: "paper",
    image: null,
    imageAlt: "纸间风华木版年画数字科普网站原始作品截图",
  },
  {
    id: "keystone",
    slug: "keystone",
    title: "Keystone",
    englishTitle: "KEYSTONE",
    category: "AI 多文档研究助手",
    medium: "PRODUCT / AI",
    description: "聚焦多文档研究场景，探索资料阅读、信息整理与 AI 辅助研究的产品体验。",
    theme: "keystone",
    image: null,
    imageAlt: "Keystone AI 多文档研究助手原始 UI 作品截图",
  },
  {
    id: "liaoning",
    slug: "liaoning",
    title: "辽宁物产",
    englishTitle: "FROM LIAONING",
    category: "辽宁物产主题网站",
    medium: "WEB / REGIONAL",
    description: "以地域物产为线索，通过网站呈现辽宁的地方特色与风物。",
    theme: "liaoning",
    image: null,
    imageAlt: "辽宁物产主题网站原始作品截图",
  },
];

export function projectHref(project: Pick<Project, "slug">) {
  return `/projects/${project.slug}`;
}
