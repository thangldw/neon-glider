import * as THREE from "three";

const LANE_X = 3.4;
const TUNNEL_COUNT = 28;
const TUNNEL_SPACING = 6;
const TUNNEL_START_Z = -2;

export function blockerScale(depth) {
  return 0.18 + Math.pow(Math.max(0, Math.min(1, depth)), 1.6) * 0.86;
}

export function responsiveHorizontalScale(aspect) {
  return Math.max(0.29, Math.min(1, aspect / 1.55));
}

export function blockerMarkSegments() {
  return [
    [-0.78, -0.78, -0.14, -0.14],
    [0.14, 0.14, 0.78, 0.78],
    [-0.78, 0.78, -0.14, 0.14],
    [0.14, -0.14, 0.78, -0.78],
  ];
}

export function blockerWidthScale(horizontalScale) {
  return 0.55 + 0.45 * horizontalScale;
}

export const palette = {
  void: 0x02050b,
  cyan: 0x54e7ff,
  magenta: 0xff18b8,
  danger: 0x310019,
  pickup: 0xd9fbff,
  hull: 0x244a87,
};

function polygonPoints(radius = 6.2, heightScale = 0.72) {
  return Array.from({ length: 8 }, (_, index) => {
    const angle = Math.PI / 8 + index * Math.PI / 4;
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * heightScale + 1.2, 0);
  });
}

function polygonRibbonGeometry(radius, thickness) {
  const points = polygonPoints(radius);
  const positions = [];
  for (let index = 0; index < points.length; index += 1) {
    const start = points[index];
    const end = points[(index + 1) % points.length];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = (-dy / length) * thickness * 0.5;
    const ny = (dx / length) * thickness * 0.5;
    positions.push(
      start.x + nx, start.y + ny, 0,
      start.x - nx, start.y - ny, 0,
      end.x + nx, end.y + ny, 0,
      start.x - nx, start.y - ny, 0,
      end.x - nx, end.y - ny, 0,
      end.x + nx, end.y + ny, 0,
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function makeNeonRib(color) {
  const group = new THREE.Group();
  const glow = new THREE.Mesh(
    polygonRibbonGeometry(6.2, 0.19),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  glow.userData.layer = "glow";
  const core = new THREE.Mesh(
    polygonRibbonGeometry(6.2, 0.065),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.92 }),
  );
  core.userData.layer = "core";
  group.add(glow, core);
  return group;
}

function floorSegmentGeometry(x1, z1, x2, z2, width) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const length = Math.hypot(dx, dz) || 1;
  const nx = (-dz / length) * width * 0.5;
  const nz = (dx / length) * width * 0.5;
  const y = -0.585;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    x1 + nx, y, z1 + nz,
    x1 - nx, y, z1 - nz,
    x2 + nx, y, z2 + nz,
    x1 - nx, y, z1 - nz,
    x2 - nx, y, z2 - nz,
    x2 + nx, y, z2 + nz,
  ], 3));
  return geometry;
}

function screenSegmentGeometry(x1, y1, x2, y2, width, z) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const nx = (-dy / length) * width * 0.5;
  const ny = (dx / length) * width * 0.5;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    x1 + nx, y1 + ny, z,
    x1 - nx, y1 - ny, z,
    x2 + nx, y2 + ny, z,
    x1 - nx, y1 - ny, z,
    x2 - nx, y2 - ny, z,
    x2 + nx, y2 + ny, z,
  ], 3));
  return geometry;
}

function lineMaterial(color, opacity = 1) {
  return new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
}

function makeWing(side, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    0, 0.1, 0.2,
    side * 2.35, -0.05, 0.7,
    side * 0.85, 0.05, -0.65,
  ], 3));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function makeExhaust(side, material) {
  const geometry = new THREE.BufferGeometry();
  const x = side * 0.62;
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    x - 0.11, -0.08, 0.68,
    x + 0.11, -0.08, 0.68,
    x, -0.06, 3.15,
  ], 3));
  return new THREE.Mesh(geometry, material);
}

