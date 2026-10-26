import type { Product } from "@prisma/client";

export function parseSizes(sizes: string): string[] {
  return sizes
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseGallery(gallery: string): string[] {
  return gallery
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function productImages(product: Pick<Product, "imageUrl" | "gallery">): string[] {
  const images = parseGallery(product.gallery);
  return product.imageUrl ? [product.imageUrl, ...images] : images;
}

export function isPurchasable(product: Pick<Product, "status" | "inventory">) {
  return product.status === "available" && product.inventory > 0;
}

export function statusLabel(product: Pick<Product, "status" | "inventory">) {
  if (product.status === "coming_soon") return "Coming soon";
  if (product.status === "sold_out" || product.inventory < 1) return "Sold out";
  return null;
}

export function categorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
