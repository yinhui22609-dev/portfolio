"use client";

import { useEffect, useRef } from "react";
import styles from "./helix-title.module.css";

const WORD = "PORTFOLIO";
// A genuine SVG circle in normalized coordinates. Its two axes become y / z,
// so staggered glyph phases trace two opposing helices along the word's x axis.
const ORBIT = "M 0 -1 C .552285 -1 1 -.552285 1 0 C 1 .552285 .552285 1 0 1 C -.552285 1 -1 .552285 -1 0 C -1 -.552285 -.552285 -1 0 -1 Z";

export function HelixTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 639px)");
    let disposed = false;
    let generation = 0;
    let release: (() => void) | undefined;

    const initialize = async () => {
      const current = ++generation;
      release?.(); release = undefined;
      title.dataset.helixState = reduced.matches ? "reduced" : "loading";
      if (reduced.matches) return;
      try {
        const [{ gsap }, { MotionPathPlugin }] = await Promise.all([import("gsap"), import("gsap/MotionPathPlugin")]);
        await document.fonts.ready;
        if (disposed || current !== generation) return;
        gsap.registerPlugin(MotionPathPlugin);
        const path = title.querySelector<SVGPathElement>("[data-helix-path]")!;
        const measure = title.querySelector<HTMLSpanElement>("[data-helix-measure]")!;
        const planes = Array.from(title.querySelectorAll<HTMLSpanElement>("[data-helix-plane]"));
        const parallax = title.querySelector<HTMLDivElement>("[data-helix-parallax]")!;
        const anchors = Array.from(title.querySelectorAll<HTMLSpanElement>("[data-helix-anchor]"));
        const glyphs = Array.from(title.querySelectorAll<HTMLSpanElement>("[data-helix-glyph]"));
        const rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(path));
        const compact = mobile.matches;
        const clock = { turn: 0, blend: 0 };
        let radius = 0;
        let depth = 0;
        let entered = false;
        let visible = true;
        let pointerBounds = title.getBoundingClientRect();
        // Raw CSS matrices avoid GSAP's decomposed-transform cache: the timeline
        // owns time; each glyph receives exactly one composited transform write.
        const setters = glyphs.map((glyph) => (value: string) => { glyph.style.transform = value; });

        const render = () => {
          for (let i = 0; i < glyphs.length; i++) {
            const strand = Math.floor(i / WORD.length);
            const phase = (clock.turn + (i % WORD.length) * 0.115 + strand * 0.5) % 1;
            const point = MotionPathPlugin.getPositionOnPath(rawPath, phase);
            const y = point.y * radius * clock.blend;
            const z = point.x * depth * clock.blend;
            const tilt = compact ? 5 : 14;
            setters[i](`translate3d(0,${y.toFixed(3)}px,${z.toFixed(3)}px) rotateX(${(point.x * tilt * clock.blend).toFixed(3)}deg) rotateY(${(point.y * (compact ? 2 : 7) * clock.blend).toFixed(3)}deg) rotateZ(${(point.x * (compact ? 0.7 : 2.2) * clock.blend).toFixed(3)}deg)`);
          }
        };

        const measureGlyphs = () => {
          // Preserve original proportional typography and tight kerning. Reads
          // happen only at initialization / resize, never in the animation loop.
          const text = measure.firstChild!;
          const range = document.createRange();
          for (let index = 0; index < WORD.length; index++) {
            range.setStart(text, 0); range.setEnd(text, index);
            const left = index === 0 ? 0 : range.getBoundingClientRect().width;
            range.setStart(text, index); range.setEnd(text, index + 1);
            const width = range.getBoundingClientRect().width;
            for (const anchor of [anchors[index], anchors[index + WORD.length]]) {
              anchor.style.left = `${left}px`;
              anchor.style.width = `${width}px`;
            }
          }
          range.detach();
          const fontSize = Number.parseFloat(getComputedStyle(title).fontSize);
          const stageHeight = title.parentElement!.clientHeight;
          radius = Math.min(fontSize * (compact ? 0.2 : 0.135), stageHeight * 0.15, compact ? 12 : 28);
          depth = Math.min(fontSize * (compact ? 0.19 : 0.3), compact ? 12 : 58);
          pointerBounds = title.getBoundingClientRect();
          render();
        };

        let cycle: gsap.core.Tween;
        let entrance: gsap.core.Timeline;
        const context = gsap.context(() => {
          measureGlyphs();
          gsap.set(planes, { transformOrigin: "50% 50%" });
          cycle = gsap.to(clock, { turn: 1, duration: compact ? 24 : 18, repeat: -1, ease: "none", paused: true, onUpdate: render });
          entrance = gsap.timeline({ paused: true, onUpdate: render, onComplete: () => { entered = true; syncPlayback(); } });
          entrance.fromTo(planes[0], { x: compact ? -24 : -85, y: -12, rotationY: compact ? -8 : -24, autoAlpha: 0 }, { x: 0, y: 0, rotationY: 0, autoAlpha: 1, duration: 1.25, ease: "power3.out" }, 0);
          entrance.fromTo(planes[1], { x: compact ? 24 : 85, y: 16, rotationY: compact ? 8 : 24, autoAlpha: 0 }, { x: 0, y: 0, rotationY: 0, autoAlpha: 1, duration: 1.45, ease: "power3.out" }, 0.12);
          entrance.to(clock, { blend: 1, duration: 1.8, ease: "power2.inOut" }, 0);
        }, title);

        // Establish recovery before allocating observers/listeners below.
        release = () => {
          context.revert(); gsap.killTweensOf(parallax);
          glyphs.forEach((glyph) => glyph.style.removeProperty("transform"));
          delete title.dataset.helixReady;
        };

        const parallaxX = gsap.quickTo(parallax, "rotationX", { duration: 0.8, ease: "power3.out" });
        const parallaxY = gsap.quickTo(parallax, "rotationY", { duration: 0.8, ease: "power3.out" });
        const parallaxOffset = gsap.quickTo(parallax, "x", { duration: 0.8, ease: "power3.out" });
        const neutralPointer = () => { parallaxX(0); parallaxY(0); parallaxOffset(0); };
        const pointerEnter = () => { pointerBounds = title.getBoundingClientRect(); };
        const pointerMove = (event: PointerEvent) => {
          if (compact || event.pointerType !== "mouse" || !visible || document.hidden || !window.matchMedia("(pointer: fine)").matches) return;
          const x = Math.max(-1, Math.min(1, (event.clientX - pointerBounds.left) / pointerBounds.width * 2 - 1));
          const y = Math.max(-1, Math.min(1, (event.clientY - pointerBounds.top) / pointerBounds.height * 2 - 1));
          parallaxX(-y * 1.4); parallaxY(x * 2); parallaxOffset(x * 4);
        };
        function syncPlayback() {
          const running = visible && !document.hidden;
          title!.dataset.helixState = running ? "running" : document.hidden ? "hidden" : "offscreen";
          if (running) { if (entered) cycle.play(); else entrance.play(); }
          else {
            cycle.pause(); entrance.pause();
            parallaxX.tween.pause(); parallaxY.tween.pause(); parallaxOffset.tween.pause();
            gsap.set(parallax, { rotationX: 0, rotationY: 0, x: 0 });
          }
        }
        const bounds = title.getBoundingClientRect();
        visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); }, { threshold: 0.05 });
        observer.observe(title);
        const resize = new ResizeObserver(measureGlyphs);
        resize.observe(title);
        title.addEventListener("pointerenter", pointerEnter);
        title.addEventListener("pointermove", pointerMove);
        title.addEventListener("pointerleave", neutralPointer);
        document.addEventListener("visibilitychange", syncPlayback);
        title.dataset.helixReady = "true";
        syncPlayback();

        release = () => {
          observer.disconnect(); resize.disconnect();
          title.removeEventListener("pointerenter", pointerEnter);
          title.removeEventListener("pointermove", pointerMove);
          title.removeEventListener("pointerleave", neutralPointer);
          document.removeEventListener("visibilitychange", syncPlayback);
          parallaxX.tween.kill(); parallaxY.tween.kill(); parallaxOffset.tween.kill();
          context.revert();
          gsap.set(parallax, { clearProps: "transform" });
          glyphs.forEach((glyph) => glyph.style.removeProperty("transform"));
          delete title.dataset.helixReady;
        };
      } catch {
        // SSR typography remains visible if enhancement cannot load.
        if (!disposed && current === generation) {
          release?.(); release = undefined;
          delete title.dataset.helixReady; title.dataset.helixState = "static";
        }
      }
    };
    void initialize();
    reduced.addEventListener("change", initialize);
    mobile.addEventListener("change", initialize);
    return () => { disposed = true; ++generation; reduced.removeEventListener("change", initialize); mobile.removeEventListener("change", initialize); release?.(); };
  }, []);

  return (
    <h1 ref={titleRef} id="hero-title" className={`hero-title ${styles.title}`} aria-label="PORTFOLIO 产品设计作品集" data-helix-state="static">
      <span className={styles.measure} data-helix-measure aria-hidden="true">{WORD}</span>
      <svg className={styles.path} width="0" height="0" aria-hidden="true" focusable="false"><path data-helix-path d={ORBIT} /></svg>
      <span className={styles.scene} aria-hidden="true"><span className={styles.parallax} data-helix-parallax>
        {["solid", "outline"].map((strand) => (
          <span key={strand} className={`hero-word hero-word-${strand} ${styles.strand}`}>
            <span className={styles.fallback}>{WORD}</span>
            <span className={styles.plane} data-helix-plane>{Array.from(WORD, (letter, index) => <span className={styles.anchor} data-helix-anchor key={index}><span className={styles.glyph} data-helix-glyph>{letter}</span></span>)}</span>
          </span>
        ))}
      </span></span>
    </h1>
  );
}