function makeGlider() {
  const group = new THREE.Group();
  group.name = "glider";
  const hullMaterial = new THREE.MeshBasicMaterial({ color: palette.hull, side: THREE.DoubleSide });
  const cyanMaterial = new THREE.MeshBasicMaterial({ color: palette.cyan });
  const magentaMaterial = new THREE.MeshBasicMaterial({ color: palette.magenta });
  const exhaustMaterial = new THREE.MeshBasicMaterial({
    color: palette.magenta,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });

  const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.82, 0), hullMaterial);
  body.scale.set(1.1, 0.48, 1.65);
  body.position.z = 0.15;
  group.add(body, makeWing(-1, hullMaterial), makeWing(1, hullMaterial));

  for (const side of [-1, 1]) {
    const engine = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), magentaMaterial);
    engine.position.set(side * 0.65, -0.1, 0.78);
    group.add(engine);
    group.add(makeExhaust(side, exhaustMaterial));
  }

  const canopy = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), cyanMaterial);
  canopy.scale.set(0.72, 0.9, 1.25);
  canopy.position.set(0, 0.35, -0.12);
  group.add(canopy);
  group.traverse((child) => {
    if (!child.isMesh || child.material !== hullMaterial) return;
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(child.geometry), lineMaterial(palette.cyan, 0.65));
    child.add(outline);
  });
  group.scale.setScalar(0.7);
  group.position.set(0, 0.45, 2);
  return group;
}

export function buildNeonScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030713);
  scene.fog = new THREE.Fog(0x030713, 96, 220);

  const camera = new THREE.PerspectiveCamera(64, 16 / 9, 0.1, 240);
  camera.position.set(0, 2.7, 7.8);
  camera.lookAt(0, 0.5, -32);

  const tunnel = new THREE.Group();
  tunnel.name = "tunnel";
  for (let index = 0; index < TUNNEL_COUNT; index += 1) {
    const color = index % 3 === 0 ? palette.magenta : palette.cyan;
    const rib = makeNeonRib(color);
    rib.position.z = TUNNEL_START_Z - index * TUNNEL_SPACING;
    rib.userData.baseIndex = index;
    tunnel.add(rib);
  }

  const lanes = new THREE.Group();
  lanes.name = "lanes";
  for (const lane of [-1, 0, 1]) {
    const nearX = lane * LANE_X;
    const farX = lane * 0.34;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([
      nearX - 0.045, -0.62, 5,
      nearX + 0.045, -0.62, 5,
      farX - 0.012, -0.15, -174,
      nearX + 0.045, -0.62, 5,
      farX + 0.012, -0.15, -174,
      farX - 0.012, -0.15, -174,
    ], 3));
    const guide = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: palette.cyan, transparent: true, opacity: lane === 0 ? 0.78 : 0.96 }),
    );
    lanes.add(guide);
  }

  const speedLines = new THREE.Group();
  speedLines.name = "speed-lines";
  for (let index = 0; index < 18; index += 1) {
    const angle = (index / 18) * Math.PI * 2;
    const nearX = Math.cos(angle) * 10.5;
    const nearY = Math.sin(angle) * 5.8 + 1.15;
    const farX = Math.cos(angle) * 0.68;
    const farY = Math.sin(angle) * 0.42 + 1.15;
    const tangentX = -Math.sin(angle) * 0.07;
    const tangentY = Math.cos(angle) * 0.07;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([
      nearX + tangentX, nearY + tangentY, 5,
      nearX - tangentX, nearY - tangentY, 5,
      farX, farY, -128,
    ], 3));
    speedLines.add(new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? palette.magenta : palette.cyan,
        transparent: true,
        opacity: index % 2 === 0 ? 0.2 : 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    ));
  }

  const flow = new THREE.Group();
  flow.name = "flow";
  const flowMaterial = new THREE.MeshBasicMaterial({
    color: palette.magenta,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (let index = 0; index < 20; index += 1) {
    const chevron = new THREE.Group();
    chevron.userData.baseIndex = index;
    chevron.add(
      new THREE.Mesh(floorSegmentGeometry(-0.72, 0.28, 0, -0.34, 0.11), flowMaterial),
      new THREE.Mesh(floorSegmentGeometry(0.72, 0.28, 0, -0.34, 0.11), flowMaterial),
    );
    chevron.position.z = 2 - index * 7;
    flow.add(chevron);
  }

  const stars = new THREE.Group();
  stars.name = "starfield";
  const starPositions = [];
  for (let i = 0; i < 420; i++) {
    const angle = i * 2.399963;
    const radius = 8 + (i % 17) * 0.8;
    starPositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, -(i % 160));
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  stars.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: palette.cyan, size: 0.055, transparent: true, opacity: 0.65 })));

  const objects = new THREE.Group();
  objects.name = "objects";
  const effects = new THREE.Group();
  effects.name = "effects";
  const glider = makeGlider();
  scene.add(stars, speedLines, tunnel, lanes, flow, glider, objects, effects);

  return { scene, camera, groups: { speedLines, tunnel, lanes, flow, glider, objects, effects } };
}

