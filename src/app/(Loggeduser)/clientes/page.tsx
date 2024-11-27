"use client";
import useClientes, { ICliente } from "@/hooks/useClientes";
import { createColumns } from "./components/Table/columns";
import { DataTable } from "./components/Table/DataTable";

export default function Clientes() {
  const { clientes, error, loading, setClientes } = useClientes();

  const handleUpdate = (updatedItem: ICliente) => {
    const updatedClientes = clientes.map((cliente) =>
      cliente.dni === updatedItem.dni ? updatedItem : cliente
    );
    setClientes(updatedClientes);
  };

  const columns = createColumns(handleUpdate);

  return (
    <div className="container m-auto py-10 space-y-8">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight text-center">
        CLIENTES
      </h1>
      <DataTable columns={columns} data={clientes} />
    </div>
  );
}
