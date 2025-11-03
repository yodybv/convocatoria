// app/convocatorias/nombramiento-administrativo/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageNomAdministrativo() {
  return <ConvocatoriasClient tipo="NOMBRAMIENTO ADMINISTRATIVO" titulo="CONVOCATORIAS NOMBRAMIENTO ADMINISTRATIVO" />;
}
