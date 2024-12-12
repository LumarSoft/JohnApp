"use client";
import { Button } from "@/components/ui/button";
import { ICliente } from "@/hooks/useClientes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Car } from "lucide-react";
import DatosDialog from "../Dialogs/DatosDialog";
import PolizasDialog from "../Dialogs/PolizasDialog";
import EstadoDialog from "../Dialogs/EstadoDialog";
import { Link } from "next-view-transitions";

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
          <Link href={`/clientes/bienes/${row.original.dni}`}>
            <Button className="flex gap-2 bg-green-500 hover:bg-green-600">
              Bienes <Car />
            </Button>
          </Link>
          <DatosDialog clientData={row.original} onDataUpdate={onDataUpdate} />
          <EstadoDialog clientData={row.original} onDataUpdate={onDataUpdate} />
        </div>
      );
    },
  },
];
