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
import { ICliente } from "@/hooks/useClientes";
import { apiService } from "@/services/querys";
import { RefreshCcw } from "lucide-react";

const EstadoDialog = ({
  clientData,
  onDataUpdate,
}: {
  clientData: ICliente;
  onDataUpdate: (updatedItem: ICliente) => void;
}) => {
  const handleChange = async () => {
    const response = await apiService.update(
      `clients/changeState/:id`,
      Number(clientData.dni),
      { state: clientData.estado === "activo" ? "inactivo" : "activo" }
    );


    if (response.ok) {
      onDataUpdate({
        ...clientData,
        estado: clientData.estado === "activo" ? "inactivo" : "activo",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 bg-red-600 hover:bg-red-700">
          Estado <RefreshCcw />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro de cambiar el estado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esto cambiara el estado de la empresa {clientData.nya_razonsocial} a{" "}
            {clientData.estado === "Activo" ? "Inactivo" : "Activo"} dentro del
            sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleChange}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EstadoDialog;
