// app/rrhh/contactos/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

// Datos de contacto organizados por áreas
const contactAreas = [
  {
    name: "Dirección Ejecutiva de Gestión y Desarrollo de Recursos Humanos",
    description: "Dirección general y coordinación estratégica",
    icon: Building2,
    color: "from-blue-600 to-blue-800",
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
        value: "direccion.rrhh@diresahuanuco.gob.pe",
        details: "Respuesta en 24-48 horas",
        icon: Mail,
        href: "mailto:direccion.rrhh@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    name: "Oficina de Gestión de Recursos Humanos",
    description: "Administración y gestión del personal",
    icon: Users,
    color: "from-green-600 to-green-800",
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
        value: "gestion.rrhh@diresahuanuco.gob.pe",
        details: "Atención personalizada",
        icon: Mail,
        href: "mailto:gestion.rrhh@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    name: "Oficina de Desarrollo de Recursos Humanos",
    description: "Capacitación y desarrollo profesional",
    icon: GraduationCap,
    color: "from-purple-600 to-purple-800",
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
        value: "desarrollo.rrhh@diresahuanuco.gob.pe",
        details: "Información sobre capacitaciones",
        icon: Mail,
        href: "mailto:desarrollo.rrhh@diresahuanuco.gob.pe",
      },
    ],
  },
  {
    name: "Área de Remuneraciones",
    description: "Gestión de planillas y compensaciones",
    icon: DollarSign,
    color: "from-amber-600 to-orange-600",
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
    name: "Bienestar Social",
    description: "Programas de bienestar y apoyo al personal",
    icon: HeartHandshake,
    color: "from-pink-600 to-rose-600",
    contacts: [
      {
        type: "Teléfono",
        value: "(062) 638484",
        details: "Anexo 251",
        icon: Phone,
        href: "tel:062638484",
      },
      {
        type: "Correo Electrónico",
        value: "bienestar.social@diresahuanuco.gob.pe",
        details: "Atención psicológica y social",
        icon: Mail,
        href: "mailto:bienestar.social@diresahuanuco.gob.pe",
      },
    ],
  },
];

// Información general de la oficina
const officeInfo = {
  address: "Jr. Damaso Beraún N° 1017, Huánuco, Perú",
  schedule: "Lunes a Viernes: 8:30 AM - 5:30 PM",
  emergency: "Para urgencias, contactar al -  062-638484 anexo 412",
};

export default function ContactosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/rrhh">
              <Button
                variant="outline"
                size="sm"
                className="bg-green border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
            <div className="inline-flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Shield className="h-4 w-4" />
              RRHH
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Información de Contacto
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Encuentra aquí los canales de comunicación directa con cada área
              de Recursos Humanos de la DIRESA Huánuco
            </p>
          </div>
        </div>
      </section>

      {/* Información General */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="inline-flex p-3 rounded-xl bg-blue-100 text-blue-600 mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
              <p className="text-sm text-gray-600">{officeInfo.address}</p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-600 mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Horario de Atención
              </h3>
              <p className="text-sm text-gray-600">{officeInfo.schedule}</p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex p-3 rounded-xl bg-amber-100 text-amber-600 mb-3">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Información Importante
              </h3>
              <p className="text-sm text-gray-600">{officeInfo.emergency}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contactos por Área */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contactos por Área
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecciona el área específica con la que necesitas comunicarte
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {contactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Header de la tarjeta */}
                  <div
                    className={`bg-gradient-to-r ${area.color} rounded-t-2xl p-6 text-white`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{area.name}</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lista de contactos */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {area.contacts.map((contact, contactIndex) => {
                        const ContactIcon = contact.icon;
                        return (
                          <div
                            key={contactIndex}
                            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0 p-2 rounded-lg bg-white border border-gray-200">
                              <ContactIcon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {contact.type}
                                  </p>
                                  {contact.href ? (
                                    <a
                                      href={contact.href}
                                      className="text-blue-600 hover:text-blue-800 font-semibold text-lg block mt-1 transition-colors"
                                    >
                                      {contact.value}
                                    </a>
                                  ) : (
                                    <p className="text-gray-900 font-semibold text-lg mt-1">
                                      {contact.value}
                                    </p>
                                  )}
                                  <p className="text-gray-500 text-sm mt-1">
                                    {contact.details}
                                  </p>
                                </div>
                                {contact.href && (
                                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-2" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sección de Ayuda */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Si necesitas asistencia adicional o no encuentras el contacto
            específico, puedes comunicarte directamente con la Dirección
            Ejecutiva.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:062638484">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                Llamar al Central
              </Button>
            </a>
            <a href="mailto:direccion.rrhh@diresahuanuco.gob.pe">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enviar Correo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
