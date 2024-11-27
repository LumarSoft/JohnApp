"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { LoadingPage } from "./LoadingPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    // Solo hacer la verificación cuando termine de cargar
    if (!isLoading) {
      // Si no está autenticado, redirigir al login
      if (isAuthenticated === false) {
        router.push("/");
        return;
      }

      // Si se requieren roles específicos
      if (requiredRoles && user) {
        const hasRequiredRole = requiredRoles.includes(user.rol);
        if (!hasRequiredRole) {
          router.push("/unauthorized");
          return;
        }
      }
    }
  }, [isAuthenticated, user, router, requiredRoles, isLoading]);

  // Mostrar un indicador de carga mientras se verifica
  if (isLoading) {
    return <LoadingPage />;
  }

  // Si no está autenticado, no mostrar nada
  if (isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
};
