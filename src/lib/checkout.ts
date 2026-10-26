import type { Product } from "@prisma/client";
import { isPurchasable, parseSizes } from "./products";

export type CartLine = { productId: string; size?: string; quantity: number };

export type ResolvedLine = { product: Product; size?: string; quantity: number };

/** Validates cart lines against current products. Throws a customer-facing message on failure. */
export function resolveLineItems(items: CartLine[], products: Product[]): ResolvedLine[] {
  const lines = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error("One or more products are no longer available.");
    if (!isPurchasable(product)) throw new Error(`${product.title} is not available for purchase.`);

    const sizes = parseSizes(product.sizes);
    if (sizes.length > 0 && (!item.size || !sizes.includes(item.size))) {
      throw new Error(`Choose a valid size for ${product.title}.`);
    }
    return { product, size: sizes.length > 0 ? item.size : undefined, quantity: item.quantity };
  });

  for (const product of products) {
    const requested = lines
      .filter((line) => line.product.id === product.id)
      .reduce((sum, line) => sum + line.quantity, 0);
    if (requested > product.inventory) {
      throw new Error(`Only ${product.inventory} of ${product.title} left.`);
    }
  }

  return lines;
}
