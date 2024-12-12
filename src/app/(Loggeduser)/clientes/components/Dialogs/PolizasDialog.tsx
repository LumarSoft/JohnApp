import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICliente } from "@/hooks/useClientes";
import usePolizas, { IPoliza } from "@/hooks/usePolizas";
import { useState } from "react";

const PolizasDialog = ({ clienteData }: { clienteData: ICliente }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { polizas, loading, error } = usePolizas(clienteData.dni, isDialogOpen);
  const [selectedPoliza, setSelectedPoliza] = useState<IPoliza | null>(null);

  const handlePolizaChange = (certificado: string) => {
    const selected = polizas.find((p) => p.certificado === certificado);
    setSelectedPoliza(selected || null);
  };

  console.log(selectedPoliza);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Polizas</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Polizas</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : polizas.length > 0 ? (
          <form>
            <Select
              value={selectedPoliza?.certificado || ""}
              onValueChange={handlePolizaChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una póliza" />
              </SelectTrigger>
              <SelectContent>
                {polizas.map((poliza) => (
                  <SelectItem
                    key={poliza.certificado}
                    value={poliza.certificado}
                  >
                    {poliza.certificado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Certificado</Label>
            <Input value={selectedPoliza?.certificado || ""} readOnly />

            <Label>Fecha desde</Label>
            <Input
              value={
                selectedPoliza?.date_from
                  ? new Date(selectedPoliza.date_from).toLocaleDateString(
                      "es-ES"
                    )
                  : ""
              }
              readOnly
            />
            <Label>Fecha hasta</Label>
            <Input
              value={
                selectedPoliza?.date_to
                  ? new Date(selectedPoliza.date_to).toLocaleDateString("es-ES")
                  : ""
              }
              readOnly
            />

            <Label>Articulo</Label>
            <Input
              value={selectedPoliza?.articulo || ""}
              onChange={(e) =>
                setSelectedPoliza(
                  (prev) =>
                    ({
                      ...prev,
                      articulo: e.target.value,
                    } as IPoliza)
                )
              }
            />

            <Label>Descripción</Label>
            <Input
              value={selectedPoliza?.descripcion || ""}
              onChange={(e) =>
                setSelectedPoliza(
                  (prev) =>
                    ({
                      ...prev,
                      descripcion: e.target.value,
                    } as IPoliza)
                )
              }
            />

            <Label>Rama</Label>
            <Input
              value={selectedPoliza?.rama || ""}
              onChange={(e) =>
                setSelectedPoliza(
                  (prev) =>
                    ({
                      ...prev,
                      rama: e.target.value,
                    } as IPoliza)
                )
              }
            />
          </form>
        ) : (
          <p>No hay pólizas disponibles</p>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolizasDialog;
