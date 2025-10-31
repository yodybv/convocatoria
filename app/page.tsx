"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ConvocatoriasCategorias from "@/components/convocatorias-categorias"
import ConvocatoriasGrid from "@/components/convocatorias-grid"
import Footer from "@/components/footer"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ConvocatoriasCategorias selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <ConvocatoriasGrid selectedCategory={selectedCategory} />
      <Footer />
    </main>
  )
}
