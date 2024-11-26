import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/querys";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddUserDialog = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const agregarUsuario = async () => {
    // Validar campos
    if (!nombre || !email || !password || !rol) {
      return;
    }

    // Preparar el objeto a enviar
    const data = {
      nombre,
      email,
      password,
      rol,
    };

    try {
      const response = await apiService.create("users/create", data);
      console.log("Respuesta de la solicitud:", response);
      if (response.statusCode === 201) {
        // Limpiar campos
        setNombre("");
        setEmail("");
        setPassword("");
        setRol("");
      }
    } catch (error: unknown) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500 transition-colors">
          <UserPlus className="mr-2" /> Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Agregar Nuevo Usuario
          </DialogTitle>
          <DialogDescription className="text-center">
            Complete los datos para registrar un nuevo usuario en el sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div>
            <Label>Nombre</Label>
            <Input
              type="text"
              placeholder="Nombre del usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Contraseña</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-yellow-500 hover:text-yellow-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <Label>Rol</Label>
            <Select onValueChange={setRol}>
              <SelectTrigger>
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Usuario">Usuario</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={agregarUsuario}
          >
            Agregar Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
