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
import { Usuario } from "@/hooks/useUsuarios";
import { apiService } from "@/services/querys";
import { RefreshCcw } from "lucide-react";

const ChangeState = ({ user }: { user: Usuario }) => {
  const handleStateChange = async () => {
    try {
      const result = await apiService.update("users/state/:id", user.id, {
        estado: user.estado === "Activo" ? "Inactivo" : "Activo",
      });
      if (result.statusCode === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <RefreshCcw />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Quiere cambiar el estado del usuario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción cambiará el estado del usuario
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleStateChange}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeState;
