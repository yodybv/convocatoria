// types/convocatorias.ts

// 👉 Lista única de IDs de categoría. Agrega aquí cuando quieras nuevas.
export type CategoryId =
  | "todas"
  | "cas"
  | "dl-728"
  | "dl-276"
  | "locacion"
  | "practicas"
  | "cambio_grupo_ocupacional"
  | "reasignacion"
  | "nombramiento-asistencial"
  | "nombramiento-administrativo"
  | "ascenso";

// 👉 Mapea el ID de categoría al texto EXACTO que guarda tu BD en `tipos_convocatoria.nombre`
export const CATEGORY_TO_TIPO: Record<Exclude<CategoryId, "todas">, string> = {
  cas: "CAS",
  "dl-728": "DL 728",
  "dl-276": "DL 276",
  locacion: "Locación de servicios",
  practicas: "Prácticas",
  cambio_grupo_ocupacional: "Cambio de Grupo Ocupacional",
  reasignacion: "Reasignación",
  "nombramiento-asistencial": "Nombramiento Asistencial",
  "nombramiento-administrativo": "Nombramiento Administrativo",
  ascenso: "Ascenso",
};

// 👉 Título bonito para la UI
export const CATEGORY_TITLE: Record<CategoryId | "todas", string> = {
  todas: "TODAS LAS CONVOCATORIAS",
  cas: "CONVOCATORIAS CAS (D.L. 1057)",
  "dl-728": "CONVOCATORIAS D.L. 728",
  "dl-276": "CONVOCATORIAS D.L. 276",
  locacion: "CONVOCATORIAS LOCACIÓN DE SERVICIOS",
  practicas: "CONVOCATORIAS DE PRÁCTICAS",
  cambio_grupo_ocupacional: "CAMBIO DE GRUPO OCUPACIONAL",
  reasignacion: "CONVOCATORIAS DE REASIGNACIÓN",
  "nombramiento-asistencial": "NOMBRAMIENTO ASISTENCIAL",
  "nombramiento-administrativo": "NOMBRAMIENTO ADMINISTRATIVO",
  ascenso: "CONVOCATORIAS DE ASCENSO",
};

// 👉 Metadatos base (sin íconos) que puedes reutilizar en portada u otras vistas
export type CategoryMeta = {
  id: Exclude<CategoryId, "todas">; // normalmente no mostramos "todas" en menús internos
  label: string;
  description: string;
  href: string;
};

export const CATEGORIES_BASE: CategoryMeta[] = [
  { id: "cas", label: "CAS", description: "Contratación Administrativa (DL 1057)", href: "/convocatorias/cas" },
  { id: "dl-728", label: "DL 728", description: "Régimen de la actividad privada", href: "/convocatorias/dl-728" },
  { id: "dl-276", label: "DL 276", description: "Carrera Administrativa", href: "/convocatorias/dl-276" },
  { id: "locacion", label: "Locación", description: "Locación de servicios", href: "/convocatorias/locacion" },
  { id: "practicas", label: "Prácticas", description: "Formación pre/profesional", href: "/convocatorias/practicas" },
  {
    id: "cambio_grupo_ocupacional",
    label: "Cambio de Grupo",
    description: "Cambio de grupo ocupacional",
    href: "/convocatorias/cambio_grupo_ocupacional",
  },
  { id: "reasignacion", label: "Reasignación", description: "Traslado entre plazas", href: "/convocatorias/reasignacion" },
  {
    id: "nombramiento-asistencial",
    label: "Nombramiento Asistencial",
    description: "Personal asistencial",
    href: "/convocatorias/nombramiento-asistencial",
  },
  {
    id: "nombramiento-administrativo",
    label: "Nombramiento Administrativo",
    description: "Personal administrativo",
    href: "/convocatorias/nombramiento-administrativo",
  },
  { id: "ascenso", label: "Ascenso", description: "Promoción por méritos", href: "/convocatorias/ascenso" },
];
