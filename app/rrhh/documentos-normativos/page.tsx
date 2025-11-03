// app/rrhh/documentos-normativos/page.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DocumentosNormativos() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Documentos Normativos</h1>
        <p className="mt-2 text-muted-foreground">Compendio de resoluciones, directivas, formatos, etc.</p>
        {/* TODO: listar archivos o enlazar a tu backend si ya los tienes registrados */}
      </section>
      <Footer />
    </main>
  );
}
