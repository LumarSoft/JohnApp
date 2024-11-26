import { columns } from "./components/Table/columns";
import { DataTable } from "./components/Table/DataTable";

export default function Clientes() {
  return (
    <div className="container m-auto py-10 space-y-8">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight text-center">
        CLIENTES
      </h1>
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
