import { apiService } from "@/services/querys";
import { useState, useEffect } from "react";

// Definición de tipo para los usuarios
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: "Activo" | "Inactivo";
}

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null); // Resetear error antes de hacer la nueva consulta

      const response = await apiService.getAll("users"); // Suponiendo que "usuarios" es el endpoint

      if (response.ok) {
        setUsuarios(response.data || []); // Establecer los datos de usuarios en el estado
      } else {
        setError(response.message); // En caso de error, establecer el mensaje de error
      }
      setLoading(false); // Finalizar la carga
    };

    fetchUsuarios();
  }, []);

  return { usuarios, loading, error, setUsuarios };
};

export default useUsuarios;
