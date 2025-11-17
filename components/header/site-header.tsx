"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Quienes Somos", href: "/" },
    {
      name: "Direcciones",
      href: "#",
      dropdownBg: "bg-gradient-to-r from-blue-50 to-cyan-50",
      dropdown: [
        { name: "Recursos Humanos", href: "/" },
        { name: "Gestión de Recursos Humanos", href: "/" },
        { name: "Desarrollo de Recursos Humanos", href: "/" },
      ],
    },
    {
      name: "Acceso",
      href: "#",
      dropdownBg: "bg-gradient-to-r from-green-50 to-emerald-50",
      dropdown: [
        {
          name: "FUT",
          href: "https://publicaciones.diresahuanuco.gob.pe/index.php/s/mr1cxGVQIZoTzTa",
        },
        { name: "SERUMS", href: "/SERUMS" },
        { name: "Documentos Normativos", href: "/" },
        { name: "INFORHUS", href: "https://inforhus.minsa.gob.pe/login.php/" },
      ],
    },
    { name: "Trabajando con nosotros", href: "/categorias" },
    { name: "Contacto", href: "/rrhh/contacto" },
  ];

  // Cerrar dropdowns cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Pequeño delay para evitar cierre accidental
  };

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(062) 638484</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>recursoshumanos@diresahuanuco.gob.pe</span>
            </div>
          </div>
          <div className="text-xs mt-1 sm:mt-0 bg-primary/80 px-3 py-1 rounded-full">
            DIRESA - HUÁNUCO
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/diresa-logo.png"
                alt="DIRESA Logo"
                className="h-14 w-auto"
              />
              <span className="sr-only">DIRESA Huánuco</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown?.length;
              return (
                <div
                  key={item.name}
                  className="relative dropdown-container"
                  onMouseEnter={
                    hasDropdown ? () => handleMouseEnter(item.name) : undefined
                  }
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  {hasDropdown ? (
                    <div className="relative">
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md flex items-center gap-1"
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </Button>

                      {activeDropdown === item.name && (
                        <div
                          className={`absolute top-full left-0 mt-1 w-64 shadow-lg rounded-lg border border-gray-200 py-2 z-50 ${item.dropdownBg}`}
                        >
                          {item.dropdown!.map((d) => {
                            const isExt = d.href.startsWith("http");
                            const content = (
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-primary/60 rounded-full" />
                                {d.name}
                              </div>
                            );
                            return isExt ? (
                              <a
                                key={d.name}
                                href={d.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-gray-800 hover:bg-white/80 hover:text-primary transition-all duration-200 rounded mx-2 hover:shadow-sm"
                                onClick={closeAll}
                              >
                                {content}
                              </a>
                            ) : (
                              <Link
                                key={d.name}
                                href={d.href}
                                className="block px-4 py-2 text-gray-800 hover:bg-white/80 hover:text-primary transition-all duration-200 rounded mx-2 hover:shadow-sm"
                                onClick={closeAll}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                      asChild
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden bg-transparent border-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const hasDropdown = !!item.dropdown?.length;
                return (
                  <div key={item.name} className="dropdown-container">
                    {hasDropdown ? (
                      <div className="flex flex-col gap-1">
                        <Button
                          className="justify-between bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                          onClick={() => handleDropdownToggle(item.name)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </Button>

                        {activeDropdown === item.name && (
                          <div
                            className={`ml-4 flex flex-col gap-1 mt-1 p-2 rounded-lg ${item.dropdownBg}`}
                          >
                            {item.dropdown!.map((d) => {
                              const isExt = d.href.startsWith("http");
                              const content = (
                                <div className="flex items-center gap-2">
                                  <div className="w-1 h-4 bg-primary/60 rounded-full" />
                                  {d.name}
                                </div>
                              );
                              return isExt ? (
                                <a
                                  key={d.name}
                                  href={d.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-white/80 hover:text-primary transition-all duration-200"
                                  onClick={closeAll}
                                >
                                  {content}
                                </a>
                              ) : (
                                <Link
                                  key={d.name}
                                  href={d.href}
                                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-white/80 hover:text-primary transition-all duration-200"
                                  onClick={closeAll}
                                >
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="justify-start bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                        onClick={closeAll}
                        asChild
                      >
                        <Link href={item.href}>{item.name}</Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
