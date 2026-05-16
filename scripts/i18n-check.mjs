#!/usr/bin/env node
/**
 * i18n build-time check.
 *
 *   1. Every literal key passed to t("...") / i18n.t("...") in src/ must
 *      exist in BOTH src/i18n/locales/en.json and pt.json.
 *   2. JSX must not contain hardcoded user-facing English strings
 *      (text nodes or placeholder / aria-label / alt / title attributes).
 *
 * Escape hatches:
 *   - Append `// i18n-ignore` to a line to skip it.
 *   - Files in IGNORED_FILES / IGNORED_DIRS are skipped entirely.
 *   - ALLOWED_HARDCODED holds short tokens that are never translated
 *     (brand names, units, etc.).
 *
 * Exit code 1 on any violation.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const LOCALES = join(SRC, "i18n", "locales");

const IGNORED_DIRS = new Set([
  "src/components/ui",       // shadcn primitives
  "src/pages/admin",         // internal admin (EN-only by design)
  "src/integrations",
  "src/i18n",
  "src/test",
  "src/__tests__",
]);
const IGNORED_FILES = new Set([
  "src/lib/seoTemplates.ts", // SEO copy lives in templates
  "src/lib/seo.ts",
  "src/main.tsx",
  "src/vite-env.d.ts",
]);

// Tokens / proper nouns that may appear verbatim in JSX without translation.
const ALLOWED_HARDCODED = new Set([
  "Madeira Originals", "Madeira", "São Vicente", "Portugal", "Lovable",
  "Shopify", "Printify", "Stripe", "Google", "DTF", "UV DTF",
  "Corner Line", "HORECA",
  "A Nossa Ilha. A Nossa Marca.",
  "PT", "EN", "FAQ",
]);

// --------------------------------------------------------------------------
// Locale parity
// --------------------------------------------------------------------------
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flatten(v, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );

const loadLocale = (name) =>
  new Set(flatten(JSON.parse(readFileSync(join(LOCALES, name), "utf8"))));

const EN = loadLocale("en.json");
const PT = loadLocale("pt.json");

// --------------------------------------------------------------------------
// Walk src/
// --------------------------------------------------------------------------
const walk = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full).split(sep).join("/");
    if (IGNORED_DIRS.has(rel)) continue;
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(entry) && !IGNORED_FILES.has(rel)) out.push(full);
  }
  return out;
};

const files = walk(SRC);

const errors = []; // { file, line, msg }
const push = (file, line, msg) =>
  errors.push({ file: relative(ROOT, file).split(sep).join("/"), line, msg });

// --------------------------------------------------------------------------
// Per-file checks
// --------------------------------------------------------------------------
const T_CALL = /(?:^|[^a-zA-Z0-9_$.])(?:i18n\.)?t\(\s*(["'`])([^"'`]+?)\1/g;
const JSX_TEXT = />\s*([A-Z][^<>{}\n]{2,})\s*</g;
const ATTR = /\b(placeholder|aria-label|alt|title)\s*=\s*"([^"]+)"/g;

const looksLikeSentence = (s) => /[a-zA-Z]/.test(s) && /[A-Za-z]{3,}/.test(s);
const isAllowed = (s) => {
  const trimmed = s.trim();
  if (!trimmed) return true;
  if (ALLOWED_HARDCODED.has(trimmed)) return true;
  // Tokens like "·", arrows, numbers, currency
  if (!/[A-Za-z]/.test(trimmed)) return true;
  // Single short word (likely brand/code) under 3 chars
  if (trimmed.length < 3) return true;
  return false;
};

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  // 1) Validate literal t() keys
  let m;
  T_CALL.lastIndex = 0;
  while ((m = T_CALL.exec(src))) {
    const key = m[2];
    if (key.includes("{{") || key.includes("${")) continue; // dynamic key
    const upTo = src.slice(0, m.index);
    const lineNo = upTo.split("\n").length;
    if (lines[lineNo - 1]?.includes("i18n-ignore")) continue;
    if (!EN.has(key)) push(file, lineNo, `missing EN key: "${key}"`);
    if (!PT.has(key)) push(file, lineNo, `missing PT key: "${key}"`);
  }

  // 2) Hardcoded JSX text nodes & attributes
  lines.forEach((line, i) => {
    if (line.includes("i18n-ignore")) return;
    const lineNo = i + 1;

    let jm;
    JSX_TEXT.lastIndex = 0;
    while ((jm = JSX_TEXT.exec(line))) {
      const text = jm[1].trim();
      if (isAllowed(text)) continue;
      if (!looksLikeSentence(text)) continue;
      push(file, lineNo, `hardcoded JSX text: "${text}"`);
    }

    let am;
    ATTR.lastIndex = 0;
    while ((am = ATTR.exec(line))) {
      const [, attr, val] = am;
      if (isAllowed(val)) continue;
      if (!/^[A-Z]/.test(val.trim())) continue;
      if (!looksLikeSentence(val)) continue;
      push(file, lineNo, `hardcoded ${attr}: "${val}"`);
    }
  });
}

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------
if (errors.length === 0) {
  console.log(`✓ i18n-check: ${files.length} files scanned, ${EN.size} EN / ${PT.size} PT keys, no issues.`);
  process.exit(0);
}

const byFile = new Map();
for (const e of errors) {
  if (!byFile.has(e.file)) byFile.set(e.file, []);
  byFile.get(e.file).push(e);
}

console.error(`\n✗ i18n-check failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):\n`);
for (const [file, list] of byFile) {
  console.error(`  ${file}`);
  for (const e of list) console.error(`    L${e.line}  ${e.msg}`);
}
console.error(`\nFix the keys above, or append "// i18n-ignore" to intentional lines.`);
process.exit(1);
