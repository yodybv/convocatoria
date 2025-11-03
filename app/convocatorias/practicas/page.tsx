// app/convocatorias/practicas/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PagePracticas() {
  return <ConvocatoriasClient tipo="PRACTICAS" titulo="CONVOCATORIAS PRÁCTICAS" />;
}
