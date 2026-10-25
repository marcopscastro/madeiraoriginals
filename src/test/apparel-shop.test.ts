import { describe, expect, it } from "vitest";
import { localizePath } from "@/lib/locale";
import { isStorefrontProduct, isSaoVicenteTee, SAO_VICENTE_DESIGNS } from "@/lib/storefrontCatalog";
import { COMMERCE_POLICY, hasWithdrawalRight } from "@/lib/commercePolicy";
import { STUDIO_REDIRECTS } from "@/lib/studioRedirects";

describe("apparel shop rules", () => {
  it("includes all nine named São Vicente designs", () => {
    expect(SAO_VICENTE_DESIGNS).toHaveLength(9);
    for (const handle of ["levada-walks", "vale-de-sao-vicente", "estrada-do-norte", "vale-imperioso", "capelinha-do-calhau", "capelinha-de-fatima", "miradouro-de-sao-cristovao", "faja-da-areia", "vila-de-sao-vicente"]) {
      expect(isSaoVicenteTee({ handle: `${handle}-madeira`, productType: "T-Shirt" })).toBe(true);
    }
    expect(isSaoVicenteTee({ handle: "unrelated-t-shirt" })).toBe(false);
  });
  it("hides posters", () => expect(isStorefrontProduct({ handle: "madeira-poster" })).toBe(false));
  it("hides Printify products", () => expect(isStorefrontProduct({ handle: "madeira-tee", vendor: "Printify" })).toBe(false));
  it("keeps standard printed-to-order designs returnable", () => expect(hasWithdrawalRight(false)).toBe(true));
  it("keeps non-personalised sale items within the 14-day withdrawal right", () => {
    expect(hasWithdrawalRight(false)).toBe(true);
    expect(COMMERCE_POLICY.withdrawalDays).toBe(14);
  });
  it("excludes customer-personalised designs from withdrawal", () => expect(hasWithdrawalRight(true)).toBe(false));
  it("retains the 14-day withdrawal period", () => expect(COMMERCE_POLICY.withdrawalDays).toBe(14));
  it("retains the 25-unit wholesale minimum", () => expect(COMMERCE_POLICY.wholesaleMinimum).toBe(25));
  it("retains Madeira delivery including production", () => expect(COMMERCE_POLICY.deliveryWorkingDays.madeira).toEqual([3, 3]));
  it("retains mainland delivery including production", () => expect(COMMERCE_POLICY.deliveryWorkingDays.mainland).toEqual([5, 7]));
  it("retains worldwide delivery including production", () => expect(COMMERCE_POLICY.deliveryWorkingDays.worldwide).toEqual([7, 14]));
  it("maps privacy to the requested locale URLs", () => {
    expect(localizePath("/privacidade", "en")).toBe("/en/privacy");
    expect(localizePath("/en/privacy", "pt")).toBe("/privacidade");
  });
  it("maps terms without losing locale when switching", () => {
    expect(localizePath("/termos", "en")).toBe("/en/terms");
    expect(localizePath("/en/terms", "pt")).toBe("/termos");
  });
  it.each([
    ["/studio", "https://madeirastudio.pt/servicos"],
    ["/design", "https://madeirastudio.pt/design"],
    ["/apparel-printing", "https://madeirastudio.pt/vestuario-com-logotipo"],
    ["/vinyl-signage", "https://madeirastudio.pt/sinaletica"],
  ])("redirects %s to the specified studio destination", (path, destination) => expect(STUDIO_REDIRECTS[path]).toBe(destination));
});