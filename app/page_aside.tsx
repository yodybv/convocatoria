 // app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Briefcase, Users, BookOpen, ClipboardList,
  FileText, Newspaper, Layers3, Folder, Building2,
  ShieldCheck, Sparkles, TrendingUp, UserPlus, FileUser, Scale,
  GraduationCap, Target, Calendar, Download, X, ChevronRight,
  FileSearch, BookMarked, Library, Archive
} from "lucide-react";
import { useState } from "react";

/** Tarjetas principales (módulos) - Versión compacta */
const modules = [
  {
    href: "/categorias",
    title: "Oportunidad Laboral",
    desc: "Procesos CAS, DL 276, DL 728, Locación, etc.",
    icon: Briefcase,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    buttonColor: "bg-blue-500 hover:bg-blue-600 text-white"
  },
  {
    href: "/rrhh/desarrollo",
    title: "Desarrollo de RRHH",
    desc: "Direccion de Desarrollo de Recursos Humanos.",
    icon: BookOpen,
    gradient: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    buttonColor: "bg-teal-500 hover:bg-teal-600 text-white"
  },
  {
    href: "/rrhh/gestion",
    title: "Gestión de RRHH",
    desc: "Dirección de Gestion de Recursos Humanos .",
    icon: Users,
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600 text-white"
  },
  {
    href: "/rrhh/serums",
    title: "SERUMS",
    desc: "Servicio Rural y Urbano Marginal de Salud.",
    icon: ClipboardList,
    gradient: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600 text-white"
  },
  {
    href: "/rrhh/documentos-normativos",
    title: "Normativas y Formatos",
    desc: "Directivas, resoluciones, plantillas oficiales.",
    icon: FileText,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    buttonColor: "bg-purple-500 hover:bg-purple-600 text-white"
  },
  {
    href: "#",
    title: "Publicaciones",
    desc: "Comunicados, notas y avisos oficiales.",
    icon: Newspaper,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    buttonColor: "bg-amber-500 hover:bg-amber-600 text-white"
  },
];

/** Programas y documentos para el aside - Versión minimalista */
const programs = [
  { 
    href: "/plandes", 
    label: "PLANDES", 
    subtitle: "Formación Profesional y Laboral",
    icon: GraduationCap,
    color: "text-blue-600",
    // count: "12 docs"
  },
  { 
    href: "/pdp", 
    label: "Guías Técnicas", 
    subtitle: "PDP y Planes de Desarrollo",
    icon: Target,
    color: "text-green-600",
    // count: "8 guías"
  },
  { 
    href: "/induccion", 
    label: "Inducción Laboral", 
    subtitle: "Manuales RHUS",
    icon: Users,
    color: "text-purple-600",
    // count: "5 manuales"
  },
  { 
    href: "/capacitacion", 
    label: "Capacitación", 
    subtitle: "Programas continuos",
    icon: BookOpen,
    color: "text-orange-600",
    // count: "15 programas"
  },
  { 
    href: "/evaluacion", 
    label: "Evaluación", 
    subtitle: "Sistemas y formatos",
    icon: TrendingUp,
    color: "text-cyan-600",
    // count: "10 formatos"
  },
  { 
    href: "/cronograma", 
    label: "Cronogramas", 
    subtitle: "Calendarización anual",
    icon: Calendar,
    color: "text-pink-600",
    // count: "6 planes"
  },
];

