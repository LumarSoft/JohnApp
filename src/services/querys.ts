import { BASE_API_URL } from "@/shared/providers/envProvider";
import { z } from "zod";

// Revalidate para Next.js
export const revalidate = 1;

if (!BASE_API_URL) {
  throw new Error("No se ha configurado la URL base de la API");
}

const BaseResponseSchema = z.object({
  ok: z.boolean(),
  status: z.string(),
  statusCode: z.number(),
  message: z.string(),
  data: z.any().nullable(),
});

type BaseResponse = z.infer<typeof BaseResponseSchema>;

// Interfaz para opciones de fetch
interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any> | string; // Cambiado de FormData a Record<string, any>
  headers?: Record<string, string>;
  cache?: RequestCache;
}

// Función genérica para manejo de errores y respuestas
const fetchWithErrorHandling = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<BaseResponse> => {
  try {
    const defaultOptions: FetchOptions = {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Construir URL completa
    const url = `${BASE_API_URL}/${endpoint}`;

    console.log("Realizando solicitud a:", url);

    // Si hay body, lo convertimos a JSON (solo si no es una cadena ya)
    if (mergedOptions.body && typeof mergedOptions.body !== "string") {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
      mergedOptions.headers = {
        ...mergedOptions.headers,
        "Content-Type": "application/json", // Indicamos que estamos enviando JSON
      };
    }

    // Realizar la solicitud
    const response = await fetch(url, {
      method: mergedOptions.method,
      headers: mergedOptions.headers,
      body: mergedOptions.body,
      cache: mergedOptions.cache,
    });

    // Manejar respuestas no exitosas
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      return {
        ok: false,
        status: "error",
        statusCode: response.status,
        message: errorDetails.message || "Error desconocido",
        data: null,
      };
    }

    // Parsear respuesta JSON
    const responseData = await response.json();

    // Validar estructura de respuesta
    return BaseResponseSchema.parse(responseData);
  } catch (error: unknown) {
    // Manejo de errores de red o parsing
    console.error("Error en la solicitud:", error);

    return {
      ok: false,
      status: "error",
      statusCode: 500,
      message: error instanceof Error ? error.message : "Error desconocido",
      data: null,
    };
  }
};

// Funciones específicas de operaciones CRUD
export const apiService = {
  // Obtener todos los registros
  getAll: (endpoint: string) => fetchWithErrorHandling(endpoint),

  // Obtener un registro por ID
  getById: (endpoint: string, id: number) =>
    fetchWithErrorHandling(endpoint.replace(":id", id.toString())),

  // Crear un nuevo registro
  create: (
    endpoint: string,
    data: Record<string, any> // Cambiado de FormData a Record<string, any>
  ) =>
    fetchWithErrorHandling(endpoint, {
      method: "POST",
      body: data, // Se envía el objeto directamente
    }),

  // Actualizar un registro
  update: (
    endpoint: string,
    id: number,
    data: Record<string, any> // Cambiado de FormData a Record<string, any>
  ) =>
    fetchWithErrorHandling(endpoint.replace(":id", id.toString()), {
      method: "PUT",
      body: data, // Se envía el objeto directamente
    }),

  // Eliminar un registro
  delete: (endpoint: string, id: number) =>
    fetchWithErrorHandling(endpoint.replace(":id", id.toString()), {
      method: "DELETE",
    }),
};
