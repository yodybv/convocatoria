// app/convocatorias/nombramiento-asistencial/page.tsx
"use client";
import dynamic from "next/dynamic";
const ConvocatoriasClient = dynamic(() => import("@/components/convocatorias/ConvocatoriasClient"), { ssr: false });

export default function PageNomAsistencial() {
  return <ConvocatoriasClient tipo="NOMBRAMIENTO ASISTENCIAL" titulo="CONVOCATORIAS NOMBRAMIENTO ASISTENCIAL" />;
}
