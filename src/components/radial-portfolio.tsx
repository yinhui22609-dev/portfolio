"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { projectHref, type Project } from "@/lib/projects";
import { Cross } from "./marks";
import { cardPose, modulo, radialGeometry, slotOffset } from "./radial-geometry";
import { hoverSensors, sensorAt } from "./radial-hover";
import styles from "./radial-portfolio.module.css";

const MotionLink = motion.create(Link);
type Props = { projects: Project[]; renderArtwork: (project: Project) => ReactNode };
type Point = { x: number; y: number };
type Gesture = { id: number; x: number; y: number; origin: number; intent: "pending" | "horizontal" | "vertical" };

function OrbitCard({ project, index, count, position, geometry, active, renderArtwork }: {
  project: Project; index: number; count: number; position: MotionValue<number>;
  geometry: ReturnType<typeof radialGeometry>; active: boolean; renderArtwork: Props["renderArtwork"];
}) {
  const pose = useTransform(() => cardPose(index, position.get(), count, geometry));
  const transform = useTransform(() => { const p = pose.get(); return `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateZ(${p.angle}deg) rotateY(${-p.angle * 0.24}deg) scale(${p.scale})`; });
  const opacity = useTransform(() => pose.get().opacity);
  const zIndex = useTransform(() => pose.get().zIndex);
  const pointerEvents = useTransform(() => pose.get().opacity < 0.05 ? "none" as const : "auto" as const);
  return (
    <MotionLink href={projectHref(project)} className={`fan-card theme-${project.theme} ${styles.card}`} style={{ transform, opacity, zIndex, pointerEvents }}
      id={`radial-card-${project.id}`} data-radial-card={project.id} data-active={active} aria-current={active ? "true" : undefined}
      aria-label={`查看${project.title}：${project.category}`} tabIndex={active ? 0 : -1}>
      <div className={`fan-artwork ${styles.artwork}`}>{renderArtwork(project)}</div>
      <div className="fan-card-label"><span>{project.title}</span><span>{project.medium.split(" / ")[0]}</span></div>
    </MotionLink>
  );
}

