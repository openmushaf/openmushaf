#!/usr/bin/env node
/**
 * Build the bundled Qur'an text that public/index.html reads instead of
 * calling api.alquran.cloud at read time.
 *
 * Writes, relative to the repo root:
 *   public/data/quran-uthmani/juz-01.json … juz-30.json
 *   public/data/surahs.json
 *
 * Output is deterministic: keys are sorted recursively, JSON is minified, and
 * nothing timestamped or environment-dependent is written. Re-running against
 * the same upstream data produces byte-identical files.
 *
 * No dependencies. Node 18+ (global fetch).
 *
 *   node tools/build-quran-bundle.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://api.alquran.cloud/v1';
const EDITION = 'quran-uthmani';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'data');

const EXPECTED_AYAHS = 6236;
const EXPECTED_SURAHS = 114;
const EXPECTED_JUZ = 30;

// Fields carried per ayah. Deliberately excludes `surah`: the API embeds the
// whole surah object on every ayah, which is 6,236 copies of the same 114
// records. index.html falls back to surahOf(), which resolves from surahs.json.
const AYAH_FIELDS = ['number', 'text', 'page', 'numberInSurah', 'juz', 'hizbQuarter', 'sajda'];

/** Stable stringify: object keys sorted recursively, minified. */
function stable(v) {
  if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
  if (v && typeof v === 'object') {
    return '{' + Object.keys(v).sort()
      .map(k => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}';
  }
  return JSON.stringify(v);
}

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  const j = await r.json();
  if (j.code !== 200) throw new Error(`bad response for ${url}: ${j.status}`);
  return j.data;
}

function die(msg) {
  console.error('REFUSING TO WRITE: ' + msg);
  process.exit(1);
}

const quran = await getJSON(`${API}/quran/${EDITION}`);
const surahs = await getJSON(`${API}/surah`);

// ── guards: refuse to write anything unless the source is complete ──────
if (!Array.isArray(quran.surahs)) die('quran.surahs is not an array');
if (quran.surahs.length !== EXPECTED_SURAHS) {
  die(`expected ${EXPECTED_SURAHS} surahs in the text, got ${quran.surahs.length}`);
}
if (surahs.length !== EXPECTED_SURAHS) {
  die(`expected ${EXPECTED_SURAHS} surahs in the index, got ${surahs.length}`);
}
const total = quran.surahs.reduce((n, s) => n + s.ayahs.length, 0);
if (total !== EXPECTED_AYAHS) {
  die(`expected ${EXPECTED_AYAHS} ayahs, got ${total}`);
}

// ── group by juz, preserving upstream order ─────────────────────────────
const byJuz = new Map();
for (const s of quran.surahs) {
  for (const a of s.ayahs) {
    const rec = {};
    for (const f of AYAH_FIELDS) rec[f] = a[f];
    if (!byJuz.has(a.juz)) byJuz.set(a.juz, []);
    byJuz.get(a.juz).push(rec);
  }
}
if (byJuz.size !== EXPECTED_JUZ) die(`expected ${EXPECTED_JUZ} juz, got ${byJuz.size}`);

await mkdir(join(OUT, EDITION), { recursive: true });

let written = 0, bytes = 0;
for (const j of [...byJuz.keys()].sort((a, b) => a - b)) {
  const ayahs = byJuz.get(j).sort((a, b) => a.number - b.number);
  const body = stable(ayahs);
  const name = `juz-${String(j).padStart(2, '0')}.json`;
  await writeFile(join(OUT, EDITION, name), body);
  written++; bytes += Buffer.byteLength(body);
  console.log(`${name}  ${ayahs.length} ayahs  ${Buffer.byteLength(body)} B`);
}

const idx = stable(surahs);
await writeFile(join(OUT, 'surahs.json'), idx);
console.log(`surahs.json  ${surahs.length} surahs  ${Buffer.byteLength(idx)} B`);

console.log(`\nwrote ${written} juz files + surahs.json`);
console.log(`total ${bytes + Buffer.byteLength(idx)} B plain`);
