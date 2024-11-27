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
import { Textarea } from "@/components/ui/textarea";
import { ICliente } from "@/hooks/useClientes";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const DatosDialog = ({
  clientData,
  onDataUpdate,
}: {
  clientData: ICliente;
  onDataUpdate: (updatedItem: ICliente) => void;
}) => {
  const [nombre, setNombre] = useState(clientData.nya_razonsocial);
  const [celular, setCelular] = useState(clientData.celular);
  const [email, setEmail] = useState(clientData.email);
  const [direccion, setDireccion] = useState(clientData.direccion);
  const [agenda, setAgenda] = useState(clientData.agenda);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Ver <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleUpdate}>
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
                  defaultValue={clientData.nya_razonsocial}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Label>
              <Label>
                Cuit
                <Input defaultValue={clientData.cuit} disabled />
              </Label>
              <Label>
                DNI
                <Input defaultValue={clientData.dni} disabled />
              </Label>
              <Label>
                Celular
                <Input
                  defaultValue={clientData.celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </Label>
              <Label>
                Email
                <Input
                  defaultValue={clientData.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Label>
              <Label>
                Direccion
                <Input
                  defaultValue={clientData.direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Label>
              <Label>
                Agenda
                <Textarea
                  defaultValue={clientData.agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                />
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

export default DatosDialog;
