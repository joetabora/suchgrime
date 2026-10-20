import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin Login | SUCHGRIME",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md pt-16">
      <h1 className="mb-2 font-bebas text-5xl tracking-tight text-white">Admin</h1>
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-brand-steel">
        SuchGrime content & shop control
      </p>
      <LoginForm />
    </div>
  );
}
