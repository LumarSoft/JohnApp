"use client";

import { useState } from "react";
import { BASE_API_URL } from "@/shared/providers/envProvider";
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
import * as XLSX from 'xlsx';

export default function Charges() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  interface FileSelectEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileSelect = (event: FileSelectEvent): void => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDownloadExcel = (): void => {
    const link = document.createElement('a');
    link.href = '/MODELO-EXCEL-FINAL.xlsx';
    link.download = 'MODELO-EXCEL-FINAL.xlsx';
    link.click();
  }

  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & { reset: () => void };
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Por favor selecciona un archivo');
      return;
    }

    setLoading(true);

    try {
      // Leer el archivo Excel
      const data = await readExcelFile(selectedFile);

      // Enviar los datos como JSON
      const response = await fetch(`${BASE_API_URL}/clients/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error('Error al subir los datos');
      }

      const result = await response.json();
      alert('Datos cargados correctamente');
      
      event.target.reset();
      setSelectedFile(null);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          console.log('Datos convertidos:', jsonData); // Para debug
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Error al procesar el archivo Excel'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsBinaryString(file);
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight text-center">
        CARGA MASIVA
      </h1>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Carga de Pólizas</CardTitle>
            <CardDescription>
              Sube un archivo Excel con los datos de las pólizas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="policyFile">Archivo de Pólizas</Label>
                <Input
                  id="policyFile"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileSelect}
                  disabled={loading}
                />
              </div>
              <Button
                className="mt-4 mr-2"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Cargar Pólizas'}
              </Button>
              <Button
                className="mt-4 ml-2"
                onClick={handleDownloadExcel}
                type="button"
              >
                Descargar Excel Modelo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}