function makeBlocker() {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(2.55, 3.25, 1.25);
  const fill = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: palette.danger }));
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    lineMaterial(palette.magenta, 1),
  );
  const markGlowMaterial = new THREE.MeshBasicMaterial({
    color: palette.cyan,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });
  const markCoreMaterial = new THREE.MeshBasicMaterial({
    color: palette.magenta,
    transparent: true,
    opacity: 0.96,
    blending: THREE.AdditiveBlending,
  });
  group.add(fill, edges);
  for (const [x1, y1, x2, y2] of blockerMarkSegments()) {
    group.add(
      new THREE.Mesh(screenSegmentGeometry(x1, y1, x2, y2, 0.22, 0.638), markGlowMaterial),
      new THREE.Mesh(screenSegmentGeometry(x1, y1, x2, y2, 0.1, 0.65), markCoreMaterial),
    );
  }
  return group;
}

function makePickup() {
  const geometry = new THREE.OctahedronGeometry(0.58, 0);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: palette.pickup, transparent: true, opacity: 0.95 }),
  );
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), lineMaterial(palette.cyan, 1));
  const group = new THREE.Group();
  group.add(mesh, edges);
  return group;
}

function makeWarning() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.7, -0.52, 0.4),
    new THREE.Vector3(0, -0.48, -0.35),
    new THREE.Vector3(0, -0.48, -0.35),
    new THREE.Vector3(0.7, -0.52, 0.4),
  ]);
  return new THREE.LineSegments(geometry, lineMaterial(palette.magenta, 0.86));
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
    else child.material?.dispose?.();
  });
}

