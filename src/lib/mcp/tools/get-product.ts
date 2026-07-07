import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOREFRONT_URL =
  "https://madeiraoriginals-cve6q.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "bbcc49de92200adcd5c43d7f6f847485";

const QUERY = /* GraphQL */ `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

export default defineTool({
  name: "get_product",
  title: "Get product",
  description: "Fetch a single Madeira Originals product by its handle, including full description, variants, and images.",
  inputSchema: {
    handle: z.string().min(1).describe("Product handle, e.g. 'levada-walks-madeira-island-t-shirt'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ handle }) => {
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: QUERY, variables: { handle } }),
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Shopify error ${res.status}` }], isError: true };
    }
    const json = await res.json();
    const p = json.data?.product;
    if (!p) {
      return { content: [{ type: "text", text: `Product not found: ${handle}` }], isError: true };
    }
    const product = {
      title: p.title,
      handle: p.handle,
      description: p.description,
      productType: p.productType,
      tags: p.tags,
      priceFrom: `${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`,
      images: p.images.edges.map((e: any) => e.node.url),
      variants: p.variants.edges.map((e: any) => ({
        title: e.node.title,
        available: e.node.availableForSale,
        price: `${e.node.price.amount} ${e.node.price.currencyCode}`,
        options: e.node.selectedOptions,
      })),
      url: `https://madeiraoriginals.pt/product/${p.handle}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});
