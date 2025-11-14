 // types/documentos.ts
export interface Documento {
  id: number;
  descripcion: string;
  fecha: string;
  url: string;
  categoria: string;
}

export interface ApiResponse {
  data: Documento[];
  total: number;
  status?: string;    // opcional, por si algunos endpoints no lo mandan
  error?: string;
  message?: string;   // por si en el backend usas 'message' en vez de 'error'
}

export interface DocumentosClientProps {
  tipo: 'DESARROLLO' | 'GESTION' | 'SERUMS';
  titulo?: string;    // la hacemos opcional porque en el componente tienes un valor por defecto
}
