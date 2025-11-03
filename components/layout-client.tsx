"use client";

import SiteHeader from "@/components/header/site-header";
import Footer from "@/components/footer/footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
