"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import styles from "./case-primitives.module.css";

export type CaseImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function CaseImage({ src, alt, width, height, caption, priority = false, className = "", sizes = "(max-width: 639px) 94vw, (max-width: 1023px) 88vw, 1200px" }: CaseImageProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const reduced = useReducedMotion();
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    if (!element) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previous;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => { setOpen(false); setZoomed(false); };

  return (
    <motion.figure className={`${styles.figure} ${className}`} style={{ "--case-image-ratio": width / height } as CSSProperties} initial={priority ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.04 }} transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}>
      <button ref={trigger} type="button" className={styles.imageButton} onClick={() => setOpen(true)} aria-label={`放大查看：${alt}`} aria-haspopup="dialog">
        <Image src={assetPath(src)} alt={alt} width={width} height={height} preload={priority} sizes={sizes} className={styles.image} />
        <span className={styles.zoomHint} aria-hidden="true">↗</span>
      </button>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={labelId} onCancel={close} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        {open && <div className={styles.lightbox}>
          <div className={styles.lightboxBar}><p id={labelId}>{alt}</p><div><button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? "适应窗口" : "原始尺寸"}</button><button type="button" onClick={close} autoFocus aria-label="关闭图片预览">关闭 ×</button></div></div>
          <div className={styles.imageViewport} data-zoomed={zoomed}>
            {/* The original is only fetched when opened; no recreated product UI. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetPath(src)} alt={alt} width={width} height={height} style={zoomed ? { width: `${width}px`, maxWidth: "none", maxHeight: "none" } : undefined} />
          </div>
          <p className={styles.lightboxNote}>{caption || "原始作品图片"} · Esc 关闭{zoomed ? " · 可滚动查看完整原图" : ""}</p>
        </div>}
      </dialog>
    </motion.figure>
  );
}
