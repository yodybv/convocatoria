// app/convocatorias/cas/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageCAS() {
  return <ConvocatoriasClient tipo="CAS" titulo="CONVOCATORIAS CAS" />;
}
