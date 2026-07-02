import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOREFRONT_URL =
  "https://madeiraoriginals-cve6q.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "bbcc49de92200adcd5c43d7f6f847485";

const QUERY = /* GraphQL */ `
  query SearchProducts($query: String, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
          description
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          onlineStoreUrl
        }
      }
    }
  }
`;

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search Madeira Originals products (t-shirts, hoodies, prints, accessories) from the live Shopify catalog. Returns title, handle, price, image, and product URL.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe(
        "Shopify search query, e.g. 'levada', 'tag:streetwear', 'product_type:hoodie'. Leave empty to list latest products.",
      ),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 12)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }) => {
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: QUERY, variables: { query: query ?? "", first: limit ?? 12 } }),
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Shopify error ${res.status}` }], isError: true };
    }
    const json = await res.json();
    const products = (json.data?.products?.edges ?? []).map((e: any) => ({
      title: e.node.title,
      handle: e.node.handle,
      productType: e.node.productType,
      tags: e.node.tags,
      price: `${e.node.priceRange.minVariantPrice.amount} ${e.node.priceRange.minVariantPrice.currencyCode}`,
      image: e.node.images.edges[0]?.node?.url ?? null,
      url: `https://madeiraoriginals.pt/products/${e.node.handle}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
      structuredContent: { products },
    };
  },
});
