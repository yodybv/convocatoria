 // app/convocatorias/locacion/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageLocacion() {
  return <ConvocatoriasClient tipo="Locación de servicios" titulo="CONVOCATORIAS LOCACIÓN DE SERVICIOS" />;
}
