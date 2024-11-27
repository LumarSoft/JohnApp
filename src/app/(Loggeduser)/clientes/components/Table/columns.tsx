"use client";
import { Button } from "@/components/ui/button";
import { ICliente } from "@/hooks/useClientes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PolizasDialog } from "../Dialogs/PolizasDialog";
import BienesDialog from "../Dialogs/BienesDialog";

export const createColumns = (
  onDataUpdate: (updatedItem: ICliente) => void
): ColumnDef<ICliente>[] => [
  {
    accessorKey: "dni",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DNI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nya_razonsocial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cuit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cuit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <PolizasDialog clienteData={row.original} />
          <BienesDialog clienteData={row.original} />
          {/* <DialogDatos data={row.original} onDataUpdate={onDataUpdate} />
          <ToggleStatus data={row.original} onDataUpdate={onDataUpdate} /> */}
        </div>
      );
    },
  },
];
