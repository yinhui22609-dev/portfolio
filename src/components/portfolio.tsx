"use client";

import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { projectHref, type Project } from "@/lib/projects";
import { Cross, OrbitMark } from "./marks";
import { AboutProfile } from "./about-profile";
import { HelixTitle } from "./helix-title";
import { ProjectArtwork } from "./project-artwork";
import { RadialPortfolio } from "./radial-portfolio";
import { SiteHeader } from "./site-header";

export function Portfolio({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const reducedMotion = useReducedMotion();
  const filteredProjects = projects.filter((project) => activeFilter === "全部" || (activeFilter === "App" ? project.medium.startsWith("APP") : !project.medium.startsWith("APP")));

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">跳转至主要内容</a>
      <div className="portfolio-shell" id="top">
        <SiteHeader home />

        <main id="main">
          <section className="hero page-gutter" aria-labelledby="hero-title">
            <div className="hero-topline"><div className="welcome">WELCOME<br />TO MY<span className="welcome-dot">.</span></div><span className="hero-edition eyebrow">A PERSONAL SELECTION<br />OF IDEAS & EXPLORATIONS</span><OrbitMark /></div>
            <div className="hero-type-stage">
              <Cross className="type-cross-left" />
              <motion.div className="hero-red-block" aria-hidden="true" initial={reducedMotion ? false : { scaleY: 0.5, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} />
              <HelixTitle />
              <Cross className="type-cross-right" />
            </div>
            <div className="hero-baseline"><span>产品设计 · 界面设计 · 数字体验</span><span className="hero-manifesto">让复杂变得清晰，让体验留有温度。</span><a href="#work" className="explore-link">向下探索 <span className="scroll-line" aria-hidden="true" /></a></div>
            <RadialPortfolio projects={projects} renderArtwork={(project) => <ProjectArtwork project={project} />} />
          </section>

          <section id="work" className="work-section page-gutter" aria-labelledby="work-title">
            <div className="section-topline"><span className="eyebrow">SELECTED WORKS</span><span className="eyebrow">FIVE PROJECTS. DIFFERENT PERSPECTIVES.</span></div>
            <div className="work-heading"><h2 id="work-title">一些探索<span className="accent-dot">.</span></h2><p>从日常需求到文化表达，<br />在不同的问题里，寻找恰当的设计。</p></div>
            <div className="project-index" id="index">
              <div className="index-toolbar"><span className="index-label">项目索引 / PROJECT INDEX</span><div className="project-filters" role="group" aria-label="按项目类型筛选">{["全部", "App", "Web / AI"].map((filter) => <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project) => (
                  <motion.article key={project.id} layout={!reducedMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="project-row">
                    <h3 id={`project-title-${project.id}`} className="sr-only">{project.title}</h3>
                    <Link className="project-row-button" href={projectHref(project)} aria-labelledby={`project-title-${project.id} project-category-${project.id}`}>
                      <span className={`row-swatch swatch-${project.theme}`} aria-hidden="true" />
                      <span className="row-title">{project.title}</span><span className="row-category" id={`project-category-${project.id}`}>{project.category}</span><span className="row-medium eyebrow">{project.medium}</span><span className="row-action">查看项目 <span aria-hidden="true">＋</span></span>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <AboutProfile />
        </main>

        <footer className="site-footer page-gutter"><a className="footer-wordmark" href="#top">PORTFOLIO<span className="footer-period">.</span></a><span>持续观察，持续设计。</span><a href="#top" className="back-to-top">回到顶部 <span aria-hidden="true">↑</span></a></footer>
      </div>
    </MotionConfig>
  );
}
