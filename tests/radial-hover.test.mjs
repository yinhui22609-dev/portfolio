import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { cardPose, modulo, radialGeometry } from "../src/components/radial-geometry.ts";

// Keep the app's bundler-style import unchanged while Node strips the TS types.
const hoverURL = new URL("../src/components/radial-hover.ts", import.meta.url);
const hook = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL === hoverURL.href && specifier === "./radial-geometry") {
      return nextResolve("./radial-geometry.ts", context);
    }
    return nextResolve(specifier, context);
  },
});
const { hoverSensors, sensorAt } = await import(hoverURL.href);
hook.deregister();

const count = 5;
const widths = [640, 768, 1000, 1440, 1920];
const middle = (sensor) => ({ x: (sensor.left + sensor.right) / 2, y: (sensor.top + sensor.bottom) / 2 });

test("all five projects have a reachable hover sensor at rest", () => {
  for (const width of widths) {
    const geometry = radialGeometry(width);
    for (let position = 0; position < count; position += 1) {
      const sensors = hoverSensors(position, count, width, geometry);
      assert.equal(sensors.length, count);
      assert.equal(new Set(sensors.map((sensor) => sensor.index)).size, count);
      for (const sensor of sensors) {
        assert.ok(sensor.left < sensor.right && sensor.top < sensor.bottom);
        assert.ok(sensor.top >= 0 && sensor.bottom <= geometry.height);
        const point = middle(sensor);
        assert.equal(sensorAt(sensors, point.x, point.y), sensor.index);
      }
    }
  }
});

test("sensor order follows the project ring after many positive and negative turns", () => {
  const width = 1440;
  const geometry = radialGeometry(width);
  for (let active = 0; active < count; active += 1) {
    const baseline = hoverSensors(active, count, width, geometry);
    assert.deepEqual(baseline.map((sensor) => sensor.index), Array.from({ length: count }, (_, i) => modulo(active - 2 + i, count)));
    for (const turns of [-1_000_000, -7, 0, 19, 1_000_000]) {
      assert.deepEqual(hoverSensors(active + turns * count, count, width, geometry), baseline);
    }
  }
});

test("adjacent hover regions have no ambiguous shared hit area", () => {
  for (const width of widths) {
    const geometry = radialGeometry(width);
    const sensors = hoverSensors(2, count, width, geometry);
    for (let i = 1; i < sensors.length; i += 1) {
      const left = sensors[i - 1];
      const right = sensors[i];
      assert.ok(left.right <= right.left);
      if (left.right !== right.left) continue;
      const overlapTop = Math.max(left.top, right.top);
      const overlapBottom = Math.min(left.bottom, right.bottom);
      if (overlapTop > overlapBottom) continue;
      const x = right.left;
      const y = (overlapTop + overlapBottom) / 2;
      // Rotated card outlines can legitimately leave gaps at a strip boundary.
      const matching = sensors.map((sensor) => sensorAt([sensor], x, y)).filter((index) => index !== null);
      assert.ok(matching.length <= 1);
      assert.equal(sensorAt(sensors, x, y), matching[0] ?? null);
    }
  }
});

test("empty stage corners and points outside the stage never select a project", () => {
  for (const width of widths) {
    const geometry = radialGeometry(width);
    const sensors = hoverSensors(2, count, width, geometry);
    for (const [x, y] of [[0, 0], [width - 1, 0], [0, geometry.height - 1], [width - 1, geometry.height - 1], [-1, geometry.height / 2], [width + 1, geometry.height / 2], [width / 2, -1], [width / 2, geometry.height + 1]]) {
      assert.equal(sensorAt(sensors, x, y), null, `${width}px: empty point (${x}, ${y}) must not select a project`);
    }
  }
});

test("a frozen snapshot maps the same points throughout a moving animation", () => {
  const width = 1440;
  const geometry = radialGeometry(width);
  const snapshot = hoverSensors(2, count, width, geometry);
  const before = structuredClone(snapshot);
  const probes = snapshot.map((sensor) => ({ ...middle(sensor), index: sensor.index }));
  for (const movingPosition of [-1_000_002.5, -3, 0.25, 2.2, 2.9, 3, 1_000_002.5]) {
    for (let index = 0; index < count; index += 1) cardPose(index, movingPosition, count, geometry);
    hoverSensors(movingPosition, count, width, geometry);
    for (const point of probes) assert.equal(sensorAt(snapshot, point.x, point.y), point.index);
    assert.deepEqual(snapshot, before);
  }
  const after = hoverSensors(3, count, width, geometry);
  assert.ok(probes.some((point) => sensorAt(after, point.x, point.y) !== point.index), "the test must distinguish frozen mapping from a refreshed snapshot");
});
