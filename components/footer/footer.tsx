import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            {/* <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold">
                DH
              </div>
              <h3 className="font-bold text-lg">DIRESA Huánuco</h3>
            </div> */}
            <p className="text-sm opacity-90">
              Direccion Ejecutivade Gestión y Desarrollo de Recursos Humanos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/categorias"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Convocatorias
                </a>
              </li>
              <li>
                <a
                  href="convocatorias"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Requisitos
                </a>
              </li>
              <li>
                <a
                  href="/convocatorias"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Resultados
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/rrhh/documentos-normativos"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Normativas
                </a>
              </li>
              <li>
                <a
                  href="http://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=13648&id_tema=1&ver=D#.Xa3ituhKhQD"
                  className="opacity-90 hover:opacity-100 transition-opacity" target="_blank"
                >
                  Transparencia
                </a>
              </li>
              <li>
                <a
                  href="/rrhh/contacto"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+51 (62) 638484</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>recursoshumanos@diresahuanuco.gob.pe</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Huánuco, Perú</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a
                  href="https://diresahuanuco.gob.pe/"
                  target="_blank"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  diresahuanuco.gob.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>
            &copy; 2025 Dirección Regional de Salud Huánuco. Todos los derechos
            reservados.
          </p>
          {/* <p className="mt-2">Plataforma de Convocatorias de Recursos Humanos en Salud</p> */}
        </div>
      </div>
    </footer>
  );
}
