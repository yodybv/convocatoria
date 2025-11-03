 // components/convocatorias-categorias.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Briefcase,
  Layers3,
  Users,
  BookOpen,
  TrendingUp,
  FolderSync,
  ClipboardList,
  UserPlus,
  FileUser,
  FolderOpenDot,
} from "lucide-react";

import type { CategoryId } from "@/types/convocatorias";
import { CATEGORIES_BASE } from "@/types/convocatorias";

interface Props {
  selectedCategory?: CategoryId | null;
  onSelectCategory?: (category: CategoryId | null) => void;
  asLinks?: boolean;
  counts?: Partial<Record<CategoryId, number>> & { todas?: number };
  title?: string;
}

// Mapeo simple de ID -> Icono
const ICONS: Record<string, React.ElementType> = {
  cas: Briefcase,
  "dl-728": Layers3,
  "dl-276": Users,
  locacion: ClipboardList,
  practicas: BookOpen,
  cambio_grupo_ocupacional: FolderSync,
  reasignacion: Users,
  "nombramiento-asistencial": UserPlus,
  "nombramiento-administrativo": FileUser,
  ascenso: TrendingUp,
};

export default function ConvocatoriasCategorias({
  selectedCategory = null,
  onSelectCategory,
  asLinks = true,
  counts,
  title = "Categorías de Convocatorias",
}: Props) {
  // Incluimos manualmente "todas" al inicio
  const categories = useMemo(
    () => [
      { id: "todas" as CategoryId, label: "Todas", description: "Ver todas las convocatorias", href: "/convocatorias", icon: FolderOpenDot },
      ...CATEGORIES_BASE.map((c) => ({
        ...c,
        icon: ICONS[c.id] ?? FolderOpenDot,
      })),
    ],
    []
  );

  return (
    <section id="convocatorias-categorias" className="py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
          {typeof counts?.todas === "number" && (
            <span className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{counts.todas}</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((category) => {
            const Icon = category.icon as React.ElementType;
            const isSelected =
              selectedCategory === (category.id as CategoryId) ||
              (selectedCategory === null && category.id === "todas");

            const content = (
              <div
                className={[
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 border",
                  "hover:shadow-md active:scale-[0.98]",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-muted border-border",
                ].join(" ")}
              >
                <div className="relative">
                  <Icon className="w-7 h-7" />
                  {typeof counts?.[category.id as CategoryId] === "number" && (
                    <span
                      className={[
                        "absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full border",
                        isSelected
                          ? "bg-primary-foreground text-primary border-primary-foreground/30"
                          : "bg-foreground text-background border-foreground/20",
                      ].join(" ")}
                      title={`Convocatorias: ${counts?.[category.id as CategoryId]}`}
                    >
                      {counts?.[category.id as CategoryId]}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-center">{category.label}</span>
                <span className="text-xs opacity-75 text-center leading-snug">{category.description}</span>
              </div>
            );

            if (onSelectCategory) {
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id === "todas" ? null : (category.id as CategoryId))}
                  className="text-left"
                >
                  {content}
                </button>
              );
            }

            return asLinks ? (
              <Link key={category.id} href={category.href} className="block">
                {content}
              </Link>
            ) : (
              <button key={category.id} className="text-left cursor-default" aria-disabled>
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
