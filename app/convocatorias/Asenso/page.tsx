// app/convocatorias/Asenso/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageAsenso() {
  // Si en tu BD es "ASCENSO", cambia el tipo:
  // return <ConvocatoriasClient tipo="ASCENSO" titulo="CONVOCATORIAS ASCENSO" />;
  return <ConvocatoriasClient tipo="ASENSO" titulo="CONVOCATORIAS ASENSO" />;
}
