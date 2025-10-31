export default function MainHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Dirección Regional de Salud
              </h1>
              <p className="text-sm text-gray-600">
                Sistema de Convocatorias CAS
              </p>
            </div>
          </div>
          <nav className="flex gap-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Inicio</a>
            <a href="/convocatorias" className="text-blue-600 font-semibold">Convocatorias</a>
            <a href="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</a>
          </nav>
        </div>
      </div>
    </header>
  );
}