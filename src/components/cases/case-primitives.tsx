import type { ReactNode } from "react";
import styles from "./case-primitives.module.css";

export { CaseImage } from "./case-image";

export function CaseSection({ id, eyebrow, title, children, className = "" }: { id?: string; eyebrow: string; title: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`${styles.section} ${className}`} aria-labelledby={id ? `${id}-heading` : undefined}><div className={styles.sectionHead}><p>{eyebrow}</p><h2 id={id ? `${id}-heading` : undefined}>{title}</h2></div>{children}</section>;
}

export function CaseIntro({ kicker, title, summary, children }: { kicker: string; title: string; summary: string; children?: ReactNode }) {
  return <div className={styles.intro}><p className={styles.kicker}>{kicker}</p><h1 id="project-heading">{title}</h1><p className={styles.summary}>{summary}</p>{children}</div>;
}

export function PendingMaterial({ title, note }: { title: string; note: string }) {
  return <div className={styles.pending}><span>素材待补充 / MATERIAL PENDING</span><h3>{title}</h3><p>{note}</p></div>;
}
