import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "@/i18n";
import { CART_CREATE_MUTATION, CART_QUERY, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

afterEach(async () => {
  vi.unstubAllGlobals();
  useCartStore.getState().clearCart();
  await i18n.changeLanguage("pt");
});

describe("Shopify language context", () => {
  it.each([["pt-PT", "PT"], ["en", "EN"]])("requests %s products in %s", async (locale, language) => {
    await i18n.changeLanguage(locale);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: {} }) });
    vi.stubGlobal("fetch", fetcher);
    await storefrontApiRequest(PRODUCTS_QUERY, { first: 9 });
    const body = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(body.variables.language).toBe(language);
    expect(body.query).toContain("@inContext(language: $language, country: PT)");
  });

  it("contexts product and cart operations for Portugal", () => {
    for (const query of [PRODUCT_BY_HANDLE_QUERY, CART_QUERY, CART_CREATE_MUTATION]) {
      expect(query).toContain("$language: LanguageCode!");
      expect(query).toContain("@inContext(language: $language, country: PT)");
    }
  });

  it("recreates checkout in PT while retaining variant and quantity from an EN cart", async () => {
    await i18n.changeLanguage("pt");
    const variantId = "gid://shopify/ProductVariant/123";
    const cart = {
      id: "cart-new", totalQuantity: 2, checkoutUrl: "https://example.com/checkout",
      lines: { edges: [{ node: { id: "line-new", quantity: 2, merchandise: {
        id: variantId, title: "Preto / M", selectedOptions: [{ name: "Cor", value: "Preto" }],
        price: { amount: "25.00", currencyCode: "EUR" },
        product: { id: "product", title: "Capelinha", handle: "capelinha", images: { edges: [] } },
      } } }] },
    };
    const bodies: Array<{ query: string; variables: Record<string, any> }> = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      const body = JSON.parse(init.body);
      bodies.push(body);
      return { ok: true, json: async () => ({ data: body.query.includes("mutation cartCreate")
        ? { cartCreate: { cart, userErrors: [] } } : { cart } }) };
    }));
    useCartStore.setState({ cartId: "cart-old", language: "EN" });
    await useCartStore.getState().syncCart();
    const creation = bodies.find(body => body.query.includes("mutation cartCreate"));
    expect(creation?.variables.language).toBe("PT");
    expect(creation?.variables.input).toEqual({ buyerIdentity: { countryCode: "PT" }, lines: [{ quantity: 2, merchandiseId: variantId }] });
    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].selectedOptions).toEqual([{ name: "Cor", value: "Preto" }]);
    expect(state.checkoutUrl).toBe("https://example.com/checkout?channel=online_store");
    expect(state.language).toBe("PT");
  });
});