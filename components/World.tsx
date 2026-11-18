'use client';

import { useState } from 'react';
import { Layers3, RotateCcw, Sun, Moon } from 'lucide-react';
import { useSiteSettings } from './LocaleThemeProvider';

type Color = [string, string, string];
type Block = {
  x: number;
  y: number;
  z: number;
  w?: number;
  d?: number;
  h?: number;
  color: Color;
  group?: string;
};
const colors = {
  ground: ['#ece2c8', '#c4b596', '#d7c9ae'],
  grass: ['#9faa76', '#677a4d', '#81915d'],
  orange: ['#f79858', '#ce5734', '#e57542'],
  wood: ['#d4a274', '#875f45', '#af7d56'],
  leaf: ['#b4c888', '#6d8a53', '#8faa65'],
  leafLight: ['#c1d59b', '#7b975e', '#a0b77b'],
  dark: ['#414b4b', '#222d30', '#303d3f'],
  cream: ['#fff6e3', '#bdb6a3', '#e2d8c3'],
  yellow: ['#fbd666', '#d1a039', '#ebba4e'],
  blue: ['#b5cbd2', '#6c909c', '#8aafbb'],
  skin: ['#efc7a0', '#bd8769', '#dba984'],
  hoodie: ['#ef7a49', '#b9472f', '#d95b38'],
  glasses: ['#243034', '#11191c', '#1a2427'],
} satisfies Record<string, Color>;
const project = (x: number, y: number, z: number) => [
  423 + (x - y) * 30,
  239 + (x + y) * 15 - z * 30,
];
const pts = (points: number[][]) => points.map((p) => p.join(',')).join(' ');

function Cube({ block, explode }: { block: Block; explode: boolean }) {
  const { x, y, z, w = 1, d = 1, h = 1, color, group } = block;
  const lift = explode && group ? (group === 'tree' ? 2.3 : group === 'desk' ? 1.6 : 1) : 0;
  const bottom = z + lift;
  const a = project(x, y, bottom + h),
    b = project(x + w, y, bottom + h);
  const c = project(x + w, y + d, bottom + h),
    e = project(x, y + d, bottom + h);
  return (
    <g className={`voxel-block${group ? ` voxel-${group}` : ''}`}>
      <polygon
        points={pts([e, c, project(x + w, y + d, bottom), project(x, y + d, bottom)])}
        fill={color[1]}
      />
      <polygon
        points={pts([b, c, project(x + w, y + d, bottom), project(x + w, y, bottom)])}
        fill={color[2]}
      />
      <polygon points={pts([a, b, c, e])} fill={color[0]} />
    </g>
  );
}

