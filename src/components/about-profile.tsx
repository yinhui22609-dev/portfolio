import Link from "next/link";
import { profile } from "@/lib/profile";
import { ToolIcon } from "./tool-icons";
import styles from "./about-profile.module.css";

export function AboutProfile({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="about" className={`${styles.section} ${standalone ? styles.standalone : ""}`} aria-labelledby="about-title">
      <div className={styles.shell}>
        <div className={styles.eyebrowLine}><span aria-hidden="true" /><p>A FEW THINGS ABOUT ME</p><span aria-hidden="true" /></div>
        <div className={styles.frame}>
        <div className={styles.introduction}>
          <div className={styles.titleStage}>
            <span className={styles.redBlock} aria-hidden="true" />
            <span className={styles.titleOutline} aria-hidden="true">ABOUT ME</span>
            <Heading id="about-title" className={styles.title}>ABOUT ME</Heading>
          </div>
          <p className={styles.bio}>{profile.bio}</p>
          <section className={styles.contactSection} aria-labelledby="contact-title">
            <h3 id="contact-title" className={styles.sectionTitle}>CONTACT</h3>
            <dl className={styles.contact}>
              <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
              <div><dt>City</dt><dd>{profile.cities}</dd></div>
            </dl>
          </section>
        </div>

        <div className={styles.details}>
          <section className={styles.detailSection} aria-labelledby="education-title">
            <h3 id="education-title" className={styles.sectionTitle}>EDUCATION</h3>
            <dl className={styles.education}>{profile.education.map((item) => <div key={item.level}><dt>{item.level}</dt><dd><span className={styles.school}>{item.school}</span><span className={styles.discipline}>{item.discipline}</span></dd></div>)}</dl>
          </section>

          <section className={styles.detailSection} aria-labelledby="experience-title">
            <h3 id="experience-title" className={styles.sectionTitle}>PROJECT EXPERIENCE</h3>
            <ul className={styles.experience}>{profile.projects.map((project) => <li key={project.href}><Link href={project.href}><span className={styles.projectName}>{project.name}</span><span className={styles.projectDescription}>{project.description}</span></Link></li>)}</ul>
          </section>

          <section className={styles.detailSection} aria-labelledby="skills-title">
            <h3 id="skills-title" className={styles.sectionTitle}>专业技能</h3>
            <ul className={styles.skills}>{profile.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </section>

          <section className={styles.detailSection} aria-labelledby="tools-title">
            <h3 id="tools-title" className={styles.sectionTitle}>TOOLS</h3>
            <ul className={styles.tools}>{profile.tools.map((tool) => <li key={tool}><ToolIcon name={tool} /><span>{tool}</span></li>)}</ul>
          </section>
        </div>
        </div>
      </div>
    </section>
  );
}
