import { apiService } from "@/services/querys";
import { useEffect, useState, useCallback } from "react";

export interface IPoliza {
  certificado: string;
  articulo: string;
  descripcion: string;
  rama: string;
  date_from: Date ;
  date_to: Date ;
}

const usePolizas = (dniClient: string, isDialogOpen: boolean) => {
  const [polizas, setPolizas] = useState<IPoliza[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolizas = useCallback(async () => {
    if (!isDialogOpen) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getById(
        "policies/:id",
        Number(dniClient)
      );
      console.log(response.data);
      if (response.ok) {
        setPolizas(response.data || []);
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

  return { polizas, loading, error };
};

export default usePolizas;
