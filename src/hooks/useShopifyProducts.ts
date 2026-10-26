import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { isStorefrontProduct } from "@/lib/storefrontCatalog";
import {
  getShopifyLanguage,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  ShopifyProduct,
  ShopifyProductNode,
  storefrontApiRequest,
} from "@/lib/shopify";

export function useProducts(first = 20, query?: string) {
  const { i18n } = useTranslation();
  const language = getShopifyLanguage(i18n.resolvedLanguage ?? i18n.language);
  return useQuery({
    queryKey: ["shopify-products", language, first, query ?? null],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
        getShopifyLanguage,
  PRODUCTS_QUERY,
        { first, query: query ?? null, language }
      );
      return (res?.data?.products?.edges ?? []).filter((product) => isStorefrontProduct(product.node));
    },
  });
}

export function useProductByHandle(handle: string | undefined) {
  const { i18n } = useTranslation();
  const language = getShopifyLanguage(i18n.resolvedLanguage ?? i18n.language);
  return useQuery({
    queryKey: ["shopify-product", language, handle],
    enabled: !!handle,
    queryFn: async (): Promise<ShopifyProductNode | null> => {
      const res = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle, language }
      );
      const product = res?.data?.product;
      return product && isStorefrontProduct(product) ? product : null;
    },
  });
}
