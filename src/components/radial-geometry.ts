export const modulo = (value: number, count: number) => ((value % count) + count) % count;

/** Signed shortest distance in card slots. The continuous rotation never resets. */
export function slotOffset(index: number, position: number, count: number) {
  return modulo(index - position + count / 2, count) - count / 2;
}

export function radialGeometry(width: number) {
  const mobile = width < 600;
  const cardWidth = mobile ? Math.min(260, width * 0.65) : Math.min(310, Math.max(220, width * 0.24));
  return {
    cardWidth,
    // Keep the existing cover typography and bottom captions separated at 320px.
    artworkHeight: mobile ? Math.max(280, cardWidth * 1.2) : cardWidth * 1.2,
    radius: mobile ? Math.max(310, width * 0.86) : width * 0.57,
    step: mobile ? 34 : 22,
    height: mobile ? 460 : Math.min(660, cardWidth * 1.2 + 260),
    top: mobile ? 38 : 48,
    pixelsPerSlot: cardWidth * 0.72,
  };
}

export function cardPose(index: number, position: number, count: number, geometry: ReturnType<typeof radialGeometry>) {
  const offset = slotOffset(index, position, count);
  const distance = Math.abs(offset);
  const angle = offset * geometry.step;
  const radians = angle * Math.PI / 180;
  // Recycling happens only at the invisible outer seam, never across the centre.
  const fadeStart = count / 2 - 0.6;
  const fadeEnd = count / 2 - 0.2;
  const opacity = distance <= fadeStart
    ? 1 - distance * 0.1
    : Math.max(0, (fadeEnd - distance) / (fadeEnd - fadeStart)) * (1 - fadeStart * 0.1);
  return {
    x: geometry.radius * Math.sin(radians),
    y: geometry.radius * (1 - Math.cos(radians)),
    z: 32 - distance * 40,
    angle,
    scale: 1.04 - distance * 0.065,
    opacity,
    zIndex: 100 - Math.round(distance * 24),
  };
}
