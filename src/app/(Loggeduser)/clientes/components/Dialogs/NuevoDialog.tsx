import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiService } from "@/services/querys";
import { toast } from "@/hooks/use-toast";

const NuevoDialog = ({
  setClientes,
}: {
  setClientes: (clientes: any) => void;
}) => {
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [agenda, setAgenda] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Primero envolvemos todos los datos en un objeto
      const data = {
        nombre,
        cuit,
        dni,
        celular,
        email,
        direccion,
        agenda,
      };

      // Luego enviamos el objeto directamente
      const response = await apiService.create("clients", data);
      if (response.statusCode !== 201) {
        return toast({
          title: "⚠️ Error",
          description: "Por favor, selecciona un archivo Excel",
          variant: "destructive",
        });
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 absolute right-16">
          Nuevo cliente <User />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleCreate}>
          <div>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold">
                Datos
              </DialogTitle>
            </DialogHeader>
            <div>
              <Label>
                Nombre
                <Input
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                />
              </Label>
              <Label>
                Cuit
                <Input
                  onChange={(e) => setCuit(e.target.value)}
                  type="number"
                />
              </Label>
              <Label>
                DNI
                <Input onChange={(e) => setDni(e.target.value)} type="number" />
              </Label>
              <Label>
                Celular
                <Input onChange={(e) => setCelular(e.target.value)} />
              </Label>
              <Label>
                Email
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Label>
              <Label>
                Direccion
                <Input onChange={(e) => setDireccion(e.target.value)} />
              </Label>
              <Label>
                Agenda
                <Textarea onChange={(e) => setAgenda(e.target.value)} />
              </Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose type="submit" className="w-full mt-4">
              Guardar cambios
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NuevoDialog;
