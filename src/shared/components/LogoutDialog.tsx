"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LogoutDialog = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir a la página de inicio de sesión
        router.push(data.redirectUrl);
      } else {
        // Manejar error de logout
        console.error("Error de logout:", data.error);
        // Podrías mostrar un toast o mensaje de error
      }
    } catch (error) {
      console.error("Error durante el logout:", error);
      // Manejar errores de red
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"destructive"}>
          Cerrar sesión
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quieres cerrar sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            Si cierras sesión, tendrás que iniciar sesión nuevamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
