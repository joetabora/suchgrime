import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-base text-primary">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
