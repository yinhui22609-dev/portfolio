import test from "node:test";
import assert from "node:assert/strict";
import { cardPose, modulo, radialGeometry, slotOffset } from "../src/components/radial-geometry.ts";

const count = 5;
const closeTo = (actual, expected, tolerance = 1e-7) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be within ${tolerance} of ${expected}`);
};

test("all card centres remain on the configured circular arc", () => {
  for (const width of [320, 390, 599, 600, 768, 1440, 1920]) {
    const geometry = radialGeometry(width);
    for (let position = -8; position <= 8; position += 0.125) {
      for (let index = 0; index < count; index += 1) {
        const pose = cardPose(index, position, count, geometry);
        closeTo(Math.hypot(pose.x, pose.y - geometry.radius), geometry.radius);
        assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
      }
    }
  }
});

test("positive and negative full revolutions preserve the same view and cyclic order", () => {
  const geometry = radialGeometry(1200);
  for (const base of [-3.375, -1, 0, 2, 4.125]) {
    for (const revolutions of [-100_000, -7, 0, 9, 100_000]) {
      const position = base + revolutions * count;
      const ordered = Array.from({ length: count }, (_, index) => ({ index, offset: slotOffset(index, position, count) }))
        .sort((a, b) => a.offset - b.offset);
      for (let i = 0; i < count; i += 1) {
        assert.ok(ordered[i].offset >= -count / 2 && ordered[i].offset < count / 2);
        if (i > 0) assert.equal(ordered[i].index, modulo(ordered[i - 1].index + 1, count));
        const actual = cardPose(i, position, count, geometry);
        const expected = cardPose(i, base, count, geometry);
        for (const key of ["x", "y", "z", "angle", "scale", "opacity", "zIndex"]) closeTo(actual[key], expected[key]);
      }
    }
  }
});

test("each project can occupy the exact centre after any number of revolutions", () => {
  const geometry = radialGeometry(390);
  for (const revolutions of [-1_000_000, -1, 0, 1, 1_000_000]) {
    for (let index = 0; index < count; index += 1) {
      const pose = cardPose(index, index + revolutions * count, count, geometry);
      closeTo(pose.x, 0);
      closeTo(pose.y, 0);
      closeTo(pose.angle, 0);
      assert.equal(pose.opacity, 1);
    }
  }
});

test("the recycle seam stays invisible on both sides of a sampled frame", () => {
  const geometry = radialGeometry(1440);
  // A frame will generally cross the modulo branch without sampling exactly 2.5.
  // Leave an invisible neighborhood so visible artwork cannot teleport sides.
  for (const index of [0, 1, 2, 3, 4]) {
    for (const revolutions of [-20, 0, 20]) {
      const seam = index + count / 2 + count * revolutions;
      for (const delta of [-0.05, 0, 0.05]) {
        assert.equal(cardPose(index, seam + delta, count, geometry).opacity, 0);
      }
    }
  }
});

test("the centred card fits fully inside every responsive stage", () => {
  for (const width of [280, 320, 360, 390, 430, 599, 600, 639, 640, 768, 1024, 1440, 1920, 2560]) {
    const geometry = radialGeometry(width);
    const pose = cardPose(2, 2, count, geometry);
    // Includes a conservative 52px caption/border allowance and the CSS perspective.
    const cardHeight = geometry.artworkHeight + 52;
    const perspective = width <= 639 ? 1000 : 1400;
    const projection = perspective / (perspective - pose.z);
    const halfWidth = geometry.cardWidth * pose.scale * projection / 2;
    const halfHeight = cardHeight * pose.scale * projection / 2;
    const originY = geometry.height * 0.25;
    const centreY = originY + (geometry.top + cardHeight / 2 - originY) * projection;
    assert.ok(width / 2 - halfWidth >= 0, `${width}px: card crosses the left edge`);
    assert.ok(width / 2 + halfWidth <= width, `${width}px: card crosses the right edge`);
    assert.ok(centreY - halfHeight >= 0, `${width}px: card crosses the top edge`);
    assert.ok(centreY + halfHeight <= geometry.height, `${width}px: card crosses the bottom edge`);
  }
});
