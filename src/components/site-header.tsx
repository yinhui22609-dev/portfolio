import Link from "next/link";
import { Asterisk } from "./marks";

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="site-header page-gutter">
      <Link href="/" className="brand" aria-label="产品设计作品集首页"><Asterisk className="brand-mark" /><span>PRODUCT DESIGN<br />& DIGITAL EXPERIENCES</span></Link>
      <span className="header-note">观察日常，设计可能。</span>
      <nav aria-label="主导航" className="flex items-center gap-7 md:gap-10">
        <Link href={home ? "#work" : "/#work"}>作品 <span className="nav-count">(05)</span></Link>
        <Link href="/about">关于</Link>
        <Link className="nav-index" href={home ? "#index" : "/#index"} aria-label="查看项目索引"><span className="index-icon" aria-hidden="true"><i /><i /><i /><i /></span></Link>
      </nav>
    </header>
  );
}
