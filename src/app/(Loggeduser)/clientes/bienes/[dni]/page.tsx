"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Car, Plus, Pencil, Delete, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useBienes from "@/hooks/useBienes";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateAssetForm } from "./components/create-asset-form";
import { EditAssetForm } from "./components/edit-asset-form";
import { apiService } from "@/services/querys";
import { DeleteDialog } from "./components/delete";
import { set } from "zod";

export default function Bienes() {
  const params = useParams();
  const dni = params.dni;
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBien, setSelectedBien] = useState<any>(null);

  const { bienes, error, loading, setBienes } = useBienes(dni as string);

  const handleCreateAsset = async (values: any) => {
    try {
      // Crear el objeto para enviarlo a la API
      const assetData = {
        ...values,
        monto: parseFloat(values.monto) || 0,
        anio: values.anio ? parseInt(values.anio) : null, // Si está vacío, establece null
        adicionales: parseFloat(values.adicionales) || 0,
        accesorios: parseFloat(values.accesorios) || 0,
        dni_asegurado: dni,
      };

      const result = await apiService.create("goods", assetData);

      if (result.statusCode === 201) {
        const lastId =
          bienes.length > 0
            ? Math.max(...bienes.map((bien) => bien.id_bien))
            : 0;
        const newId = lastId + 1;

        const newAsset = { ...assetData, id_bien: newId };

        console.log(newAsset);
        setBienes([...bienes, newAsset]);

        setCreateDialogOpen(false);
      }
    } catch (error) {
      console.error("Error al crear el bien:", error);
    }
  };

  const handleEditAsset = async (values: any) => {
    try {
      const assetData = {
        ...values,
        tipo_bien: values.tipo_bien || "",
        monto: parseFloat(values.monto) || 0,
        anio: values.anio ? parseInt(values.anio) : "",
        adicionales: parseFloat(values.adicionales) || 0,
        accesorios: parseFloat(values.accesorios) || 0,
        id_bien: values.id_bien, // Explicitly include id_bien
      };

      const result = await apiService.update(
        "goods/:id",
        values.id_bien,
        assetData
      );

      // Optional: Update the bienes state after successful update
      if (result.statusCode === 200) {
        const updatedBienes = bienes.map((bien) =>
          bien.id_bien === values.id_bien ? { ...bien, ...assetData } : bien
        );
        setBienes(updatedBienes);
        setEditDialogOpen(false);
        setSelectedBien(null);
      }
    } catch (error) {
      console.error("Error al editar el bien:", error);
    }
  };

  const handleEditClick = (bien: any) => {
    setSelectedBien(bien);
    setEditDialogOpen(true);
  };

  if (error) {
    return (
      <div className="flex h-[450px] w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Error al cargar los bienes</h2>
          <p className="text-muted-foreground">
            Por favor, intente nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto py-10 space-y-8">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight text-center">
        BIENES
      </h1>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bienes Asegurados</CardTitle>
              <CardDescription>
                Gestione los bienes asegurados del cliente
              </CardDescription>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Bien
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Bien</DialogTitle>
                  <DialogDescription>
                    Complete los datos del nuevo bien a asegurar
                  </DialogDescription>
                </DialogHeader>
                <CreateAssetForm
                  onSubmit={handleCreateAsset}
                  onCancel={() => setCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : bienes && bienes.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Marca y Modelo</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Cobertura</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bienes.map((bien) => (
                    <TableRow key={bien.id_bien}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          {bien.tipo_bien || "Auto"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {bien.marca} {bien.modelo}
                      </TableCell>
                      <TableCell>{bien.anio}</TableCell>
                      <TableCell>{bien.cobertura}</TableCell>
                      <TableCell className="text-right">
                        ${new Intl.NumberFormat().format(bien.monto)}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" onClick={() => handleEditClick(bien)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar bien</span>
                        </Button>
                        <DeleteDialog bien={bien} setBienes={setBienes} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Editar Bien</DialogTitle>
                    <DialogDescription>
                      Modifique los datos del bien seleccionado
                    </DialogDescription>
                  </DialogHeader>
                  {selectedBien && (
                    <EditAssetForm
                      bien={selectedBien}
                      onSubmit={handleEditAsset}
                      onCancel={() => {
                        setEditDialogOpen(false);
                        setSelectedBien(null);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  Sin bienes registrados
                </h3>
                <p className="text-muted-foreground">
                  No hay bienes asegurados para este cliente
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
