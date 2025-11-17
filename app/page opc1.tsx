// app/rrhh/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  Newspaper,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  Shield,
  HeartHandshake,
  GraduationCap,
  Megaphone,
  Users2,
  Cog,
  Lightbulb,
  BookMarked,
  FileSearch,
  Archive,
  BadgePercent,
  Calendar,
  Download,
  Star,
  UserPlus,
  TrendingUp,
  FileUser,
} from "lucide-react";

// Datos de las oficinas según tu estructura
const offices = [
  {
    name: "Oficina Ejecutiva de Gestión y Desarrollo de RRHH",
    description: "Dirección general y coordinación estratégica",
    icon: Building2,
    color: "from-blue-600 to-blue-800",
    href: "#",
    features: [
      "Dirección Superior",
      "Planificación Estratégica",
      "Coordinación General",
    ],
  },
  {
    name: "Oficina de Gestión de Recursos Humanos",
    description: "Administración y gestión del personal",
    icon: Users2,
    color: "from-green-600 to-green-800",
    href: "/rrhh/gestion",
    features: ["Nóminas", "Contrataciones", "Registro Personal"],
  },
  {
    name: "Oficina de Desarrollo de Recursos Humanos",
    description: "Capacitación y desarrollo profesional",
    icon: GraduationCap,
    color: "from-purple-600 to-purple-800",
    href: "/rrhh/desarrollo",
    features: ["Capacitaciones", "Evaluaciones", "Desarrollo Profesional"],
  },
];

// Módulos principales - Versión minimalista
const mainModules = [
  {
    href: "/categorias",
    title: "Convocatorias",
    desc: "Procesos laborales activos",
    icon: Megaphone,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    href: "/rrhh/desarrollo",
    title: "Desarrollo",
    desc: "Capacitación profesional",
    icon: Lightbulb,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    href: "/rrhh/gestion",
    title: "Gestión",
    desc: "Administración de personal",
    icon: Cog,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    href: "/rrhh/serums",
    title: "SERUMS",
    desc: "Servicio rural de salud",
    icon: HeartHandshake,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    href: "/rrhh/documentos-normativos",
    title: "Normativas",
    desc: "Documentos legales",
    icon: BookMarked,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    href: "#",
    title: "Publicaciones",
    desc: "Avisos oficiales",
    icon: Newspaper,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
];

// Oportunidades Laborales - Cards con sombra y colores
// Oportunidades Laborales - Versión compacta
const opportunityCards = [
  {
    name: "CAS  ",
    href: "/convocatorias/cas",
    description: "DL N° 1057",
    icon: FileUser,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-200",
    borderColor: "border-blue-300",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    color: "text-blue-600",
  },
  {
    name: "DL 276",
    href: "/convocatorias/dl-276",
    description: "Régimen Laboral Público",
    icon: UserPlus,
    gradient: "from-green-500 to-emerald-500",
    shadow: "shadow-green-200",
    borderColor: "border-green-300",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    color: "text-green-600",
  },
  {
    name: "Prácticas",
    href: "/practicas",
    description: "Prácticas Prof y Pre Prof.",
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-200",
    borderColor: "border-purple-300",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    color: "text-purple-600",
  },
  {
    name: "Locación",
    href: "/convocatorias/locacion",
    description: "Servicios No Personales",
    icon: Briefcase,
    gradient: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-200",
    borderColor: "border-orange-300",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    color: "text-orange-600",
  },
];

export default function RRHHHome() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO COMPACTO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-blue-600/10" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-primary-foreground">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge institucional */}
            <div className="inline-flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full ring-1 ring-white/25 border border-white/10 mb-6">
              <Shield className="h-4 w-4" />
              Oficina Ejecutiva de:
            </div>

            {/* Título principal */}
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Gestión y Desarrollo de{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Recursos Humano
              </span>
            </h1>

            {/* Descripción */}
            <p className="mt-4 text-lg text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Plataforma unificada para convocatorias laborales, desarrollo
              profesional y gestión del talento humano en el sector salud de
              Huánuco.
            </p>

            {/* Botones principales */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/convocatorias">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 font-medium transition-all duration-300"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Ver Convocatorias
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/rrhh/documentos-normativos">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-medium"
                >
                  <BookMarked className="mr-2 h-4 w-4" />
                  Documentos Normativos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* SECCIÓN OPORTUNIDAD LABORAL - CARDS MEJORADAS */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oportunidad Laboral
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunityCards.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <Link key={opportunity.href} href={opportunity.href}>
                  <div
                    className={`
              group relative overflow-hidden rounded-xl border-2 p-4
              ${opportunity.borderColor} ${opportunity.bgColor}
              shadow-md ${opportunity.shadow} hover:shadow-lg
              transition-all duration-300 hover:-translate-y-1
            `}
                  >
                    {/* Efecto de borde superior con gradiente */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${opportunity.gradient}`}
                    />

                    <div className="flex items-center gap-3">
                      {/* Icono más pequeño y en línea */}
                      <div
                        className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-r ${opportunity.gradient} shadow-sm`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>

                      {/* Contenido compacto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-gray-800 transition-colors truncate">
                          {opportunity.name}
                        </h3>
                        <p className="text-gray-600 text-xs leading-tight mt-1">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>

                    {/* Indicador de hover sutil */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Enlace compacto para ver todas las convocatorias */}
          <div className="text-center mt-6">
            <Link href="/convocatorias">
              <Button
                variant="ghost"
                size="sm"
                className="bg-blue-600 text-white hover:text-gray-800"
              >
                Ver todas las convocatorias
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ESTRUCTURA ORGANIZACIONAL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestra Estructura Organizacional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce las áreas que conforman la Oficina Ejecutiva de Gestión y
              Desarrollo de Recursos Humanos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => {
              const Icon = office.icon;
              return (
                <Link key={office.href} href={office.href}>
                  <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${office.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                    />

                    <div className="relative">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${office.color} mb-4`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {office.name}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {office.description}
                      </p>

                      <div className="space-y-2">
                        {office.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-500"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${office.color}`}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Conocer más
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* MÓDULOS PRINCIPALES - VERSIÓN MINIMALISTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios y Recursos
            </h2>
            <p className="text-xl text-gray-600">
              Accede a todos los servicios y recursos disponibles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {mainModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link key={module.href} href={module.href}>
                  <div
                    className={`
                    group relative p-4 rounded-xl border-2 transition-all duration-300 
                    hover:-translate-y-1 hover:shadow-lg bg-white
                    ${module.borderColor} hover:border-gray-300
                  `}
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex p-3 rounded-lg ${module.bgColor} mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`h-6 w-6 ${module.color}`} />
                      </div>

                      <h3
                        className={`font-semibold text-sm mb-1 group-hover:${module.color} transition-colors`}
                      >
                        {module.title}
                      </h3>

                      <p className="text-xs text-gray-600 mb-2 leading-tight">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Línea adicional de servicios */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                href: "#",
                title: "Formatos",
                icon: FileText,
                color: "text-gray-600",
              },
              {
                href: "#",
                title: "Calendario",
                icon: Calendar,
                color: "text-gray-600",
              },
              {
                href: "#",
                title: "Descargas",
                icon: Download,
                color: "text-gray-600",
              },
              {
                href: "#",
                title: "Preguntas Frecuentes",
                icon: FileSearch,
                color: "text-gray-600",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className="group text-center p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    <Icon
                      className={`h-5 w-5 mx-auto mb-2 ${item.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
