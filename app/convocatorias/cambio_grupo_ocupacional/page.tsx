// app/convocatorias/cambio_grupo_ocupacional/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageCGO() {
  return <ConvocatoriasClient tipo="CAMBIO GRUPO OCUPACIONAL" titulo="CONVOCATORIAS CAMBIO GRUPO OCUPACIONAL" />;
}
