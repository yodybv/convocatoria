// app/convocatorias/dl-728/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageDL728() {
  return <ConvocatoriasClient tipo="DL 728" titulo="CONVOCATORIAS DL 728" />;
}
