// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml including all Shopify product URLs.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://madeiraoriginals.pt";

// Mirror src/lib/shopify.ts — keep in sync.
const SHOPIFY_STORE_PERMANENT_DOMAIN = "madeiraoriginals-cve6q.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "bbcc49de92200adcd5c43d7f6f847485";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/shop", changefreq: "weekly", priority: "0.9" },
  { path: "/madeira-t-shirts", changefreq: "weekly", priority: "0.8" },
  { path: "/madeira-hoodies", changefreq: "weekly", priority: "0.8" },
  { path: "/madeira-accessories", changefreq: "weekly", priority: "0.8" },
  { path: "/madeira-stickers", changefreq: "weekly", priority: "0.7" },
  { path: "/madeira-streetwear", changefreq: "weekly", priority: "0.8" },
  { path: "/madeira-gifts", changefreq: "monthly", priority: "0.7" },
  { path: "/studio", changefreq: "monthly", priority: "0.8" },
  { path: "/wholesale", changefreq: "monthly", priority: "0.7" },
  { path: "/portugal-streetwear", changefreq: "monthly", priority: "0.7" },
  { path: "/madeira-souvenirs", changefreq: "monthly", priority: "0.7" },
  { path: "/culture", changefreq: "monthly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/journal", changefreq: "weekly", priority: "0.8" },
  // Known journal posts (hand-curated; expand here as new ones publish)
  { path: "/journal/best-souvenirs-from-madeira", changefreq: "monthly", priority: "0.7" },
  { path: "/journal/modern-madeira-streetwear", changefreq: "monthly", priority: "0.7" },
  { path: "/journal/what-makes-madeira-culture-unique", changefreq: "monthly", priority: "0.7" },
];

type ProductNode = { handle: string; updatedAt: string };

async function fetchAllProductHandles(): Promise<ProductNode[]> {
  const all: ProductNode[] = [];
  let cursor: string | null = null;
  const PAGE_SIZE = 100;

  const query = `
    query ProductHandles($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          cursor
          node { handle updatedAt }
        }
        pageInfo { hasNextPage }
      }
    }
  `;

  // Paginate; cap at 10 pages (1000 products) as a safety belt.
  for (let i = 0; i < 10; i++) {
    const res: Response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { first: PAGE_SIZE, after: cursor } }),
    });
    if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
    const json: any = await res.json();
    if (json.errors) throw new Error(`Shopify errors: ${JSON.stringify(json.errors)}`);

    const edges: Array<{ cursor: string; node: ProductNode }> = json.data?.products?.edges ?? [];
    edges.forEach((e) => all.push(e.node));
    const hasNext: boolean = json.data?.products?.pageInfo?.hasNextPage ?? false;
    if (!hasNext || edges.length === 0) break;
    cursor = edges[edges.length - 1].cursor;
  }
  return all;
}

function isoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function buildSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

async function main() {
  let productEntries: SitemapEntry[] = [];
  try {
    const products = await fetchAllProductHandles();
    productEntries = products.map((p) => ({
      path: `/product/${p.handle}`,
      lastmod: isoDate(p.updatedAt),
      changefreq: "weekly",
      priority: "0.7",
    }));
    console.log(`sitemap: fetched ${products.length} Shopify products`);
  } catch (err) {
    console.warn(`sitemap: skipping product URLs — Shopify fetch failed (${(err as Error).message})`);
  }

  const all = [...staticEntries, ...productEntries];
  writeFileSync(resolve("public/sitemap.xml"), buildSitemap(all));
  console.log(`sitemap.xml written (${all.length} entries)`);
}

main().catch((err) => {
  console.error("sitemap generation failed:", err);
  process.exit(1);
});
