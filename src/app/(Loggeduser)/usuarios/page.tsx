"use client";
import { useState, useMemo } from "react";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import AddUserDialog from "./components/Dialog/AddUser";
import DeleteUser from "./components/Dialog/DeleteUser";
import useUsuarios from "@/hooks/useUsuarios"; // Asegúrate de importar el hook
import ChangeState from "./components/Dialog/ChangeState";

export default function Usuarios() {
  const { usuarios, loading, error, setUsuarios } = useUsuarios(); // Llamamos al hook
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Función para filtrar usuarios
  const filteredUsers = useMemo(() => {
    return usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [usuarios, searchTerm]);

  if (loading) return <div>Cargando...</div>; // Mostramos loading mientras se cargan los usuarios

  if (error) return <div>Error: {error}</div>; // Si hay un error, lo mostramos

  return (
    <div className="container m-auto py-10 text-center space-y-8">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">
        USUARIOS
      </h1>

      <Card className="container mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-3">
            <Users className="w-8 h-8 text-yellow-500" />
            <span>Gestión de Usuarios</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4 mb-4 relative">
            <Input
              placeholder="Buscar usuarios..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <AddUserDialog />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((usuario) => (
                <TableRow key={usuario.id} className="text-left">
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        usuario.estado === "Activo" ? "default" : "destructive"
                      }
                    >
                      {usuario.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <DeleteUser user={usuario}/>
                    <ChangeState user={usuario} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No se encontraron usuarios
            </div>
          )}
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