export default function RRHHHome() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* HERO COMPACTO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-primary-foreground">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs md:text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full ring-1 ring-white/25 border border-white/10">
            <Sparkles className="h-4 w-4" /> Portal de Recursos Humanos · DIRESA Huánuco
          </div>

          {/* Título principal */}
          <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Gestión y Desarrollo de <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Recursos Humanos</span>
          </h1>
          
          {/* Descripción */}
          <p className="mt-4 max-w-3xl text-base md:text-lg text-white/90 leading-relaxed">
            Accede a convocatorias, documentos, servicios y oportunidades laborales en un entorno unificado
            y moderno para profesionales de salud.
          </p>

          {/* Botones principales */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/convocatorias">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 font-medium transition-all duration-300">
                <Briefcase className="mr-2 h-4 w-4" />
                Ver convocatorias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button 
              size="lg" 
              onClick={() => setIsAsideOpen(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25 font-medium transition-all duration-300"
            >
              <Archive className="mr-2 h-4 w-4" />
              Documentos Técnicos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Link href="/rrhh/documentos-normativos">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 font-medium transition-all duration-300">
                <Users className="mr-2 h-4 w-4" />
                Normativas 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LAYOUT PRINCIPAL CON ASIDE MINIMALISTA */}
      <div className="flex">
        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1">
          {/* SECCIÓN TARJETAS ELEGANTES Y COMPACTAS */}
          <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Accesos Principales
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
                Todo lo que necesitas para postular, gestionar y mantener actualizada tu información como profesional del sector salud.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    className={`
                      group relative overflow-hidden rounded-2xl p-5
                      ${m.bgColor} border ${m.borderColor}
                      shadow-sm hover:shadow-xl transition-all duration-300
                      hover:-translate-y-1 hover:scale-[1.02]
                    `}
                  >
                    {/* Línea decorativa superior con gradiente */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.gradient}`} />
                    
                    {/* Efecto de brillo al hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${m.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${m.gradient} shadow-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-gray-900 transition-colors">
                            {m.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          size="sm"
                          className={`gap-1.5 text-sm font-medium ${m.buttonColor} shadow-sm transition-all duration-300`}
                        >
                          Acceder
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${m.gradient}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CATEGORÍAS ADICIONALES COMPACTAS */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              {/* <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Procesos de Nombramiento
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Convocatorias y procesos de selección para diferentes modalidades
                </p>
              </div> */}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[ 
                  { 
                    href: "/convocatorias/nombramiento-asistencial", 
                    label: "Nombramiento Asistencial", 
                    count: "24 vacantes",
                    icon: UserPlus,
                    color: "from-green-500 to-emerald-500",
                    buttonColor: "bg-green-500 hover:bg-green-600 text-white"
                  },
                  { 
                    href: "/convocatorias/nombramiento-administrativo", 
                    label: "Nombramiento Administrativo", 
                    count: "18 vacantes",
                    icon: FileUser,
                    color: "from-blue-500 to-cyan-500",
                    buttonColor: "bg-blue-500 hover:bg-blue-600 text-white"
                  },
                  { 
                    href: "/convocatorias/ascenso", 
                    label: "Ascenso ", 
                    count: "12 oportunidades",
                    icon: TrendingUp,
                    color: "from-purple-500 to-pink-500",
                    buttonColor: "bg-purple-500 hover:bg-purple-600 text-white"
                  },
                  { 
                    href: "/convocatorias/practicas", 
                    label: "Prácticas Pre Profesionales", 
                    count: "36 cupos",
                    icon: GraduationCap,
                    color: "from-orange-500 to-amber-500",
                    buttonColor: "bg-orange-500 hover:bg-orange-600 text-white"
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="
                        group relative overflow-hidden rounded-xl
                        bg-gradient-to-br from-white to-gray-50 border border-gray-200
                        p-4 hover:shadow-lg transition-all duration-300
                        hover:-translate-y-1
                      "
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground bg-black/5 px-2 py-1 rounded">
                            {item.count}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-gray-900 transition-colors text-sm">
                          {item.label}
                        </h4>
                        
                        <div className="mt-auto pt-3">
                          <Button
                            size="sm"
                            className={`w-full gap-1.5 text-xs font-medium ${item.buttonColor} shadow-sm transition-all duration-300`}
                          >
                            Ver convocatorias
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* ASIDE LATERAL - DISEÑO MINIMALISTA */}
        <aside className={`
          fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-100 shadow-xl
          transform transition-transform duration-300 ease-in-out z-50
          ${isAsideOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:relative lg:translate-x-0 lg:w-80 lg:shadow-sm
        `}>
          {/* Header del Aside */}
          <div className="bg-white border-b border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Library className="h-5 w-5 text-purple-600" />
                Documentos Técnicos
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAsideOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Acceso rápido a documentos institucionales
            </p>
          </div>

          {/* Lista Minimalista de Programas */}
          <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)] overflow-y-auto">
            <div className="p-4 space-y-1">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <Link
                    key={program.href}
                    href={program.href}
                    className="
                      group flex items-center gap-3 p-3 rounded-lg
                      hover:bg-gray-50 hover:shadow-sm
                      border border-transparent hover:border-gray-200
                      transition-all duration-200
                    "
                  >
                    <div className={`p-2 rounded-md bg-gray-100 group-hover:bg-white ${program.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors text-sm">
                          {program.label}
                        </h4>
                        {/* <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {program.count}
                        </span> */}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {program.subtitle}
                      </p>
                    </div>
                    
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>

            {/* Sección de Acciones Rápidas */}
            <div className="p-4 border-t border-gray-100 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-gray-400" />
                Acciones Rápidas
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <Download className="h-3 w-3" />
                  Descargar catálogo completo
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <BookMarked className="h-3 w-3" />
                  Ver documentos recientes
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isAsideOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsAsideOpen(false)}
          />
        )}
      </div>
    </main>
  );
}
