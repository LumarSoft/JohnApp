import React, { useEffect, useState } from "react";
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
import { Label } from "@radix-ui/react-label";
import { Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICliente } from "@/hooks/useClientes";
import useBienes, { IBien } from "@/hooks/useBienes";

const initialBienState: IBien = {
  id_bien: 0,
  marca: "",
  modelo: "",
  patente: "",
  anio: 0,
  cobertura: "",
  monto: 0,
  accesorios: "",
  adicionales: "",
};

const BienesDialog = ({ clienteData }: { clienteData: ICliente }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { bienes, error, loading } = useBienes(clienteData.dni, isDialogOpen);
  const [bienSeleccionado, setBienSeleccionado] = useState<IBien | null>(null);
  const [formState, setFormState] = useState<IBien>(initialBienState);

  useEffect(() => {
    if (bienSeleccionado) {
      setFormState(bienSeleccionado);
    }
  }, [bienSeleccionado]);

  const handleChange = (key: keyof IBien, value: string | number) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const changeSeleccionado = (value: string) => {
    if (value === "Agregar nuevo bien") {
      setBienSeleccionado(initialBienState);
    } else {
      const bien = bienes.find((bien) => bien.modelo === value) || null;
      setBienSeleccionado(bien);
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para guardar el bien
  };

  const handleDelete = () => {
    // Lógica para eliminar el bien
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-green-500 hover:bg-green-600">
          Bienes <Car />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold">
              Bienes
            </DialogTitle>
          </DialogHeader>
          {loading ? (
            <p>Cargando bienes...</p>
          ) : error ? (
            <p>Error al cargar los bienes: {error}</p>
          ) : bienes.length > 0 ? (
            <div>
              <Select
                value={bienSeleccionado?.modelo || ""}
                onValueChange={changeSeleccionado}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un bien" />
                </SelectTrigger>
                <SelectContent>
                  {bienes.map((bien) => (
                    <SelectItem key={bien.id_bien} value={bien.modelo}>
                      {bien.modelo || "Sin modelo"}
                    </SelectItem>
                  ))}
                  <SelectItem value="Agregar nuevo bien">
                    Agregar nuevo bien
                  </SelectItem>
                </SelectContent>
              </Select>
              {Object.keys(initialBienState).map((key) => (
                <Label key={key} className="block mt-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <Input
                    value={formState[key as keyof IBien] || ""}
                    type={key === "anio" || key === "monto" ? "number" : "text"}
                    onChange={(e) =>
                      handleChange(
                        key as keyof IBien,
                        key === "anio" || key === "monto"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                </Label>
              ))}
            </div>
          ) : (
            <span>No hay bienes registrados</span>
          )}
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant={"destructive"} onClick={handleDelete}>
                Eliminar bien
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={"default"} type="submit">
                Guardar cambios
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BienesDialog;