function createWorld(): Block[] {
  const blocks: Block[] = [];
  for (let x = 0; x < 9; x++)
    for (let y = 0; y < 9; y++) {
      if ((x === 0 && y < 2) || (y === 0 && x > 6) || (x === 8 && y > 6)) continue;
      const grassy = x < 3 || y < 2 || (x > 6 && y < 5);
      blocks.push({ x, y, z: -0.8, h: 0.8, color: grassy ? colors.grass : colors.ground });
    }
  const put = (b: Block) => blocks.push(b);
  // Architectural plinth and illuminated workstation.
  put({ x: 3.1, y: 2.3, z: 0, w: 3.8, d: 3.5, h: 0.22, color: colors.cream });
  for (const x of [3.5, 6.1])
    for (const y of [2.8, 4.2])
      put({ x, y, z: 0.2, w: 0.2, d: 0.2, h: 1.6, color: colors.wood, group: 'desk' });
  put({ x: 3.2, y: 2.6, z: 1.8, w: 3.5, d: 2, h: 0.2, color: colors.wood, group: 'desk' });
  put({ x: 4.45, y: 2.8, z: 2, w: 0.6, d: 0.6, h: 0.12, color: colors.dark, group: 'desk' });
  put({ x: 4.7, y: 2.95, z: 2.1, w: 0.15, d: 0.15, h: 0.5, color: colors.dark, group: 'desk' });
  put({ x: 3.8, y: 2.9, z: 2.55, w: 2.2, d: 0.18, h: 1.45, color: colors.dark, group: 'desk' });
  put({
    x: 3.95,
    y: 3.09,
    z: 2.72,
    w: 1.88,
    d: 0.025,
    h: 1.12,
    color: ['#a7d9bf', '#9fcfb3', '#b3e5c9'],
    group: 'desk',
  });
  for (let i = 0; i < 3; i++)
    put({
      x: 4.15,
      y: 3.12,
      z: 3.5 - i * 0.25,
      w: i === 1 ? 1.1 : 0.7,
      d: 0.035,
      h: 0.07,
      color: colors.dark,
      group: 'desk',
    });
  put({ x: 4.2, y: 3.8, z: 2, w: 1.5, d: 0.5, h: 0.09, color: colors.cream, group: 'desk' });
  put({ x: 6, y: 3.5, z: 2, w: 0.35, d: 0.35, h: 0.5, color: colors.orange, group: 'desk' });
  // Tree made of offset clusters.
  put({ x: 1.25, y: 2.8, z: 0, w: 0.55, d: 0.55, h: 3.2, color: colors.wood, group: 'tree' });
  put({ x: 0.45, y: 2.0, z: 2.6, w: 2.1, d: 2.05, h: 1.5, color: colors.leaf, group: 'tree' });
  put({ x: 0.8, y: 2.35, z: 4.1, w: 1.4, d: 1.35, h: 0.9, color: colors.leafLight, group: 'tree' });
  put({ x: -0.05, y: 2.7, z: 3.0, w: 1, d: 1.2, h: 0.85, color: colors.leafLight, group: 'tree' });
  // Creator avatar: a compact, readable block character with David's hair and glasses.
  for (const x of [4.72, 5.22]) {
    put({ x, y: 5.38, z: 0.12, w: 0.34, d: 0.43, h: 0.92, color: colors.dark, group: 'creator' });
    put({
      x: x - 0.04,
      y: 5.65,
      z: 0.05,
      w: 0.44,
      d: 0.42,
      h: 0.18,
      color: colors.glasses,
      group: 'creator',
    });
  }
  put({
    x: 4.5,
    y: 5.12,
    z: 1.02,
    w: 1.22,
    d: 0.72,
    h: 1.08,
    color: colors.hoodie,
    group: 'creator',
  });
  put({
    x: 4.99,
    y: 5.83,
    z: 1.17,
    w: 0.11,
    d: 0.05,
    h: 0.76,
    color: colors.cream,
    group: 'creator',
  });
  put({
    x: 4.23,
    y: 5.08,
    z: 1.08,
    w: 0.29,
    d: 0.5,
    h: 0.82,
    color: colors.hoodie,
    group: 'creator',
  });
  put({
    x: 5.7,
    y: 5.08,
    z: 1.08,
    w: 0.29,
    d: 0.5,
    h: 0.82,
    color: colors.hoodie,
    group: 'creator',
  });
  put({
    x: 4.92,
    y: 5.3,
    z: 2.07,
    w: 0.38,
    d: 0.38,
    h: 0.24,
    color: colors.skin,
    group: 'creator',
  });
  put({
    x: 4.65,
    y: 5.12,
    z: 2.26,
    w: 0.92,
    d: 0.74,
    h: 0.83,
    color: colors.skin,
    group: 'creator',
  });
  // Hair volume and a loose fringe keep the head from reading as a plain cube.
  put({
    x: 4.58,
    y: 5.04,
    z: 3.04,
    w: 1.08,
    d: 0.84,
    h: 0.3,
    color: colors.dark,
    group: 'creator',
  });
  put({
    x: 4.56,
    y: 5.48,
    z: 2.79,
    w: 0.22,
    d: 0.4,
    h: 0.33,
    color: colors.dark,
    group: 'creator',
  });
  put({
    x: 5.43,
    y: 5.42,
    z: 2.86,
    w: 0.2,
    d: 0.43,
    h: 0.28,
    color: colors.dark,
    group: 'creator',
  });
  // Glasses, bridge, eyes and mouth sit just in front of the visible face plane.
  for (const x of [4.75, 5.2]) {
    put({
      x,
      y: 5.86,
      z: 2.66,
      w: 0.27,
      d: 0.055,
      h: 0.2,
      color: colors.glasses,
      group: 'creator',
    });
    put({
      x: x + 0.08,
      y: 5.92,
      z: 2.71,
      w: 0.1,
      d: 0.035,
      h: 0.08,
      color: colors.blue,
      group: 'creator',
    });
  }
  put({
    x: 5.01,
    y: 5.9,
    z: 2.73,
    w: 0.2,
    d: 0.05,
    h: 0.055,
    color: colors.glasses,
    group: 'creator',
  });
  put({
    x: 4.97,
    y: 5.91,
    z: 2.47,
    w: 0.27,
    d: 0.045,
    h: 0.055,
    color: colors.orange,
    group: 'creator',
  });
  // Garden, stepping stones and building materials.
  for (const [x, y] of [
    [1, 5.8],
    [1.9, 6.5],
    [7.2, 1.5],
  ]) {
    put({ x, y, z: 0, w: 0.65, d: 0.65, h: 0.65, color: colors.orange, group: 'garden' });
    put({
      x: x + 0.13,
      y: y + 0.13,
      z: 0.65,
      w: 0.4,
      d: 0.4,
      h: 0.6,
      color: colors.leaf,
      group: 'garden',
    });
  }
  for (let i = 0; i < 3; i++)
    put({
      x: 5.3 + i * 0.1,
      y: 6.5 + i * 0.75,
      z: 0.02,
      w: 1.3,
      d: 0.5,
      h: 0.12,
      color: colors.cream,
    });
  put({ x: 7.2, y: 4.4, z: 0, w: 1, d: 1, h: 1, color: colors.orange, group: 'blocks' });
  put({ x: 7.2, y: 4.4, z: 1, w: 1, d: 1, h: 1, color: colors.yellow, group: 'blocks' });
  put({ x: 7.2, y: 5.5, z: 0, w: 1, d: 1, h: 1, color: colors.blue, group: 'blocks' });
  return blocks.sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);
}
const blocks = createWorld();

