export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold">
            Oportunidades de Empleo
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Convocatorias de Trabajo</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Únete a la Dirección Regional de Salud Huánuco. Explora nuestras diferentes modalidades de contratación y
          desarrolla tu carrera profesional.
        </p>
      </div>
    </section>
  )
}
