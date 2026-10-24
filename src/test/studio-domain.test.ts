import { describe, expect, it } from "vitest";
import { SITE_NAME, SITE_URL, ORG_JSONLD, LOCAL_BUSINESS_JSONLD } from "@/lib/seo";
import { readFileSync } from "node:fs";

describe("apparel site identity", () => {
  it("uses the apparel domain for this site's canonical and organization URLs", () => {
    expect([SITE_URL, ORG_JSONLD.url, LOCAL_BUSINESS_JSONLD.url]).toEqual([
      "https://madeiraoriginals.pt", "https://madeiraoriginals.pt", "https://madeiraoriginals.pt",
    ]);
  });
  it("uses only the apparel brand as the shared site identity", () => {
    expect([SITE_NAME, ORG_JSONLD.name, LOCAL_BUSINESS_JSONLD.name]).toEqual([
      "Madeira Originals", "Madeira Originals", "Madeira Originals",
    ]);
  });
  it.each(["/studio", "/design", "/apparel-printing", "/vinyl-signage", "/contact"])(
    "excludes moved service page %s from both sitemap locale trees",
    (path) => {
      const sitemap = readFileSync("public/sitemap.xml", "utf8");
      expect(sitemap).not.toContain(`<loc>${SITE_URL}${path}</loc>`);
      expect(sitemap).not.toContain(`<loc>${SITE_URL}/en${path}</loc>`);
      expect(sitemap).toContain(`<loc>${SITE_URL}/shop</loc>`);
    },
  );
});