export default function World() {
  const [exploded, setExploded] = useState(false);
  const [night, setNight] = useState(false);
  const { locale } = useSiteSettings();
  return (
    <div className={`world ${night ? 'world-night' : ''} ${exploded ? 'world-exploded' : ''}`}>
      <div className="world-coordinate">
        <span className="status-dot" /> {locale === 'es' ? 'MI PEQUEÑO UNIVERSO' : 'MY LITTLE UNIVERSE'} <span>01 / ∞</span>
      </div>
      <svg
        viewBox="0 0 850 650"
        role="img"
        aria-label={locale === 'es' ? 'Taller isométrico hecho de bloques, con un árbol, un escritorio y un personaje creador' : 'Isometric block workshop with a tree, desk and creator character'}
        className="world-art"
      >
        <defs>
          <pattern id="world-grid" width="60" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 15 30 0 60 15 30 30Z" fill="none" stroke="currentColor" strokeWidth=".65" />
          </pattern>
          <filter id="world-shadow">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>
        <ellipse
          cx="425"
          cy="459"
          rx="237"
          ry="81"
          fill="#3c4230"
          opacity=".12"
          filter="url(#world-shadow)"
        />
        <path d="M43 375 425 184 805 375 425 566Z" fill="url(#world-grid)" opacity=".35" />
        <g className="world-island">
          {blocks.map((block, i) => (
            <Cube key={i} block={block} explode={exploded} />
          ))}
        </g>
        <g className="floating-cube">
          <Cube
            block={{ x: 6.6, y: 0.5, z: 4.8, w: 0.9, d: 0.9, h: 0.9, color: colors.orange }}
            explode={false}
          />
        </g>
        <g className="floating-cube second">
          <Cube
            block={{ x: 0.1, y: 6.5, z: 2.9, w: 0.65, d: 0.65, h: 0.65, color: colors.yellow }}
            explode={false}
          />
        </g>
        <path
          d="M668 268v14m-7-7h14M215 201v10m-5-5h10"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".6"
        />
      </svg>
      <div className="world-tag">
        <span className="tag-brackets">&lt;/&gt;</span> {locale === 'es' ? 'ideas en movimiento' : 'ideas in motion'}{' '}
        <span className="tag-dot" />
      </div>
      <div className="world-caption">
        <span>{locale === 'es' ? 'UN MUNDO. MUCHAS POSIBILIDADES.' : 'ONE WORLD. MANY POSSIBILITIES.'}</span>
        <span>X: 024 · Y: 008</span>
      </div>
      <div className="world-controls" aria-label={locale === 'es' ? 'Controles del mundo' : 'World controls'}>
        <button onClick={() => setExploded(!exploded)} aria-pressed={exploded}>
          <Layers3 size={15} />
          {exploded ? (locale === 'es' ? 'Volver a construir' : 'Rebuild it') : locale === 'es' ? 'Ver las piezas' : 'See the pieces'}
        </button>
        <span />
        <button
          aria-label={night ? (locale === 'es' ? 'Activar luz de día' : 'Turn on daylight') : locale === 'es' ? 'Activar luz nocturna' : 'Turn on night light'}
          aria-pressed={night}
          onClick={() => setNight(!night)}
        >
          {night ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          aria-label={locale === 'es' ? 'Restablecer el mundo' : 'Reset the world'}
          onClick={() => {
            setExploded(false);
            setNight(false);
          }}
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
