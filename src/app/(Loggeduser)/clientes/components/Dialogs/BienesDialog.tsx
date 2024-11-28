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
import { apiService } from "@/services/querys";

const initialBienState: Omit<IBien, "id_bien"> = {
  marca: "",
  modelo: "",
  anio: 0,
  cobertura: "",
  adicionales: "",
  accesorios: "",
  dni_asegurado: "",
  monto: 0,
};

const BienesDialog = ({ clienteData }: { clienteData: ICliente }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { bienes, error, loading, setBienes } = useBienes(
    clienteData.dni,
    isDialogOpen
  );
  const [bienSeleccionado, setBienSeleccionado] = useState<IBien | null>(null);
  const [formState, setFormState] =
    useState<Omit<IBien, "id_bien">>(initialBienState);

  useEffect(() => {
    if (bienSeleccionado) {
      const { id_bien, ...rest } = bienSeleccionado || {};
      setFormState({
        ...rest,
      });
    }
  }, [bienSeleccionado]);

  const handleChange = (
    key: keyof Omit<IBien, "id_bien">,
    value: string | number
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const changeSeleccionado = (value: string) => {
    if (value === "Agregar nuevo bien") {
      setBienSeleccionado(null);
      setFormState(initialBienState);
    } else {
      const bien = bienes.find((bien) => bien.modelo === value) || null;
      setBienSeleccionado(bien);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!bienSeleccionado) {
        const result = await apiService.create("goods", formState);
        console.log(result);
        if (result.message === "Bien agregado") {
          const nuevoBien: IBien = {
            ...formState,
            id_bien: result.data.id_bien, // Recibe el id generado por la base de datos
          };
          setBienes((prevBienes) => [...prevBienes, nuevoBien]);
          setBienSeleccionado(nuevoBien);
        }
      } else {
        const result = await apiService.update(
          `bienes/updateBien/:id`,
          bienSeleccionado.id_bien,
          formState
        );
        if (result.message === "Datos actualizados") {
          setBienes((prevBienes) =>
            prevBienes.map((bien) =>
              bien.id_bien === bienSeleccionado.id_bien
                ? { ...formState, id_bien: bien.id_bien }
                : bien
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!bienSeleccionado) return;

    try {
      const result = await apiService.delete(
        `bienes/:id`,
        bienSeleccionado.id_bien
      );

      if (result.ok) {
        setBienes((prevBienes) =>
          prevBienes.filter((bien) => bien.id_bien !== bienSeleccionado.id_bien)
        );
        setBienSeleccionado(null);
      }
    } catch (error) {
      console.error(error);
    }
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
                    value={
                      formState[key as keyof typeof initialBienState] || ""
                    }
                    type={key === "anio" || key === "monto" ? "number" : "text"}
                    onChange={(e) =>
                      handleChange(
                        key as keyof typeof initialBienState,
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
