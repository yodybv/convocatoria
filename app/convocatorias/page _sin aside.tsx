 // app/convocatorias/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import HeroSection from "@/components/hero-section";
import ConvocatoriasCategorias from "@/components/convocatorias-categorias";
import ConvocatoriasGrid from "@/components/convocatorias-grid";

// 👇 importa tipos/mapas centralizados
import { CategoryId, CATEGORY_TO_TIPO, CATEGORY_TITLE } from "@/types/convocatorias";

type Documento = {
  id: number;
  tipo_documento: string;
  tipo_documento_id: number;
  titulo: string;
  url: string;
  fecha_publicacion: string;
};

type ApiConvocatoria = {
  id: number;
  codigo: string;
  fecha_publicacion: string;
  titulo_convocatoria: string;
  descripcion: string;
  tipo_convocatoria: string;
  estado: string;
  documentos: { total: number; tipos: string[]; detalle: Documento[] };
  resultados: { total: number; etapas: string[] };
  fecha_fin: string;
  publicado: boolean;
};

type ApiResponse = {
  data: ApiConvocatoria[];
  total: number;
  tipo_filtrado?: string;
  status: "success" | "error";
  error?: string;
};

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost/codefuerte_rrhh/Api/").replace(/\/+$/, "") + "/";
const GET_CONVOCATORIA = API_BASE + "get_convocatoria.php";

async function fetchByTipo(tipo: string): Promise<ApiConvocatoria[]> {
  const url = `${GET_CONVOCATORIA}?tipo=${encodeURIComponent(tipo)}`;
  const res = await fetch(url, { cache: "no-store", headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const json = (await res.json()) as ApiResponse;
  if (json.status === "error") throw new Error(json.error || "Error en API");
  return Array.isArray(json.data) ? json.data : [];
}

export default function ConvocatoriasHomePage() {
  const [selected, setSelected] = useState<CategoryId | null>("todas");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ApiConvocatoria[]>([]);
  const [counts, setCounts] = useState<Partial<Record<CategoryId, number>> & { todas?: number }>({ todas: undefined });

  const loadCounts = useCallback(async () => {
    try {
      const entries = await Promise.all(
        (Object.keys(CATEGORY_TO_TIPO) as Exclude<CategoryId, "todas">[]).map(async (cat) => {
          const data = await fetchByTipo(CATEGORY_TO_TIPO[cat]);
          return [cat, data.length] as [CategoryId, number];
        })
      );

      const nextCounts: Partial<Record<CategoryId, number>> & { todas?: number } = {};
      let total = 0;
      for (const [cat, n] of entries) {
        nextCounts[cat] = n;
        total += n;
      }
      nextCounts.todas = total;
      setCounts(nextCounts);
    } catch (e) {
      console.warn("No se pudieron cargar conteos:", e);
      setCounts((prev) => ({ ...prev, todas: prev.todas ?? 0 }));
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selected || selected === "todas") {
        const results = await Promise.all(
          (Object.keys(CATEGORY_TO_TIPO) as Exclude<CategoryId, "todas">[]).map((cat) =>
            fetchByTipo(CATEGORY_TO_TIPO[cat])
          )
        );
        const merged = results.flat();
        merged.sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime());
        setItems(merged);
      } else {
        const data = await fetchByTipo(CATEGORY_TO_TIPO[selected]);
        data.sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime());
        setItems(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido al cargar convocatorias");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const title = useMemo(() => CATEGORY_TITLE[selected || "todas"], [selected]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
       

      <main className="flex-1">
        <HeroSection />

        <ConvocatoriasCategorias
          selectedCategory={selected}
          onSelectCategory={(c) => setSelected(c)}
          asLinks={false}
          counts={counts}
          title="Categorías de Convocatorias"
        />

        <ConvocatoriasGrid title={title} isLoading={isLoading} error={error} data={items} />
      </main>

     
    </div>
  );
}
