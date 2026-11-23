import type { Metadata } from "next";
import Link from "next/link";
import { AboutProfile } from "@/components/about-profile";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "关于 — 产品设计作品集",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <div className={`portfolio-shell ${styles.page}`}>
      <a className="skip-link" href="#about-main">跳转至个人介绍</a>
      <SiteHeader />
      <main id="about-main"><AboutProfile standalone /></main>
      <footer className={`${styles.footer} page-gutter`}><Link href="/">PORTFOLIO<span>.</span></Link><span>持续观察，持续设计。</span><Link href="/">返回首页</Link></footer>
    </div>
  );
}