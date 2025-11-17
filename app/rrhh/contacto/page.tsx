// app/rrhh/contactos/page.tsx - Diseño con pestañas (CORREGIDO)
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Building2,
  GraduationCap,
  HeartHandshake,
  DollarSign,
  Shield,
  ExternalLink,
  Search,
} from "lucide-react";

// Definir tipos TypeScript
type ColorType = "blue" | "green" | "purple" | "orange" | "pink";

type Contact = {
  type: string;
  value: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
};

type ContactArea = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: ColorType;
  contacts: Contact[];
};

// Definir colorClasses con tipo específico
const colorClasses: Record<
  ColorType,
  { bg: string; border: string; text: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    gradient: "from-green-600 to-green-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    gradient: "from-purple-800 to-purple-400",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    gradient: "from-orange-600 to-orange-300",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    gradient: "from-pink-700 to-pink-600",
  },
};

const contactAreas: ContactArea[] = [
  {
    id: "direccion",
    name: "Dirección Ejecutiva de Gestión y Desarrollo de RRHH",
    shortName: "Dirección",
    description: "Dirección general y coordinación estratégica",
    icon: Building2,
    color: "blue",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 412",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Correo Electrónico",
        value: " recursoshumanos@diresahuanuco.gob.pe",
        details: "Respuesta en 24-48 horas",
        icon: Mail,
        href: "mailto: recursoshumanos@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    id: "gestion",
    name: "Oficina de Gestión de Recursos Humanos",
    shortName: "Gestión",
    description: "Administración y gestión del personal",
    icon: Users,
    color: "green",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 441",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Correo Electrónico",
        value: " recursoshumanos@diresahuanuco.gob.pe",
        details: "Atención personalizada",
        icon: Mail,
        href: "mailto: recursoshumanos@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    id: "desarrollo",
    name: "Oficina de Desarrollo de Recursos Humanos",
    shortName: "Desarrollo",
    description: "Capacitación y desarrollo profesional",
    icon: GraduationCap,
    color: "purple",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 239",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Correo Electrónico",
        value: " recursoshumanos@diresahuanuco.gob.pe",
        details: "Información sobre capacitaciones",
        icon: Mail,
        href: "mailto: recursoshumanos@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    id: "remuneraciones",
    name: "Área de Remuneraciones",
    shortName: "Remuneraciones",
    description: "Gestión de planillas y compensaciones",
    icon: DollarSign,
    color: "green",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 440",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Horario de Atención",
        value: "Lunes a Viernes",
        details: "8:00 AM - 1:00 PM | 2:30 PM - 5:30 PM",
        icon: Clock,
      },
    ],
  },
  {
    id: "bienestar",
    name: "Bienestar Social",
    shortName: "Bienestar",
    description: "Programas de bienestar y apoyo al personal",
    icon: HeartHandshake,
    color: "blue",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 251",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Horario de Atención",
        value: "Lunes a Viernes",
        details: "8:00 AM - 1:00 PM | 2:30 PM - 5:30 PM",
        icon: Clock,
      },
    ],
  },
];

export default function ContactosPage() {
  const [activeTab, setActiveTab] = useState<string>("direccion");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredAreas = contactAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeArea = contactAreas.find((area) => area.id === activeTab);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/rrhh">
              <Button
                variant="outline"
                size="sm"
                className="bg-geen border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
            <div className="inline-flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Shield className="h-4 w-4" />
              DIRESA Huánuco
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Directorio de Contactos
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Encuentra rápidamente los contactos específicos de cada área
            </p>
          </div>
        </div>
      </section>

      {/* Barra de búsqueda */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar área o departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Contenido principal con pestañas */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Pestañas horizontales */}
          <div className="flex overflow-x-auto pb-2 mb-8 gap-1 scrollbar-hide">
            {filteredAreas.map((area) => {
              const color = colorClasses[area.color];
              const AreaIcon = area.icon;

              return (
                <button
                  key={area.id}
                  onClick={() => setActiveTab(area.id)}
                  className={`flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === area.id
                      ? `${color.bg} ${color.text} border-2 ${color.border} shadow-sm`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <AreaIcon className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {area.shortName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Contenido de la pestaña activa */}
          {activeArea && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div
                className={`bg-gradient-to-r ${
                  colorClasses[activeArea.color].gradient
                } rounded-t-2xl p-6 text-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <activeArea.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{activeArea.name}</h2>
                    <p className="text-blue-100 mt-1">
                      {activeArea.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeArea.contacts.map((contact, index) => {
                    const ContactIcon = contact.icon;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 ${
                          colorClasses[activeArea.color].border
                        } ${
                          colorClasses[activeArea.color].bg
                        } hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-white">
                            <ContactIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {contact.type}
                            </p>
                            {contact.href ? (
                              <a
                                href={contact.href}
                                className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors block mt-1"
                              >
                                {contact.value}
                              </a>
                            ) : (
                              <p className="text-lg font-bold text-gray-900 mt-1">
                                {contact.value}
                              </p>
                            )}
                            <p className="text-gray-600 text-sm mt-1">
                              {contact.details}
                            </p>
                          </div>
                          {contact.href && (
                            <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-200 mb-6 shadow-sm">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">
              Jr. Damaso Beraún N° 1017, Huánuco, Perú
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda adicional?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Para consultas generales o si no encuentras el contacto específico
            que buscas
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:062638484">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Llamar al Central
              </Button>
            </a>
            <a href="mailto:recursoshumanos@diresahuanuco.gob.pe">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Mail className="h-4 w-4 mr-2" />
                Correo General
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
