import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <div className="texture-overlay" />
      <Link
        href="/shop"
        className="label block bg-ink py-2 text-center text-[0.7rem] text-paper hover:text-mustard"
      >
        ✦ New flash, new filth — shop the SuchGrime drop ✦
      </Link>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
