"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Car, Plus, Pencil } from "lucide-react";
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

export default function Bienes() {
  const params = useParams();
  const dni = params.dni;
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBien, setSelectedBien] = useState<any>(null);

  const { bienes, error, loading, setBienes } = useBienes(dni as string);

  const handleCreateAsset = async (values: any) => {
    try {
      // Crear el objeto para enviarlo a la api
      const assetData = {
        ...values,
        monto: parseFloat(values.monto),
        anio: parseInt(values.anio),
        adicionales: parseFloat(values.adicionales),
        accesorios: parseFloat(values.accesorios),
      };
      console.log("Crear:", assetData);

      const result = await apiService.create("goods", assetData);

      console.log("Resultado de la creación:", result);
    } catch (error) {
      console.error("Error al crear el bien:", error);
    }
  };

  const handleEditAsset = async (values: any) => {
    try {
      const assetData = {
        ...values,
        tipo_bien: values.tipo_bien || "Auto",
        monto: parseFloat(values.monto),
        anio: parseInt(values.anio),
        adicionales: parseFloat(values.adicionales),
        accesorios: parseFloat(values.accesorios),
      };
      console.log("Editar:", assetData);
      // const result = await apiService.update(
      //   "goods/:id",
      //   values.id_bien,
      //   assetData
      // );
      // console.log("Resultado de la edición:", result);
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
                      <TableCell>
                        <Button size="sm" onClick={() => handleEditClick(bien)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar bien</span>
                        </Button>
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
