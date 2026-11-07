import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { formatMoney } from "@/lib/money";
import { productImages, statusLabel } from "@/lib/products";
import { HomeView, type DropPiece } from "@/components/home/HomeView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await safeQuery(
    () =>
      prisma.product.findMany({
        where: { active: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
      }),
    []
  );

  const drop: DropPiece[] = products.map((product) => {
    const status = statusLabel(product);
    return {
      href: `/shop/${product.slug}`,
      title: product.title,
      price: formatMoney(product.priceCents),
      image: productImages(product)[0] ?? null,
      badge: product.featured && !status ? "Limited" : status ?? "Small run",
      detail: product.category,
    };
  });

  return <HomeView drop={drop} />;
}
