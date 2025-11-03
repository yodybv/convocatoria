// app/convocatorias/reasignacion/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageReasignacion() {
  return <ConvocatoriasClient tipo="REASIGNACION" titulo="CONVOCATORIAS REASIGNACIÓN" />;
}
