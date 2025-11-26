import type { Metadata } from "next";
import "@/app/globals.css";
import LayoutClient from "@/components/layout-client";

export const metadata: Metadata = {
  title: "DIRESA-HCO",
  description: "Created with OTI",
  generator: "OTI",
  icons: {
    icon: "/logo.ico", // o '/logo.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
