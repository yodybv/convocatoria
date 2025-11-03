// app/convocatorias/dl-276/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageDL276() {
  return <ConvocatoriasClient tipo="DL 276" titulo="CONVOCATORIAS DL 276" />;
}
