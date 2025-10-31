"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

interface Convocatoria {
  id: string
  titulo: string
  tipo: string
  posiciones: number
  ubicacion: string
  fechaCierre: string
  descripcion: string
  requisitos: string[]
  categoria: string
}

const convocatorias: Convocatoria[] = [
  {
    id: "1",
    titulo: "Médicos Especialistas",
    tipo: "CAS",
    posiciones: 5,
    ubicacion: "Huánuco",
    fechaCierre: "2025-11-30",
    descripcion: "Se convocan profesionales en medicina especializada para fortalecer nuestros servicios de atención",
    requisitos: ["Cédula profesional vigente", "Experiencia mínima 2 años", "Dominio de sistemas"],
    categoria: "cas",
  },
  {
    id: "2",
    titulo: "Enfermeras/os",
    tipo: "DL 276",
    posiciones: 8,
    ubicacion: "Huánuco",
    fechaCierre: "2025-12-15",
    descripcion: "Contratación de personal de enfermería bajo marco legal del Decreto Legislativo 276",
    requisitos: ["Título de licenciado en enfermería", "Colegiatura activa", "Antecedentes limpios"],
    categoria: "dl276",
  },
  {
    id: "3",
    titulo: "Ascenso - Jefes de Área",
    tipo: "Ascensos",
    posiciones: 3,
    ubicacion: "Huánuco",
    fechaCierre: "2025-11-20",
    descripcion: "Convocatoria interna para ascenso de personal a puestos de jefatura",
    requisitos: ["Estar en planilla", "Antigüedad mínima 5 años", "Evaluación de desempeño aprobada"],
    categoria: "ascensos",
  },
  {
    id: "4",
    titulo: "Cambio de Grupo - Técnicos",
    tipo: "Cambio de Grupo Ocupacional",
    posiciones: 4,
    ubicacion: "Huánuco",
    fechaCierre: "2025-12-05",
    descripcion: "Posibilidad de cambio de grupo ocupacional para personal técnico capacitado",
    requisitos: ["Capacitación técnica acreditada", "Recomendación del jefe directo", "Prueba de competencia"],
    categoria: "grupo",
  },
  {
    id: "5",
    titulo: "Programa de Prácticas - Administrativo",
    tipo: "Prácticas",
    posiciones: 10,
    ubicacion: "Huánuco",
    fechaCierre: "2025-11-25",
    descripcion: "Programa de formación para estudiantes en áreas administrativas y de recursos humanos",
    requisitos: ["Estar en último año de carrera", "Matrícula actual", "Promedio mínimo 13"],
    categoria: "practicas",
  },
  {
    id: "6",
    titulo: "Técnicos en Informática",
    tipo: "CAS",
    posiciones: 3,
    ubicacion: "Huánuco",
    fechaCierre: "2025-12-10",
    descripcion: "Profesionales en informática para soporte técnico y mantenimiento de sistemas",
    requisitos: ["Título técnico acreditado", "Experiencia 3 años", "Certificación en redes"],
    categoria: "cas",
  },
  {
    id: "7",
    titulo: "Prácticas - Enfermería",
    tipo: "Prácticas",
    posiciones: 15,
    ubicacion: "Huánuco",
    fechaCierre: "2025-12-20",
    descripcion: "Oportunidad de prácticas pre-profesionales en servicios de enfermería",
    requisitos: ["Estar matriculado en enfermería", "Haber aprobado clínica I", "Certificado de salud"],
    categoria: "practicas",
  },
  {
    id: "8",
    titulo: "Administrativos",
    tipo: "DL 276",
    posiciones: 6,
    ubicacion: "Huánuco",
    fechaCierre: "2025-11-28",
    descripcion: "Personal administrativo para fortalecer capacidades en áreas de gestión",
    requisitos: ["Educación superior", "Experiencia en administración pública", "Office avanzado"],
    categoria: "dl276",
  },
]

const getTypeColor = (tipo: string) => {
  const colors: Record<string, string> = {
    CAS: "bg-blue-100 text-blue-800 border-blue-300",
    "DL 276": "bg-green-100 text-green-800 border-green-300",
    Ascensos: "bg-purple-100 text-purple-800 border-purple-300",
    "Cambio de Grupo Ocupacional": "bg-orange-100 text-orange-800 border-orange-300",
    Prácticas: "bg-indigo-100 text-indigo-800 border-indigo-300",
  }
  return colors[tipo] || "bg-gray-100 text-gray-800 border-gray-300"
}

interface Props {
  selectedCategory: string | null
}

export default function ConvocatoriasGrid({ selectedCategory }: Props) {
  const filteredConvocatorias = selectedCategory
    ? convocatorias.filter((c) => c.categoria === selectedCategory)
    : convocatorias

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-12">
          {selectedCategory ? `Convocatorias seleccionadas` : "Todas las convocatorias"} ({filteredConvocatorias.length}
          )
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConvocatorias.map((convocatoria) => (
            <div
              key={convocatoria.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-foreground text-balance">{convocatoria.titulo}</h4>
                  <Badge className={getTypeColor(convocatoria.tipo)}>{convocatoria.tipo}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{convocatoria.descripcion}</p>

                <div className="space-y-2 py-2 border-y border-border">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{convocatoria.posiciones} posiciones disponibles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{convocatoria.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Cierre: {new Date(convocatoria.fechaCierre).toLocaleDateString("es-PE")}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Requisitos principales:</p>
                  <ul className="space-y-1">
                    {convocatoria.requisitos.map((req, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-border">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Ver convocatoria completa
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredConvocatorias.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No hay convocatorias disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  )
}
