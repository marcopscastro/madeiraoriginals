import { useQuery } from "@tanstack/react-query";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  ShopifyProduct,
  ShopifyProductNode,
  storefrontApiRequest,
} from "@/lib/shopify";

export function useProducts(first = 20, query?: string) {
  return useQuery({
    queryKey: ["shopify-products", first, query ?? null],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
        PRODUCTS_QUERY,
        { first, query: query ?? null }
      );
      return res?.data?.products?.edges ?? [];
    },
  });
}

export function useProductByHandle(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    enabled: !!handle,
    queryFn: async (): Promise<ShopifyProductNode | null> => {
      const res = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle }
      );
      return res?.data?.product ?? null;
    },
  });
}
