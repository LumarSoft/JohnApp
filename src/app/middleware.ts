import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Interfaces para tipado seguro
interface TokenPayload {
  userId: string;
  role: string;
  exp: number;
}

// Configuración de rutas
const AUTH_ROUTES = {
  public: ["/"],
  protected: ["/botWhatsApp", "/rechazos", "/clientes", "/usuarios"],
  dashboard: "/botWhatsApp",
};

export async function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const token = request.cookies.get("authToken")?.value;

  // Determinar el tipo de ruta actual
  const currentPath = request.nextUrl.pathname;
  const isPublicRoute = AUTH_ROUTES.public.includes(currentPath);
  const isProtectedRoute = AUTH_ROUTES.protected.some(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );
  // Función para verificar token
  const validateToken = async (token: string) => {
    try {
      const { payload } = await jwtVerify<TokenPayload>(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return payload;
    } catch (error) {
      return null;
    }
  };

  // Lógica para rutas protegidas
  if (isProtectedRoute) {
    // No hay token en ruta protegida
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Validar token
    const payload = await validateToken(token);
    if (!payload) {
      // Token inválido
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  // Lógica para rutas de autenticación
  if (isPublicRoute) {
    // Si hay token en ruta pública
    if (token) {
      const payload = await validateToken(token);

      if (payload) {
        // Token válido, redirigir al dashboard
        return NextResponse.redirect(
          new URL(AUTH_ROUTES.dashboard, request.url)
        );
      }
    }
  }

  console.log("Current Path:", currentPath);
  console.log("Is Protected Route:", isProtectedRoute);
  console.log("Token:", token);

  return NextResponse.next();
}

// Configuración de rutas a verificar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
