import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const FREE_SHIPPING_EUR = 60;
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "madeiraoriginals-cve6q.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN = "bbcc49de92200adcd5c43d7f6f847485";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  image?: ShopifyImage | null;
  sku?: string | null;
  quantityAvailable?: number | null;
}

export interface ShopifyMetafield {
  key: string;
  namespace: string;
  value: string;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  productType?: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
  metafields?: Array<ShopifyMetafield | null>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<{ data: T } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your Shopify store needs an active billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`Shopify HTTP error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    const msg = data.errors.map((e: { message: string }) => e.message).join(", ");
    // Tolerate partial-field errors (e.g. missing inventory scope) as long as data was returned.
    if (!data.data) {
      throw new Error(`Shopify error: ${msg}`);
    }
    console.warn(`Shopify partial error: ${msg}`);
  }
  return data;
}

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export function formatPrice(money: ShopifyMoney): string {
  const amount = parseFloat(money.amount);
  const symbol = money.currencyCode === "EUR" ? "€" : money.currencyCode === "USD" ? "$" : `${money.currencyCode} `;
  return `${symbol}${amount.toFixed(2)}`;
}

// Display-only remap for inch-based art-print sizes → EU format.
// Keeps original Shopify values untouched for checkout.
function normalizeQuotes(str: string): string {
  return str
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .trim();
}

const SIZE_LABEL_MAP: Record<string, string> = {
  '8.3" x 11.7"': "A4  ·  21 × 30 cm",
  '11.7" x 16.5"': "A3  ·  30 × 42 cm",
  '16.5" x 23.4"': "A2  ·  42 × 59 cm",
};

export function formatSizeLabel(value: string): string {
  return SIZE_LABEL_MAP[normalizeQuotes(value)] ?? value;
}

/**
 * Extract the GPSR (Product Safety & Compliance) block from Shopify description HTML.
 * Returns the cleaned description (without GPSR) and the GPSR HTML separately.
 */
export function extractGpsrBlock(html: string): { cleanedHtml: string; gpsrHtml: string } {
  if (!html) return { cleanedHtml: "", gpsrHtml: "" };

  // Look for <hr> followed by GPSR heading
  const hrMatch = html.match(/<hr\b[^>]*>/i);
  if (hrMatch && hrMatch.index !== undefined) {
    const afterHr = html.slice(hrMatch.index + hrMatch[0].length);
    if (/Product Safety.*Compliance.*GPSR/i.test(afterHr)) {
      return {
        cleanedHtml: html.slice(0, hrMatch.index).trim(),
        gpsrHtml: afterHr.trim(),
      };
    }
  }

  // Fallback: heading without <hr>
  const headingMatch = html.match(/<p>\s*<strong>\s*Product Safety [&amp;]*\s*Compliance\s*\(GPSR\)/i);
  if (headingMatch && headingMatch.index !== undefined) {
    return {
      cleanedHtml: html.slice(0, headingMatch.index).trim(),
      gpsrHtml: html.slice(headingMatch.index),
    };
  }

  return { cleanedHtml: html, gpsrHtml: "" };
}

// ---------- Queries ----------

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 25) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 25) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
            image { url altText }
            sku
            quantityAvailable
          }
        }
      }
      options { name values }
      metafields(identifiers: [
        { namespace: "custom", key: "story" },
        { namespace: "custom", key: "material" },
        { namespace: "custom", key: "fit" },
        { namespace: "custom", key: "gsm" },
        { namespace: "custom", key: "print_method" },
        { namespace: "custom", key: "size_guide" }
      ]) {
        key
        namespace
        value
      }
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;
