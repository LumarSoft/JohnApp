import { apiService } from "@/services/querys";
import { useEffect, useState } from "react";

export interface ICliente {
  dni: string;
  nya_razonsocial: string;
  cuit: string;
  localidad: string;
  celular: string;
  direccion: string;
  email: string;
  agenda: string;
  estado: string;
}

const useClientes = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      setError(null); // Resetear error antes de hacer la nueva consulta

      const response = await apiService.getAll("clients"); // Suponiendo que "clientes" es el endpoint

      if (response.ok) {
        setClientes(response.data || []); // Establecer los datos de clientes en el estado
      } else {
        setError(response.message); // En caso de error, establecer el mensaje de error
      }
      setLoading(false); // Finalizar la carga
    };

    fetchClientes();
  }, []);

  return { clientes, loading, error, setClientes };
};

export default useClientes;
