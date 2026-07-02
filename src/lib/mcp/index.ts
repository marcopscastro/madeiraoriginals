import { defineMcp } from "@lovable.dev/mcp-js";
import searchProducts from "./tools/search-products";
import getProduct from "./tools/get-product";
import listJournalPosts from "./tools/list-journal-posts";
import getJournalPost from "./tools/get-journal-post";
import subscribeNewsletter from "./tools/subscribe-newsletter";

export default defineMcp({
  name: "madeira-originals-mcp",
  title: "Madeira Originals",
  version: "0.1.0",
  instructions:
    "Tools for Madeira Originals — a premium Madeiran Atlantic lifestyle brand. Use `search_products` and `get_product` to browse the Shopify catalog (t-shirts, hoodies, Island of Flowers prints, accessories). Use `list_journal_posts` and `get_journal_post` for editorial articles. Use `subscribe_newsletter` to add an email to the mailing list.",
  tools: [searchProducts, getProduct, listJournalPosts, getJournalPost, subscribeNewsletter],
});
