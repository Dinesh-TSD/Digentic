// Temporary codemod: convert dashboard files to CSS-variable theming + larger type scale
const fs = require('fs');
const path = require('path');

const dirs = ['app/admin', 'app/dashboard', 'components/admin', 'components/user'];
const sharedFiles = [
  'components/shared/Topbar.tsx',
  'components/shared/StatCard.tsx',
  'components/shared/ProgressBar.tsx',
  'components/shared/TagPill.tsx',
  'components/shared/PageHeader.tsx',
  'components/shared/FilterChips.tsx',
  'components/shared/DashboardShell.tsx',
];

function walk(p, acc) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const full = path.join(p, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.tsx')) acc.push(full);
  }
  return acc;
}

const files = [];
for (const d of dirs) if (fs.existsSync(d)) walk(d, files);
for (const f of sharedFiles) if (fs.existsSync(f)) files.push(f);

// --- Color map (hex -> CSS var). Applied as string OR bare var() for class contexts. ---
const COLOR_MAP = {
  '#111111': 'var(--dt-surface)',
  '#0d0d0d': 'var(--dt-surface)',
  '#151515': 'var(--dt-surface)',
  '#161616': 'var(--dt-surface)',
  '#1f1f1f': 'var(--dt-border)',
  '#1a1a1a': 'var(--dt-hover)',
  '#f1f5f9': 'var(--dt-text)',
  '#e2e8f0': 'var(--dt-text)',
  '#cbd5e1': 'var(--dt-muted)',
  '#94a3b8': 'var(--dt-muted)',
  '#64748b': 'var(--dt-muted)',
};

// --- Font-size scale-up ---
const SIZE_MAP = { 9: 11, 10: 12, 11: 13, 12: 14, 13: 15, 14: 16, 16: 18, 18: 20, 20: 22, 22: 24, 24: 26, 28: 30 };

let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const orig = src;

  // 1) '#hex' quoted occurrences -> 'var(...)'
  for (const [hex, v] of Object.entries(COLOR_MAP)) {
    src = src.split(`'${hex}'`).join(`'${v}'`);
    src = src.split(`"${hex}"`).join(`"${v}"`);
    // bare inside gradient strings: ", #111111)" handled below via general bare replace for hex in strings
  }
  // bare hex (unquoted, e.g. inside 'linear-gradient(... #1a1a1a ...)' already quoted string, or class text-[#111111])
  for (const [hex, v] of Object.entries(COLOR_MAP)) {
    src = src.split(`[#${hex.slice(1)}]`).join(`[${v}]`); // bg-[#111111] -> bg-[var(--dt-surface)]
  }
  // any remaining bare hex occurrences inside already-quoted strings (gradients): replace hex with var
  for (const [hex, v] of Object.entries(COLOR_MAP)) {
    src = src.split(hex).join(v);
  }

  // 2) background: '#0a0a0a' / bg-[#0a0a0a] -> var(--dt-bg) but NOT color: '#0a0a0a'
  src = src.split(`background: '#0a0a0a'`).join(`background: 'var(--dt-bg)'`);
  src = src.split(`bg-[#0a0a0a]`).join(`bg-[var(--dt-bg)]`);

  // 3) orange-tinted bg rgba(255,140,0,0.x) kept as-is (brand color, works on both themes)

  // 4) text-white on solid orange backgrounds stays white — no change needed.
  //    (Only 3 occurrences, all on orange buttons/badges.)

  // 5) Font-size scale up: text-[Npx] classes
  src = src.replace(/text-\[(\d+)px\]/g, (m, n) => {
    const up = SIZE_MAP[Number(n)];
    return up ? `text-[${up}px]` : m;
  });

  if (src !== orig) {
    fs.writeFileSync(file, src, 'utf8');
    changed++;
    console.log('updated:', file);
  }
}
console.log(`\n${changed} files updated.`);
