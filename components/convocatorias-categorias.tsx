"use client"
import { FileText, Briefcase, TrendingUp, Users, BookOpen } from "lucide-react"

interface Props {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

const categories = [
  {
    id: "todas",
    label: "Todas",
    icon: Briefcase,
    description: "Ver todas las convocatorias",
  },
  {
    id: "cas",
    label: "CAS",
    icon: FileText,
    description: "Contrataciones Administrativas",
  },
  {
    id: "dl276",
    label: "DL 276",
    icon: Briefcase,
    description: "Decreto Legislativo 276",
  },
  {
    id: "ascensos",
    label: "Ascensos",
    icon: TrendingUp,
    description: "Promoción de personal",
  },
  {
    id: "grupo",
    label: "Cambio de Grupo",
    icon: Users,
    description: "Cambio de grupo ocupacional",
  },
  {
    id: "practicas",
    label: "Prácticas",
    icon: BookOpen,
    description: "Programa de prácticas",
  },
]

export default function ConvocatoriasCategorias({ selectedCategory, onSelectCategory }: Props) {
  return (
    <section id="convocatorias" className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-12 text-balance">Categorías de Convocatorias</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected =
              selectedCategory === category.id || (selectedCategory === null && category.id === "todas")

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id === "todas" ? null : category.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-semibold text-center">{category.label}</span>
                <span className="text-xs opacity-75 text-center">{category.description}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
