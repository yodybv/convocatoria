 // app/convocatorias/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import HeroSection from "@/components/hero-section";
import ConvocatoriasCategorias from "@/components/convocatorias-categorias";
import ConvocatoriasGrid from "@/components/convocatorias-grid";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
  (process.env.NEXT_PUBLIC_API_URL || "https://sistemas.diresahuanuco.gob.pe/Api").replace(/\/+$/, "") + "/";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleCategorySelect = (category: CategoryId | null) => {
    setSelected(category === null ? "todas" : category);
    setIsMobileMenuOpen(false); // Cerrar menú móvil al seleccionar categoría
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex">
        {/* Aside lateral izquierdo para categorías */}
        <aside className={`
          fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:w-80 lg:shadow-none
        `}>
          {/* Header del Aside */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Categorías</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-blue-100">
              Filtra por tipo de convocatoria
            </p>
          </div>

          {/* Lista de Categorías */}
          <div className="h-[calc(100vh-120px)] overflow-y-auto p-4">
            <ConvocatoriasCategorias
              selectedCategory={selected}
              onSelectCategory={handleCategorySelect}
              asLinks={false}
              counts={counts}
              title=""
              layout="vertical"
            />
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Botón para abrir menú móvil */}
          <div className="lg:hidden p-4 border-b border-gray-200 bg-white">
            <Button
              variant="outline"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2"
            >
              <Menu className="h-4 w-4" />
              Categorías
            </Button>
          </div>

          {/* Hero Section */}
          <div className="lg:hidden">
            <HeroSection />
          </div>

          {/* Grid de Convocatorias */}
          <div className="flex-1 p-6">
            <ConvocatoriasGrid 
              title={title} 
              isLoading={isLoading} 
              error={error} 
              data={items} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
