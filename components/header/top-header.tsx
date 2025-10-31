export default function TopHeader() {
  return (
    <div className="bg-blue-900 text-white py-2 px-4 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <span>Gobierno Regional - Dirección Regional de Salud</span>
        <div className="flex gap-4">
          <span>Contacto: (064) 123456</span>
          <span>Email: info@diresa.gob.pe</span>
        </div>
      </div>
    </div>
  );
}