import { afterEach, describe, expect, it } from "vitest";
import i18n from "@/i18n";
import { formatPrice } from "@/lib/shopify";
import { formatEUR } from "@/lib/catalog";

afterEach(async () => { await i18n.changeLanguage("pt"); });

describe("active-locale prices", () => {
  it("formats EUR 25 with Portuguese decimals and trailing currency", async () => {
    await i18n.changeLanguage("pt");
    expect(formatPrice({ amount: "25.00", currencyCode: "EUR" })).toBe("25,00\u00a0€");
  });
  it("formats EUR 25 with English decimals and leading currency", async () => {
    await i18n.changeLanguage("en");
    expect(formatPrice({ amount: "25.00", currencyCode: "EUR" })).toBe("€25.00");
  });
  it("updates catalogue prices when the active language changes", async () => {
    await i18n.changeLanguage("pt");
    expect(formatEUR(25)).toBe("25,00\u00a0€");
    await i18n.changeLanguage("en");
    expect(formatEUR(25)).toBe("€25.00");
  });
});