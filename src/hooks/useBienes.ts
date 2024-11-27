import { apiService } from "@/services/querys";
import { useEffect, useState, useCallback } from "react";

export interface IBien {
  id_bien: number;
  tipo_bien?: string;
  marca: string;
  modelo: string;
  anio: number;
  patente?: string;
  cobertura: string;
  adicionales: string;
  accesorios: string;
  descripcion?: string;
  actividad?: string;
  ubicacion?: string;
  tipo_contrato?: string;
  dni_asegurado?: string;
  monto: number;
}

const useBienes = (dniClient: string, isDialogOpen: boolean) => {
  const [bienes, setBienes] = useState<IBien[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolizas = useCallback(async () => {
    if (!isDialogOpen) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getById("goods/:id", Number(dniClient));
      console.log(response);
      if (response.ok) {
        setBienes(response.data || []);
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [dniClient, isDialogOpen]);

  useEffect(() => {
    fetchPolizas();
  }, [fetchPolizas]);

  return { bienes, loading, error };
};

export default useBienes;
