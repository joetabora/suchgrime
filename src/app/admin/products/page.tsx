import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteProduct } from "../actions";
import { formatMoney } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-bebas text-5xl tracking-tight text-white">Products</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-steel">
            Merch & parts inventory
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-chrome"
        >
          Add product
        </Link>
      </div>

      <div className="divide-y divide-white/10 border border-white/10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-oswald text-xl uppercase text-white">{product.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                {formatMoney(product.priceCents)} · Stock {product.inventory} · {product.status}
                {!product.active ? " · Hidden" : ""}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/products/${product.id}`}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-chrome hover:text-white"
              >
                Edit
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button type="submit" className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="p-8 font-inter text-sm text-brand-steel">No products yet.</p>}
      </div>
    </div>
  );
}
