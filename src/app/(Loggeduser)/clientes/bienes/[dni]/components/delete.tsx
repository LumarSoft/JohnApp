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
import { apiService } from "@/services/querys";
import { Trash } from "lucide-react";

export const DeleteDialog = ({
  bien,
  setBienes,
}: {
  bien: any;
  setBienes: any;
}) => {
  const handleDelete = async () => {
    try {
      const result = await apiService.delete("goods/:id", bien.id_bien);
      if (result.statusCode === 200) {
        setBienes((prev: any) =>
          prev.filter((b: any) => b.id_bien !== bien.id_bien)
        );
      }
    } catch (error) {
      console.error("Error al eliminar el bien:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro de eliminar el bien?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
