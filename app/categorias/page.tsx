"use client";

import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase, Layers3, Users, BookOpen, TrendingUp,
  FolderSync, ClipboardList, UserPlus, FileUser
} from "lucide-react";

const categorias = [
  { id: "cas", label: "CAS", descripcion: "Contratación Administrativa de Servicios", href: "/convocatorias/cas", icon: Briefcase },
  { id: "dl-728", label: "DL 728", descripcion: "Régimen de la actividad privada", href: "/convocatorias/dl-728", icon: Layers3 },
  { id: "dl-276", label: "DL 276", descripcion: "Carrera Administrativa", href: "/convocatorias/dl-276", icon: Users },
  { id: "locacion", label: "Locación de Servicios", descripcion: "Contratos civiles por servicios", href: "/convocatorias/locacion", icon: ClipboardList },
  { id: "practicas", label: "Prácticas", descripcion: "Formación preprofesional o profesional", href: "/convocatorias/practicas", icon: BookOpen },
  { id: "grupo", label: "Cambio Grupo Ocupacional", descripcion: "Cambio de categoría o nivel", href: "/convocatorias/cambio_grupo_ocupacional", icon: FolderSync },
  { id: "reasignacion", label: "Reasignación", descripcion: "Traslado de personal entre plazas", href: "/convocatorias/reasignacion", icon: Users },
  { id: "nombramiento-asistencial", label: "Nombramiento Asistencial", descripcion: "Nombramiento de personal asistencial", href: "/convocatorias/nombramiento-asistencial", icon: UserPlus },
  { id: "nombramiento-administrativo", label: "Nombramiento Administrativo", descripcion: "Nombramiento de personal administrativo", href: "/convocatorias/nombramiento-administrativo", icon: FileUser },
  { id: "ascenso", label: "Ascenso", descripcion: "Promoción de personal según méritos", href: "/convocatorias/ascenso", icon: TrendingUp },
];

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <HeroSection />

      <section id="categorias" className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Categorías de Convocatorias
          </h2> */}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categorias.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center shadow-sm hover:shadow-md"
                >
                  <Icon className="w-7 h-7" />
                  <span className="font-semibold text-sm">{cat.label}</span>
                  <span className="text-xs opacity-80">{cat.descripcion}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/convocatorias">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver todas las convocatorias
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