export function RadialPortfolio({ projects, renderArtwork }: Props) {
  const count = projects.length;
  const initial = Math.floor(count / 2);
  const router = useRouter();
  const position = useMotionValue(initial);
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const animationId = useRef(0);
  const locked = useRef(false);
  const target = useRef(initial);
  const gesture = useRef<Gesture | null>(null);
  const suppressClickUntil = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const candidate = useRef<number | null>(null);
  const inside = useRef(false);
  const lastPoint = useRef<Point | null>(null);
  const selectionPoint = useRef<Point | null>(null);
  const movedWhileLocked = useRef(false);
  const requestHover = useRef<(point: Point) => void>(() => {});
  const [width, setWidth] = useState(1000);
  const geometry = radialGeometry(width);
  const geometryRef = useRef({ geometry, width });
  geometryRef.current = { geometry, width };
  const [sensors, setSensors] = useState(() => hoverSensors(initial, count, 1000, radialGeometry(1000)));
  const sensorsRef = useRef(sensors);
  const [activeIndex, setActiveIndex] = useState(initial);
  const activeIndexRef = useRef(initial);
  const [announcement, setAnnouncement] = useState("");
  const [dragging, setDragging] = useState(false);

  useMotionValueEvent(position, "change", (value) => {
    const next = modulo(Math.round(value), count);
    if (activeIndexRef.current !== next) { activeIndexRef.current = next; setActiveIndex(next); }
  });
  const clearHover = useCallback(() => {
    if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
    hoverTimer.current = null; candidate.current = null;
  }, []);
  const refreshSensors = useCallback((value: number) => {
    const config = geometryRef.current;
    const next = hoverSensors(value, count, config.width, config.geometry);
    sensorsRef.current = next; setSensors(next);
  }, [count]);

  const moveTo = useCallback((value: number, reason: "hover" | "control" = "control") => {
    clearHover(); animation.current?.stop();
    const id = ++animationId.current;
    target.current = value; locked.current = true; movedWhileLocked.current = false;
    if (reason === "hover") selectionPoint.current = lastPoint.current;
    const complete = () => {
      if (id !== animationId.current) return;
      locked.current = false; refreshSensors(value);
      const index = modulo(Math.round(value), count);
      setAnnouncement(`${projects[index].title}，第 ${index + 1} 项，共 ${count} 项`);
      // Only physical pointer travel can queue another selection. Layout changes
      // and mouseenter events from moving card elements are never used.
      if (inside.current && movedWhileLocked.current && lastPoint.current) requestHover.current(lastPoint.current);
    };
    if (reducedMotion) { position.jump(value); complete(); }
    else animation.current = animate(position, value, { type: "tween", duration: Math.min(0.72, 0.42 + Math.abs(value - position.get()) * 0.1), ease: [0.22, 1, 0.36, 1], onComplete: complete });
  }, [clearHover, count, position, projects, reducedMotion, refreshSensors]);

  requestHover.current = (point: Point) => {
    if (!inside.current || gesture.current || locked.current || geometryRef.current.width < 640) return;
    const anchor = selectionPoint.current;
    if (anchor && Math.hypot(point.x - anchor.x, point.y - anchor.y) < 20) { clearHover(); return; }
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const index = sensorAt(sensorsRef.current, point.x - bounds.left, point.y - bounds.top);
    if (index === null || Math.abs(slotOffset(index, target.current, count)) < 0.01) { clearHover(); return; }
    if (candidate.current === index) return;
    clearHover(); candidate.current = index;
    hoverTimer.current = setTimeout(() => {
      hoverTimer.current = null; candidate.current = null;
      const latest = lastPoint.current;
      const rect = stageRef.current?.getBoundingClientRect();
      if (inside.current && !locked.current && !gesture.current && geometryRef.current.width >= 640 && latest && rect &&
        sensorAt(sensorsRef.current, latest.x - rect.left, latest.y - rect.top) === index) {
        moveTo(position.get() + slotOffset(index, position.get(), count), "hover");
      }
    }, 140);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(stage); return () => observer.disconnect();
  }, []);
  useEffect(() => { clearHover(); movedWhileLocked.current = false; refreshSensors(position.get()); }, [width, position, refreshSensors, clearHover]);
  useEffect(() => {
    if (reducedMotion) {
      animation.current?.stop(); ++animationId.current; locked.current = false;
      const nearest = Math.round(position.get()); position.jump(nearest); target.current = nearest; refreshSensors(nearest);
    }
  }, [position, reducedMotion, refreshSensors]);
  useEffect(() => () => { clearHover(); animation.current?.stop(); ++animationId.current; }, [clearHover]);

  const step = (direction: number) => moveTo(Math.round(target.current) + direction);
  const handleHover = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || width < 640 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const point = { x: event.clientX, y: event.clientY };
    const previous = lastPoint.current;
    if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) < 3) return;
    inside.current = true; lastPoint.current = point;
    if (locked.current) {
      const anchor = selectionPoint.current;
      if (!anchor || Math.hypot(point.x - anchor.x, point.y - anchor.y) >= 20) movedWhileLocked.current = true;
      return;
    }
    const anchor = selectionPoint.current;
    if (anchor && Math.hypot(point.x - anchor.x, point.y - anchor.y) < 20) { clearHover(); return; }
    requestHover.current(point);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || gesture.current) return;
    suppressClickUntil.current = 0; clearHover(); animation.current?.stop(); ++animationId.current; locked.current = false;
    const origin = position.get(); target.current = origin;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin, intent: "pending" };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current) { handleHover(event); return; }
    if (current.id !== event.pointerId || current.intent === "vertical") return;
    const dx = event.clientX - current.x; const dy = event.clientY - current.y;
    if (current.intent === "pending") {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { current.intent = "vertical"; return; }
      current.intent = "horizontal"; event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
    }
    position.set(current.origin - dx / geometry.pixelsPerSlot); target.current = position.get();
  };
  const finishGesture = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    if (current.intent !== "pending") suppressClickUntil.current = performance.now() + 450;
    if (current.intent === "horizontal") { setDragging(false); moveTo(Math.round(position.get())); }
    else if (Math.abs(position.get() - Math.round(position.get())) > 0.001) moveTo(Math.round(position.get()));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target === stageRef.current && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); router.push(projectHref(projects[activeIndex])); return; }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.target === stageRef.current || (event.target as HTMLElement).closest("[data-radial-card]")) stageRef.current?.focus({ preventScroll: true });
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") step(event.key === "ArrowLeft" ? -1 : 1);
    else { const index = event.key === "Home" ? 0 : count - 1; moveTo(position.get() + slotOffset(index, position.get(), count)); }
  };

  return (
    <section className={`fan-section ${styles.section}`} aria-label="环绕式作品菜单" aria-roledescription="轮播" onKeyDown={onKeyDown}>
      <div className="fan-caption"><span className="eyebrow">A FEW THINGS I’VE DESIGNED</span><span className={`fan-hint ${styles.hint}`} id="radial-instructions"><span className={styles.desktopHint}>悬停选择 · 点击查看项目</span><span className={styles.mobileHint}>左右滑动 · 探索作品</span></span></div>
      <div ref={stageRef} className={styles.stage} data-radial-stage data-dragging={dragging} role="group" tabIndex={0}
        aria-label="作品圆弧轨道，使用左右方向键切换" aria-activedescendant={`radial-card-${projects[activeIndex].id}`} aria-describedby="radial-instructions"
        style={{ "--radial-card-width": `${geometry.cardWidth}px`, "--radial-artwork-height": `${geometry.artworkHeight}px`, "--radial-height": `${geometry.height}px`, "--radial-top": `${geometry.top}px` } as CSSProperties}
        onPointerEnter={(event) => { inside.current = true; lastPoint.current = null; selectionPoint.current = null; if (!locked.current) refreshSensors(position.get()); handleHover(event); }}
        onPointerLeave={(event) => { inside.current = false; movedWhileLocked.current = false; lastPoint.current = null; selectionPoint.current = null; clearHover(); if (gesture.current?.intent !== "horizontal") finishGesture(event); }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishGesture} onPointerCancel={finishGesture}
        onLostPointerCapture={(event) => { if (event.target === event.currentTarget) finishGesture(event); }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => { if (event.detail > 0 && performance.now() < suppressClickUntil.current) { suppressClickUntil.current = 0; event.preventDefault(); event.stopPropagation(); } }}>
        <div className={styles.sensorLayer} aria-hidden="true">{sensors.map((sensor) => <span key={sensor.index} data-hover-project={projects[sensor.index].id} style={{ left: sensor.left, width: sensor.right - sensor.left, top: sensor.top, height: sensor.bottom - sensor.top }} />)}</div>
        {projects.map((project, index) => <OrbitCard key={project.id} project={project} index={index} count={count} position={position} geometry={geometry} active={activeIndex === index} renderArtwork={renderArtwork} />)}
      </div>
      <div className={styles.controls}><button type="button" onClick={() => step(-1)} aria-label="上一个作品">上一项</button><div className={styles.selection}><span>{projects[activeIndex].title}</span><span className={styles.counter}>{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span></div><button type="button" onClick={() => step(1)} aria-label="下一个作品">下一项</button></div>
      <Link className={styles.viewProject} href={projectHref(projects[activeIndex])}>查看项目<span>{projects[activeIndex].category}</span></Link>
      <p className={styles.live} role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      <div className={`fan-bottom ${styles.bottom}`}><Cross /><a href="#index">浏览项目索引</a><Cross /></div>
    </section>
  );
}
