import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { Product } from "@prisma/client";
import { categorySlug, isPurchasable, parseGallery, parseSizes, productImages, statusLabel } from "../products";
import { resolveLineItems } from "../checkout";

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: "p1",
    slug: "tee",
    title: "Tee",
    category: "Tees",
    description: "",
    priceCents: 3500,
    compareAtCents: null,
    imageUrl: null,
    gallery: "",
    sizes: "",
    inventory: 10,
    status: "available",
    featured: false,
    active: true,
    stripePriceId: null,
    stripeProductId: null,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    ...overrides,
  };
}

describe("product helpers", () => {
  it("parses sizes and gallery, ignoring blanks", () => {
    assert.deepEqual(parseSizes(" S, M ,,L "), ["S", "M", "L"]);
    assert.deepEqual(parseSizes(""), []);
    assert.deepEqual(parseGallery("a.jpg\r\n\n b.jpg \n"), ["a.jpg", "b.jpg"]);
  });

  it("puts the main image first", () => {
    assert.deepEqual(productImages({ imageUrl: "main.jpg", gallery: "g1.jpg\ng2.jpg" }), ["main.jpg", "g1.jpg", "g2.jpg"]);
    assert.deepEqual(productImages({ imageUrl: null, gallery: "g1.jpg" }), ["g1.jpg"]);
  });

  it("derives purchasability and status label", () => {
    assert.equal(isPurchasable(product()), true);
    assert.equal(isPurchasable(product({ inventory: 0 })), false);
    assert.equal(isPurchasable(product({ status: "coming_soon" })), false);
    assert.equal(statusLabel(product()), null);
    assert.equal(statusLabel(product({ inventory: 0 })), "Sold out");
    assert.equal(statusLabel(product({ status: "coming_soon", inventory: 0 })), "Coming soon");
  });

  it("slugs categories for URLs", () => {
    assert.equal(categorySlug("Parts & Iron"), "parts-iron");
    assert.equal(categorySlug("Tees"), "tees");
  });
});

describe("resolveLineItems", () => {
  const tee = product({ sizes: "S, M, L", inventory: 3 });
  const sticker = product({ id: "p2", title: "Sticker", inventory: 5 });

  it("accepts valid sized and unsized lines", () => {
    const lines = resolveLineItems(
      [
        { productId: "p1", size: "M", quantity: 1 },
        { productId: "p2", size: "ignored", quantity: 2 },
      ],
      [tee, sticker]
    );
    assert.equal(lines[0].size, "M");
    assert.equal(lines[1].size, undefined);
  });

  it("allows the same product in different sizes", () => {
    const lines = resolveLineItems(
      [
        { productId: "p1", size: "S", quantity: 1 },
        { productId: "p1", size: "L", quantity: 2 },
      ],
      [tee]
    );
    assert.equal(lines.length, 2);
  });

  it("rejects a missing or invalid size", () => {
    assert.throws(() => resolveLineItems([{ productId: "p1", quantity: 1 }], [tee]), /valid size/);
    assert.throws(() => resolveLineItems([{ productId: "p1", size: "XXL", quantity: 1 }], [tee]), /valid size/);
  });

  it("enforces inventory across all sizes of a product", () => {
    assert.throws(
      () =>
        resolveLineItems(
          [
            { productId: "p1", size: "S", quantity: 2 },
            { productId: "p1", size: "M", quantity: 2 },
          ],
          [tee]
        ),
      /Only 3/
    );
  });

  it("rejects unknown and unavailable products", () => {
    assert.throws(() => resolveLineItems([{ productId: "nope", quantity: 1 }], [tee]), /no longer available/);
    assert.throws(
      () => resolveLineItems([{ productId: "p1", size: "S", quantity: 1 }], [product({ ...tee, status: "sold_out" })]),
      /not available/
    );
  });
});
