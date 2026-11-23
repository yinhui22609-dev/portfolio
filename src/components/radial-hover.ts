import { cardPose, type radialGeometry } from "./radial-geometry";
export type HoverSensor = { index: number; left: number; right: number; top: number; bottom: number; centerX: number; centerY: number; radians: number; halfWidth: number; halfHeight: number };
/** Regions are snapshotted at rest and remain stationary during animation. */
export function hoverSensors(position: number, count: number, width: number, geometry: ReturnType<typeof radialGeometry>): HoverSensor[] {
  const height = geometry.artworkHeight + 48;
  const cards = Array.from({ length: count }, (_, index) => {
    const pose = cardPose(index, position, count, geometry);
    const radians = pose.angle * Math.PI / 180;
    const halfHeight = (Math.abs(Math.sin(radians)) * geometry.cardWidth + Math.abs(Math.cos(radians)) * height) * pose.scale / 2;
    const centerY = geometry.top + pose.y + height / 2;
    return { index, x: width / 2 + pose.x, centerY, radians, halfWidth: geometry.cardWidth * pose.scale / 2 + 10, halfHeight: height * pose.scale / 2 + 10, top: Math.max(0, centerY - halfHeight), bottom: Math.min(geometry.height, centerY + halfHeight) };
  }).sort((a, b) => a.x - b.x);
  return cards.map((card, order) => ({ index: card.index, left: order === 0 ? 0 : (cards[order - 1].x + card.x) / 2,
    right: order === count - 1 ? width : (card.x + cards[order + 1].x) / 2, top: card.top, bottom: card.bottom,
    centerX: card.x, centerY: card.centerY, radians: card.radians, halfWidth: card.halfWidth, halfHeight: card.halfHeight }));
}
export function sensorAt(sensors: HoverSensor[], x: number, y: number) {
  return sensors.find((s) => {
    if (x < s.left || x >= s.right || y < s.top || y > s.bottom) return false;
    const dx = x - s.centerX; const dy = y - s.centerY;
    return Math.abs(dx * Math.cos(s.radians) + dy * Math.sin(s.radians)) <= s.halfWidth &&
      Math.abs(-dx * Math.sin(s.radians) + dy * Math.cos(s.radians)) <= s.halfHeight;
  })?.index ?? null;
}
