 // components/convocatorias-grid.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, FileText } from "lucide-react";

// Tipo de la API (igual al usado en page.tsx)
type Documento = {
  id: number;
  tipo_documento: string;
  tipo_documento_id: number;
  titulo: string;
  url: string;
  fecha_publicacion: string;
  tamanio_bytes?: number;
};

export type ApiConvocatoria = {
  id: number;
  codigo: string;
  fecha_publicacion: string;
  titulo_convocatoria: string;
  descripcion: string;
  tipo_convocatoria: string;
  estado: string;
  documentos: {
    total: number;
    tipos: string[];
    detalle: Documento[];
  };
  resultados: {
    total: number;
    etapas: string[];
  };
  fecha_fin: string;
  publicado: boolean;
};

 function getTypeColor(tipo: string) {
  const t = (tipo || "").toLowerCase();
  if (t.includes("cas")) return "bg-blue-100 text-blue-800 border-blue-300";
  if (t.includes("276")) return "bg-blue-100 text-blue-800 border-blue-300";
  if (t.includes("728")) return "bg-blue-100 text-blue-800 border-blue-300";
  if (t.includes("locación") || t.includes("locacion")) return "bg-blue-100 text-blue-800 border-blue-300";
  return "bg-blue-100 text-blue-800 border-blue-300"; // todo azul 💙
}


// ruta de fallback por tipo (para el botón)
function routeByTipo(tipo: string): string {
  const t = (tipo || "").toLowerCase();
  if (t.includes("cas")) return "/convocatorias/cas";
  if (t.includes("276")) return "/convocatorias/dl-276";
  if (t.includes("728")) return "/convocatorias/dl-728";
  if (t.includes("locación") || t.includes("locacion")) return "/convocatorias/locacion";
  return "/convocatorias";
}

function formatDateSafe(isoLike?: string) {
  try {
    if (!isoLike) return "—";
    const d = new Date(isoLike);
    if (isNaN(d.getTime())) return isoLike;
    return d.toLocaleDateString("es-PE");
  } catch {
    return isoLike || "—";
  }
}

export default function ConvocatoriasGrid({
  title = "Convocatorias",
  isLoading = false,
  error = null,
  data,
}: {
  title?: string;
  isLoading?: boolean;
  error?: string | null;
  /** Puede venir undefined/null y lo tratamos como [] */
  data?: ApiConvocatoria[] | null;
}) {
  // 👇 blindaje: si no viene data, usamos []
  const list: ApiConvocatoria[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
          <p className="text-muted-foreground">Cargando convocatorias…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
          <p className="text-destructive">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-muted/3">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-12">
          {title} <span className="text-muted-foreground">({list.length})</span>
        </h3>

        {list.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No hay convocatorias disponibles.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => {
            const tipo = c.tipo_convocatoria || "";
            const cierre = c.fecha_fin ? formatDateSafe(c.fecha_fin) : "—";
            const docs = c.documentos?.detalle || [];
            const docTop = docs[0];

            return (
              <div
                key={c.id}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg font-bold text-foreground text-balance">
                      {c.titulo_convocatoria}
                    </h4>
                    <Badge className={getTypeColor(tipo)}>{tipo}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">{c.descripcion}</p>

                  <div className="space-y-2 py-2 border-y border-border">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Código: {c.codigo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Estado: {c.estado}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Publicación: {formatDateSafe(c.fecha_publicacion)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Cierre: {cierre}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{c.documentos?.total || 0} documento(s)</span>
                    {docTop && (
                      <span className="truncate" title={docTop.titulo}>
                        • {docTop.tipo_documento}: {docTop.titulo}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border">
                  <Link href={routeByTipo(tipo)} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      Ver convocatoria completa
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
