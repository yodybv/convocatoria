"use client";
import dynamic from "next/dynamic";

const DocumentosClient = dynamic(
  () => import("@/components/documentos/DocumentosClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-64">Cargando...</div>
    ),
  }
);

export default function PageSerums() {
  return <DocumentosClient tipo="SERUMS" titulo="DOCUMENTOS NORMATIVOS - SERUMS" />;
}
