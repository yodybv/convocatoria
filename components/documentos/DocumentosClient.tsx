 // components/documentos/DocumentosClient.tsx
"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Download, Search, RefreshCw, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import type { Documento, DocumentosClientProps, ApiResponse } from "@/types/documentos";

type ErrorState = {
  message: string;
  retry?: () => void;
};

const ITEMS_PER_PAGE_OPTIONS = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export default function DocumentosClient({
  tipo,
  titulo = "DOCUMENTOS NORMATIVOS",
}: DocumentosClientProps) {
  const router = useRouter();

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener año desde la fecha
  const obtenerAnio = useCallback((fecha: string | null | undefined) => {
    if (!fecha) return "Sin año";

    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) {
        const añoMatch = fecha.match(/\b(20\d{2})\b/);
        return añoMatch ? añoMatch[1] : "Sin año";
      }
      return date.getFullYear().toString();
    } catch {
      return "Sin año";
    }
  }, []);

  // Documento reciente (<= 7 días)
  const esDocumentoReciente = useCallback((fecha: string | null | undefined) => {
    if (!fecha) return false;
    try {
      const fechaDoc = new Date(fecha);
      if (isNaN(fechaDoc.getTime())) return false;

      const hoy = new Date();
      const diffMs = hoy.getTime() - fechaDoc.getTime();
      const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      return diffDias <= 7;
    } catch {
      return false;
    }
  }, []);

  // Cargar documentos por CATEGORÍA
  const fetchDocumentos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "https://sistemas.diresahuanuco.gob.pe/Api";
      const baseUrl = API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`;
      const apiUrl = `${baseUrl}get_rrhh.php?categoria=${encodeURIComponent(tipo)}`;

      console.log("🔍 Fetching documentos from:", apiUrl);

      const response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseData: ApiResponse = await response.json();
      console.log("📄 API Response:", responseData);

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      const data = responseData.data || [];
      if (!Array.isArray(data)) {
        throw new Error("Formato de datos incorrecto: se esperaba un array");
      }

      const documentosOrdenados = [...data].sort((a, b) => {
        const fechaA = new Date(a.fecha || 0).getTime();
        const fechaB = new Date(b.fecha || 0).getTime();
        return fechaB - fechaA;
      });

      setDocumentos(documentosOrdenados);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Error fetching documentos:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido al cargar los documentos";
      setError({
        message: errorMessage,
        retry: fetchDocumentos,
      });
    } finally {
      setIsLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    fetchDocumentos();
  }, [fetchDocumentos]);

  // Descargar documento
  const handleDownloadDocument = useCallback((documento: Documento) => {
    try {
      let fileUrl = documento.url;

      if (!/^https?:\/\//i.test(fileUrl)) {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "https://sistemas.diresahuanuco.gob.pe/Api";
        const baseUrl = API_BASE.replace(/\/?Api\/?$/, "/");
        fileUrl = `${baseUrl}${
          documento.url.startsWith("/") ? documento.url.slice(1) : documento.url
        }`;
      }

      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const nombreArchivo = documento.descripcion
        ? `${documento.descripcion}.pdf`
        : `documento_${documento.id}.pdf`;

      link.download = nombreArchivo.replace(/\s+/g, "_");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert(`Error al descargar el archivo: ${documento.descripcion}`);
    }
  }, []);

  // Filtro
  const filteredDocumentos = useMemo(() => {
    if (!searchTerm.trim()) return documentos;

    const searchLower = searchTerm.toLowerCase().trim();
    return documentos.filter((doc) =>
      doc.descripcion.toLowerCase().includes(searchLower)
    );
  }, [documentos, searchTerm]);

  // Paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocumentos = useMemo(
    () => filteredDocumentos.slice(startIndex, startIndex + itemsPerPage),
    [filteredDocumentos, startIndex, itemsPerPage]
  );

  const paginationInfo = useMemo(() => {
    const totalItems = filteredDocumentos.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const startItem = totalItems > 0 ? startIndex + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return { totalPages, totalItems, startItem, endItem };
  }, [filteredDocumentos.length, currentPage, itemsPerPage, startIndex]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
        setCurrentPage(newPage);
      }
    },
    [paginationInfo.totalPages]
  );

  const LoadingState = () => (
    <div className="text-center py-16">
      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
      <p className="text-gray-600">Cargando documentos...</p>
    </div>
  );

  const ErrorStateComponent = ({ error }: { error: ErrorState }) => (
    <div className="p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error.message}</span>
          {error.retry && (
            <Button variant="outline" size="sm" onClick={error.retry} className="ml-4">
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
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="bg-blue-700 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="bg-white border-white text-blue-700 hover:bg-blue-600 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Volver
                </Button>
                <h1 className="text-2xl font-bold">{titulo}</h1>
              </div>
              <div className="text-sm opacity-90">
                Total: {filteredDocumentos.length} documentos
              </div>
            </div>
          </div>

          {/* Controles */}
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
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
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
                  placeholder="Buscar en descripción..."
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

          {/* Estados */}
          {isLoading && <LoadingState />}
          {error && <ErrorStateComponent error={error} />}

          {/* Empty state */}
          {!isLoading && !error && filteredDocumentos.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No se encontraron documentos
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? `No hay resultados para "${searchTerm}"`
                  : "No hay documentos disponibles para esta categoría"}
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

          {/* Tabla */}
          {!isLoading && !error && filteredDocumentos.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-16">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                        Año
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold w-32">
                        Descargar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDocumentos.map((documento, index) => {
                      const numeroItem = startIndex + index + 1;
                      const año = obtenerAnio(documento.fecha);
                      const esNuevo = esDocumentoReciente(documento.fecha);

                      return (
                        <tr
                          key={documento.id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-50 transition-colors duration-150`}
                        >
                          {/* # */}
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 w-16 text-center">
                            {numeroItem}
                          </td>

                          {/* DESCRIPCIÓN */}
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-start gap-3 max-w-xl break-words">
                              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 mb-1">
                                  {documento.descripcion}
                                </div>

                                {/* Solo badge NUEVO si es reciente */}
                                {esNuevo && (
                                  <Badge className="text-xs bg-green-600 text-white mt-1">
                                    Nuevo
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* AÑO */}
                          <td className="px-4 py-3 w-24">
                            <div className="text-center">
                              <Badge
                                variant="outline"
                                className="text-sm font-mono bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {año}
                              </Badge>
                            </div>
                          </td>

                          {/* DESCARGAR */}
                          <td className="px-4 py-3 w-32">
                            <Button
                              onClick={() => handleDownloadDocument(documento)}
                              className="w-full"
                              size="sm"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Descargar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Mostrando {paginationInfo.startItem} a {paginationInfo.endItem} de{" "}
                    {paginationInfo.totalItems} registros
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
    </div>
  );
}
