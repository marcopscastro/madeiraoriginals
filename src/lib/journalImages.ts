/**
 * For static /journal/*.jpg covers we ship pre-compressed WebP variants
 * (-600.webp, -1000.webp). This helper rewrites the original URL into
 * srcset/src pointing at those variants. Falls back to the original for
 * any URL we don't recognise (e.g. remote covers).
 */
const JOURNAL_WEBP_BASES = new Set([
  "/journal/culture-hero",
  "/journal/journal-streetwear",
  "/journal/journal-embroidery",
  "/journal/journal-funchal",
  "/journal/journal-poncha",
]);

export function journalCoverProps(url: string | null | undefined) {
  if (!url) return null;
  const m = url.match(/^(\/journal\/[a-z0-9-]+)\.(jpg|jpeg|png)$/i);
  if (!m || !JOURNAL_WEBP_BASES.has(m[1])) {
    return { src: url, srcSet: undefined as string | undefined };
  }
  const base = m[1];
  return {
    src: `${base}-1000.webp`,
    srcSet: `${base}-600.webp 600w, ${base}-1000.webp 1000w`,
  };
}