export function createNeonWorld(canvas) {
  const { scene, camera, groups } = buildNeonScene();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(palette.void, 1);

  const objectPool = new Map();
  const collectRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.055, 8, 48),
    new THREE.MeshBasicMaterial({ color: palette.cyan, transparent: true, opacity: 0 }),
  );
  const hitRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.075, 8, 48),
    new THREE.MeshBasicMaterial({ color: palette.magenta, transparent: true, opacity: 0 }),
  );
  collectRing.rotation.x = Math.PI / 2;
  hitRing.rotation.x = Math.PI / 2;
  groups.effects.add(collectRing, hitRing);

  let reducedMotion = false;
  let contextLost = false;
  let horizontalScale = 1;

  const onContextLost = (event) => {
    event.preventDefault();
    contextLost = true;
  };
  const onContextRestored = () => { contextLost = false; };
  canvas.addEventListener("webglcontextlost", onContextLost, false);
  canvas.addEventListener("webglcontextrestored", onContextRestored, false);

  function objectView(object) {
    if (objectPool.has(object.id)) return objectPool.get(object.id);
    const view = object.kind === "blocker" ? makeBlocker() : object.kind === "pickup" ? makePickup() : makeWarning();
    view.userData.kind = object.kind;
    groups.objects.add(view);
    objectPool.set(object.id, view);
    return view;
  }

  function render(state, effects = { collect: 0, hit: 0 }) {
    if (contextLost) return;
    const now = performance.now();
    const tunnelOffset = (state.distance * 3.125) % TUNNEL_SPACING;
    const sectorColors = [palette.cyan, 0x9c87ff, 0xffba69, 0x62ffd1];
    const sectorColor = sectorColors[(state.gate - 1) % sectorColors.length];
    groups.tunnel.children.forEach((rib, index) => {
      if (index % 3 !== 0) rib.children.forEach((layer) => layer.material.color.setHex(sectorColor));
    });
    const targetFov = state.boosting && !reducedMotion ? 74 : 64;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.07);
    camera.updateProjectionMatrix();
    groups.tunnel.children.forEach((rib, index) => {
      rib.position.z = TUNNEL_START_Z - index * TUNNEL_SPACING + tunnelOffset;
      const near = Math.max(0, Math.min(1, (rib.position.z + 40) / 40));
      rib.children.forEach((layer) => {
        layer.material.opacity = layer.userData.layer === "glow" ? 0.12 + near * 0.3 : 0.68 + near * 0.32;
      });
    });
    const flowOffset = (state.distance * 3.125) % 7;
    groups.flow.children.forEach((chevron, index) => {
      chevron.position.z = 2 - index * 7 + flowOffset;
      const depth = Math.max(0, Math.min(1, (chevron.position.z + 70) / 70));
      chevron.visible = chevron.position.z < 5.5;
      chevron.scale.setScalar(0.35 + depth * 0.65);
    });

    const activeIds = new Set();
    for (const object of state.objects) {
      if (object.resolved) continue;
      activeIds.add(object.id);
      const view = objectView(object);
      const depth = 1 - Math.max(0, Math.min(1, object.z / 118));
      view.position.set(object.lane * LANE_X * horizontalScale, object.kind === "pickup" ? 0.28 : 0.22, -object.z);
      if (object.kind === "blocker") {
        const scale = blockerScale(depth);
        view.scale.setScalar(scale);
        view.scale.x *= blockerWidthScale(horizontalScale);
      } else if (object.kind === "pickup") {
        const scale = 0.16 + Math.pow(depth, 1.5) * 0.7;
        view.scale.setScalar(scale);
        view.rotation.y = state.distance * 0.03;
      } else {
        view.scale.setScalar(0.42 + depth * 1.2);
      }
    }

    for (const [id, view] of objectPool) {
      if (activeIds.has(id)) continue;
      groups.objects.remove(view);
      disposeObject(view);
      objectPool.delete(id);
    }

    const targetX = state.lane * LANE_X * horizontalScale;
    groups.glider.position.x = THREE.MathUtils.lerp(groups.glider.position.x, targetX, reducedMotion ? 0.34 : 0.18);
    groups.glider.rotation.z = reducedMotion ? 0 : (groups.glider.position.x - targetX) * 0.08;
    groups.glider.position.y = 0.45 + (reducedMotion ? 0 : Math.sin(state.distance * 0.13) * 0.055);
    camera.position.y = 2.7 + (reducedMotion ? 0 : Math.sin(state.distance * 0.08) * 0.035);

    const collectAge = now - effects.collect;
    const hitAge = now - effects.hit;
    collectRing.position.copy(groups.glider.position);
    hitRing.position.copy(groups.glider.position);
    collectRing.material.opacity = collectAge < 260 ? 1 - collectAge / 260 : 0;
    hitRing.material.opacity = hitAge < 260 ? 1 - hitAge / 260 : 0;
    collectRing.scale.setScalar(1 + Math.max(0, collectAge) / 180);
    hitRing.scale.setScalar(1 + Math.max(0, hitAge) / 150);

    renderer.render(scene, camera);
  }

  function resize(width, height, pixelRatio = window.devicePixelRatio) {
    renderer.setPixelRatio(Math.min(2, pixelRatio || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    horizontalScale = responsiveHorizontalScale(camera.aspect);
    groups.lanes.scale.x = horizontalScale;
    groups.flow.scale.x = horizontalScale;
    groups.glider.scale.x = 0.7 * horizontalScale;
    camera.updateProjectionMatrix();
  }

  function setReducedMotion(value) { reducedMotion = Boolean(value); }

  function dispose() {
    canvas.removeEventListener("webglcontextlost", onContextLost, false);
    canvas.removeEventListener("webglcontextrestored", onContextRestored, false);
    for (const view of objectPool.values()) disposeObject(view);
    objectPool.clear();
    disposeObject(scene);
    renderer.dispose();
  }

  return { render, resize, setReducedMotion, dispose };
}
