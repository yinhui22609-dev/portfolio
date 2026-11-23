import Link from "next/link";
import { SiteHeader } from "./site-header";
import { projectHref, projects, type Project } from "@/lib/projects";
import type { ProjectDetailContent } from "@/lib/project-details";
import { ShiyueCase, YanyuCase } from "./cases/mobile-cases";
import { NianhuaCase, LiaoningCase } from "./cases/cultural-cases";
import { KeystoneCase } from "./cases/keystone-case";
import { CaseTransition } from "./cases/case-transition";
import styles from "./project-detail.module.css";

const cases = { shiyue: ShiyueCase, yanyu: YanyuCase, nianhua: NianhuaCase, keystone: KeystoneCase, liaoning: LiaoningCase };

export function ProjectDetail({ project, detail, previous, next }: { project: Project; detail: ProjectDetailContent; previous: Project; next: Project }) {
  const Content = cases[project.slug as keyof typeof cases];
  const number = String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0");
  return <div className={`portfolio-shell ${styles.page}`} data-project={project.slug}>
    <a className="skip-link" href="#project-main">跳转至项目内容</a>
    <SiteHeader />
    <main id="project-main" aria-label={`${project.title}项目详情`}>
      <div className={`${styles.breadcrumb} page-gutter`}><Link href="/#work">← 返回作品集</Link><span>SELECTED WORK / {number} — 05</span><span>{project.englishTitle}</span></div>
      <dl className={`${styles.meta} page-gutter`}><div><dt>产品定位</dt><dd>{detail.classification}</dd></div><div><dt>个人角色 / 工作重点</dt><dd>{detail.role}<span className={styles.focus}>{detail.focus}</span></dd></div><div><dt>项目状态</dt><dd>{detail.status}</dd></div></dl>
      <div className={styles.caseContent}><CaseTransition key={project.slug}><Content /></CaseTransition></div>
      <aside className={`${styles.scope} page-gutter`}><span>PROJECT NOTE / {number}</span><p>{detail.scopeNote}</p></aside>
      <nav className={`${styles.projectNavigation} page-gutter`} aria-label="作品页面导航">
        <Link href={projectHref(previous)}><span>← 上一个作品</span><strong>{previous.title}</strong><small>{previous.category}</small></Link>
        <Link href="/#work" className={styles.homeLink}>全部作品 ↗</Link>
        <Link href={projectHref(next)}><span>下一个作品 →</span><strong>{next.title}</strong><small>{next.category}</small></Link>
      </nav>
    </main>
    <footer className={`${styles.footer} page-gutter`}><Link href="/">PORTFOLIO<span>.</span></Link><span>持续观察，持续设计。</span><Link href="/about">关于我 ↗</Link></footer>
  </div>;
}
