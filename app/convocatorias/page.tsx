
 // app/convocatorias/ConvocatoriasClient.tsx
"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import TopHeader from "@/components/header/top-header"; // Componente específico
import MainHeader from "@/components/header/main-header"; // Componente específico
import Footer from "@/components/footer";
import { Download, Search, RefreshCw, AlertCircle, FileText, Award, X, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// ... el resto del código se mantiene EXACTAMENTE igual

// Tipos para Convocatorias basado en tu API
type Documento = {
  id: number;
  tipo_documento: string;
  tipo_documento_id: number;
  titulo: string;
  url: string;
  fecha_publicacion: string;
  tamanio_bytes?: number;
};

type Convocatoria = {
  id: number;
  codigo: string;
  fecha_publicacion: string;
  titulo_convocatoria: string;
  descripcion: string;
  tipo_convocatoria: string;
  estado: string;
  documentos: {
    total: number;
    tipos: string[];
    detalle: Documento[];
  };
  resultados: {
    total: number;
    etapas: string[];
  };
  fecha_fin: string;
  publicado: boolean;
};

type ErrorState = {
  message: string;
  retry?: () => void;
};

const ITEMS_PER_PAGE_OPTIONS = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" }
];

// Orden de prioridad de documentos
const ORDEN_PRIORIDAD: { [key: string]: number } = {
  'Fe de Erratas': 1,
  'Comunicado': 2,
  'Bases': 3,
  'Perfil': 4,
  'Anexo': 5,
  'Resolución': 6,
  'Instructivo': 7,
  'Acta de Evaluación': 8,
  'Otro': 9
};

