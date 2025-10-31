import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-lg">
              DS
            </div>
            <div>
              <h1 className="text-lg font-bold">DIRESA Huánuco</h1>
              <p className="text-xs opacity-90">Recursos Humanos</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#convocatorias" className="hover:opacity-80 transition-opacity text-sm">
              Convocatorias
            </a>
            <a href="#información" className="hover:opacity-80 transition-opacity text-sm">
              Información
            </a>
            <a href="#contacto" className="hover:opacity-80 transition-opacity text-sm">
              Contacto
            </a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/20">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
