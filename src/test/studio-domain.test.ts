import { describe, expect, it } from "vitest";
import { SITE_NAME, SITE_URL, ORG_JSONLD, LOCAL_BUSINESS_JSONLD } from "@/lib/seo";

describe("studio identity", () => {
  it("uses the apparel domain for this site's canonical and organization URLs", () => {
    expect([SITE_URL, ORG_JSONLD.url, LOCAL_BUSINESS_JSONLD.url]).toEqual([
      "https://madeiraoriginals.pt", "https://madeiraoriginals.pt", "https://madeiraoriginals.pt",
    ]);
  });
  it("names the studio separately from its apparel label", () => {
    expect([SITE_NAME, ORG_JSONLD.name, LOCAL_BUSINESS_JSONLD.name]).toEqual([
      "Madeira Studio", "Madeira Studio", "Madeira Studio",
    ]);
  });
});