export default function ConvocatoriasClient() {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<Convocatoria | null>(null);

  // Función para ordenar documentos por importancia
  const ordenarDocumentos = useCallback((documentos: Documento[]) => {
    return [...documentos].sort((a, b) => {
      const prioridadA = ORDEN_PRIORIDAD[a.tipo_documento] || 10;
      const prioridadB = ORDEN_PRIORIDAD[b.tipo_documento] || 10;
      
      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
      }
      
      const fechaA = new Date(a.fecha_publicacion || '2000-01-01');
      const fechaB = new Date(b.fecha_publicacion || '2000-01-01');
      return fechaB.getTime() - fechaA.getTime();
    });
  }, []);

  // Función para detectar documentos recientes (últimos 7 días)
  const esDocumentoReciente = useCallback((fechaPublicacion: string) => {
    try {
      const fechaDoc = new Date(fechaPublicacion);
      const hoy = new Date();
      const diferenciaDias = Math.floor((hoy.getTime() - fechaDoc.getTime()) / (1000 * 60 * 60 * 24));
      return diferenciaDias <= 7;
    } catch {
      return false;
    }
  }, []);

  // Función para obtener variante de badge según tipo de documento
  const getBadgeVariant = (tipoDocumento: string, esReciente: boolean = false) => {
    if (esReciente) return 'default';
    
    switch (tipoDocumento) {
      case 'Fe de Erratas':
        return 'destructive';
      case 'Comunicado':
        return 'secondary';
      case 'Bases':
        return 'outline';
      default:
        return 'outline';
    }
  };

  // Función para cargar convocatorias CAS
  const fetchConvocatorias = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost/codefuerte_rrhh/Api/";
      const baseUrl = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;
      const apiUrl = `${baseUrl}get_convocatoria.php`;
      
      console.log('Calling API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      
      const data = responseData.data || [];
      
      if (!Array.isArray(data)) {
        throw new Error('Formato de datos incorrecto: se esperaba un array');
      }
      
      setConvocatorias(data);
    } catch (err) {
      console.error("Error fetching convocatorias:", err);
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al cargar las convocatorias";
      setError({
        message: errorMessage,
        retry: fetchConvocatorias
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos al montar el componente - solo en cliente
  useEffect(() => {
    fetchConvocatorias();
  }, [fetchConvocatorias]);

  // Función para descargar documentos
  const handleDownloadDocument = useCallback((documento: Documento, convocatoriaCodigo: string) => {
    try {
      let fileUrl = documento.url;
      
      if (!fileUrl.startsWith('http')) {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost/codefuerte_rrhh/Api/";
        const baseUrl = API_BASE.replace('/Api/', '');
        fileUrl = `${baseUrl}${documento.url.startsWith('/') ? documento.url.slice(1) : documento.url}`;
      }
      
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      const extension = documento.url.split('.').pop() || 'pdf';
      const fileName = `${convocatoriaCodigo}_${documento.tipo_documento}_${documento.id}.${extension}`.replace(/\s+/g, '_');
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error al descargar documento:', error);
      alert(`Error al descargar el documento: ${documento.titulo}`);
    }
  }, []);

  // Filtrar convocatorias
  const filteredConvocatorias = useMemo(() => {
    if (!searchTerm.trim()) return convocatorias;
    
    const searchLower = searchTerm.toLowerCase().trim();
    return convocatorias.filter(conv => 
      conv.titulo_convocatoria.toLowerCase().includes(searchLower) ||
      conv.codigo.toLowerCase().includes(searchLower) ||
      conv.descripcion.toLowerCase().includes(searchLower) ||
      conv.estado.toLowerCase().includes(searchLower)
    );
  }, [convocatorias, searchTerm]);

  // Calcular convocatorias paginadas
  const paginatedConvocatorias = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredConvocatorias.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredConvocatorias, currentPage, itemsPerPage]);

  // Calcular información de paginación
  const paginationInfo = useMemo(() => {
    const totalItems = filteredConvocatorias.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    return { totalPages, totalItems, startItem, endItem };
  }, [filteredConvocatorias.length, currentPage, itemsPerPage]);

  // Handlers optimizados
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      setCurrentPage(newPage);
    }
  }, [paginationInfo.totalPages]);

  // Función para obtener color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'en proceso':
        return 'bg-yellow-500';
      case 'finalizado':
        return 'bg-green-500';
      case 'cancelado':
        return 'bg-red-500';
      case 'borrador':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Formatear fecha
  const formatFecha = useCallback((fecha: string) => {
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return fecha;
    }
  }, []);

  // Formatear tamaño de archivo
  const formatFileSize = useCallback((bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }, []);

  // Modal de documentos
  const DocumentosModal = () => {
    if (!selectedConvocatoria) return null;

    const documentosOrdenados = ordenarDocumentos(selectedConvocatoria.documentos.detalle);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Documentos - {selectedConvocatoria.codigo}
              </h3>
              <p className="text-blue-100 text-sm mt-1">
                {selectedConvocatoria.titulo_convocatoria}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedConvocatoria(null)}
              className="text-white hover:bg-blue-600 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {selectedConvocatoria.documentos.detalle && selectedConvocatoria.documentos.detalle.length > 0 ? (
              <div className="space-y-4">
                {documentosOrdenados.map((documento) => {
                  const esReciente = esDocumentoReciente(documento.fecha_publicacion);
                  
                  return (
                    <div key={documento.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={getBadgeVariant(documento.tipo_documento, esReciente)} 
                              className="text-sm"
                            >
                              <div className="flex items-center gap-1">
                                {esReciente && <Sparkles className="w-3 h-3" />}
                                {documento.tipo_documento}
                              </div>
                            </Badge>
                            {documento.tamanio_bytes && (
                              <span className="text-xs text-gray-500">
                                {formatFileSize(documento.tamanio_bytes)}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-900 mb-1">
                            {documento.titulo}
                          </p>
                          {documento.fecha_publicacion && (
                            <p className="text-sm text-gray-500">
                              Publicado: {formatFecha(documento.fecha_publicacion)}
                              {esReciente && (
                                <Badge variant="default" className="ml-2 text-xs">
                                  NUEVO
                                </Badge>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownloadDocument(documento, selectedConvocatoria.codigo)}
                        className="flex-shrink-0 ml-4"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  No hay documentos disponibles
                </h4>
                <p className="text-gray-500">
                  Esta convocatoria no tiene documentos publicados aún.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente de loading
  const LoadingState = () => (
    <div className="text-center py-16">
      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
      <p className="text-gray-600">Cargando convocatorias...</p>
    </div>
  );

  // Componente de error
  const ErrorState = ({ error }: { error: ErrorState }) => (
    <div className="p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error.message}</span>
          {error.retry && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={error.retry}
              className="ml-4"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="bg-blue-700 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">CONVOCATORIAS CAS</h1>
              <div className="text-sm opacity-90">
                Total: {paginationInfo.totalItems} convocatorias
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Mostrar</span>
                <Select 
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-600">registros</span>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Buscar:</span>
                <Input 
                  type="text" 
                  placeholder="Título, código o descripción..." 
                  className="w-full lg:w-64"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="px-2"
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Estados de carga y error */}
          {isLoading && <LoadingState />}
          {error && <ErrorState error={error} />}

          {/* Empty state */}
          {!isLoading && !error && filteredConvocatorias.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No se encontraron convocatorias
              </h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? `No hay resultados para "${searchTerm}"`
                  : "No hay convocatorias CAS disponibles"
                }
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Limpiar filtro
                </Button>
              )}
            </div>
          )}

          {/* Table - ESTRUCTURA CORREGIDA */}
          {!isLoading && !error && filteredConvocatorias.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-32">Fecha Publicación</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold min-w-80">Título de Convocatoria</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-80">Documentos</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-64">Resultados</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-40">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedConvocatorias.map((convocatoria, index) => {
                      const documentosOrdenados = convocatoria.documentos.detalle ? 
                        ordenarDocumentos(convocatoria.documentos.detalle) : [];
                      
                      const documentosRecientes = documentosOrdenados.filter(doc => 
                        esDocumentoReciente(doc.fecha_publicacion)
                      ).length;

                      return (
                        <tr 
                          key={convocatoria.id} 
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-50 transition-colors duration-150`}
                        >
                          {/* FECHA - ANCHO FIJO */}
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 w-32">
                            {formatFecha(convocatoria.fecha_publicacion)}
                          </td>
                          
                          {/* TÍTULO - ANCHO FLEXIBLE */}
                          <td className="px-4 py-3 min-w-80">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {convocatoria.titulo_convocatoria}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {convocatoria.codigo}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {convocatoria.descripcion}
                              </div>
                            </div>
                          </td>

                          {/* DOCUMENTOS - ANCHO FIJO CON SCROLL */}
                          <td className="px-4 py-3 w-80">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium">
                                  {convocatoria.documentos.total} documento(s)
                                </span>
                                {documentosRecientes > 0 && (
                                  <Badge variant="destructive" className="text-xs animate-pulse">
                                    {documentosRecientes} nuevo(s)
                                  </Badge>
                                )}
                              </div>
                              
                              {documentosOrdenados.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                  {documentosOrdenados.map((documento) => {
                                    const esReciente = esDocumentoReciente(documento.fecha_publicacion);
                                    
                                    return (
                                      <div key={documento.id} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded border">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <Badge 
                                            variant={getBadgeVariant(documento.tipo_documento, esReciente)}
                                            className="text-xs whitespace-nowrap flex-shrink-0"
                                          >
                                            <div className="flex items-center gap-1">
                                              {esReciente && <Sparkles className="w-2 h-2" />}
                                              {documento.tipo_documento}
                                            </div>
                                          </Badge>
                                          <span 
                                            className="text-xs truncate flex-1 cursor-help" 
                                            title={documento.titulo}
                                          >
                                            {documento.titulo}
                                          </span>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 flex-shrink-0"
                                          onClick={() => handleDownloadDocument(documento, convocatoria.codigo)}
                                          title={`Descargar ${documento.tipo_documento}`}
                                        >
                                          <Download className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 italic">
                                  No hay documentos disponibles
                                </div>
                              )}
                            </div>
                          </td>

                          {/* RESULTADOS - ANCHO FIJO */}
                          <td className="px-4 py-3 w-64">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium">
                                  {convocatoria.resultados.total} resultado(s)
                                </span>
                              </div>
                              {convocatoria.resultados.etapas && convocatoria.resultados.etapas.length > 0 ? (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {convocatoria.resultados.etapas.slice(0, 3).map((etapa, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                                      {etapa}
                                    </Badge>
                                  ))}
                                  {convocatoria.resultados.etapas.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{convocatoria.resultados.etapas.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 italic">
                                  Sin resultados publicados
                                </div>
                              )}
                            </div>
                          </td>

                          {/* ESTADO - ANCHO FIJO */}
                          <td className="px-4 py-3 w-40">
                            <div className="flex flex-col gap-1">
                              <Badge className={`${getEstadoColor(convocatoria.estado)} text-white w-fit`}>
                                {convocatoria.estado}
                              </Badge>
                              {convocatoria.fecha_fin && (
                                <div className="text-xs text-gray-500">
                                  Hasta: {formatFecha(convocatoria.fecha_fin)}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Mostrando {paginationInfo.startItem} a {paginationInfo.endItem} de {paginationInfo.totalItems} registros
                    {searchTerm && (
                      <span className="text-blue-600 ml-1">
                        (filtrado de {convocatorias.length} total)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Anterior
                    </Button>
                    
                    <span className="text-sm px-3 py-1 bg-white rounded border">
                      {currentPage} / {paginationInfo.totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= paginationInfo.totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <DocumentosModal />
    </div>
  );
}