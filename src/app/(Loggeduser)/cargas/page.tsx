import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Charges() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight text-center">
        CARGA MASIVA
      </h1>
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Carga de Clientes</CardTitle>
            <CardDescription>
              Sube un archivo Excel con los datos de los clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="clientFile">Archivo de Clientes</Label>
                <Input id="clientFile" type="file" accept=".xlsx, .xls" />
              </div>
              <Button className="mt-4">Cargar Clientes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carga de Pólizas</CardTitle>
            <CardDescription>
              Sube un archivo Excel con los datos de las pólizas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="policyFile">Archivo de Pólizas</Label>
                <Input id="policyFile" type="file" accept=".xlsx, .xls" />
              </div>
              <Button className="mt-4">Cargar Pólizas</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
