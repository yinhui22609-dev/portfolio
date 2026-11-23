import Image from "next/image";
import { CaseImage } from "./case-primitives";
import styles from "./nianhua-hero.module.css";

const images = "/images/projects/nianhua/";

export function NianhuaHero({ siteUrl }: { siteUrl: string }) {
  return <>
    <header className={styles.hero} aria-labelledby="project-heading" data-nianhua-hero>
      <div className={styles.paper} aria-hidden="true" />
      <div className={styles.branch} aria-hidden="true" />
      <div className={styles.landscape} aria-hidden="true" />

      <div className={styles.brand}>
        <Image src={`${images}hero-seal.png`} width={174} height={174} alt="" className={styles.brandSeal} />
        <div><p>纸间风华 · 木版年画数字科普网</p><span>Woodblock New Year Painting<br />Digital Science Popularization Website</span></div>
      </div>

      <div className={styles.stage}>
        <div className={styles.titleGroup}>
          <div className={styles.titleComposition}>
            <h1 id="project-heading" className={styles.heroTitle} aria-label="纸间风华">{Array.from("纸间风华", (character, index) => <span key={character} className={styles[`character${index + 1}`]} aria-hidden="true">{character}</span>)}</h1>
            <Image src={`${images}hero-seal.png`} width={174} height={174} alt="" className={styles.titleSeal} />
          </div>
          <p className={styles.subtitle}>木版年画<br /><strong>数字科普网站设计</strong></p>
        </div>

        <CaseImage className={styles.artwork} src={`${images}cover-scroll.png`} alt="纸间风华电脑画卷：两台电脑与卷轴式网页组成的原始网站展示图" width={1430} height={887} priority sizes="(max-width: 639px) 90vw, (max-width: 1023px) 55vw, 700px" />
      </div>

      <div className={styles.footer}>
        <span className={styles.edition}>文化科普 · 互动体验</span>
        <div className={styles.tagline}><p>一纸年画藏万年，千年刻版续风华。</p><span>A single New Year painting holds a world of wonders.<br />A thousand-year-old woodblock keeps the timeless glory alive.</span></div>
      </div>
    </header>
    <div className={styles.actions}><p>从了解年画，到动手完成一次套印。</p><a href={siteUrl} target="_blank" rel="noopener noreferrer">访问真实网站 <span aria-hidden="true">↗</span></a></div>
  </>;
}
