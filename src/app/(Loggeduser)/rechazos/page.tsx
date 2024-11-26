"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileSpreadsheet,
  Table,
  ListChecks,
  Download,
  Trash2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Definición de tipos
interface ProcessedData {
  totalRows: number;
  rejectedRows: number;
  processedDate: string;
}

export default function Rechazos() {
  const [file, setFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "⚠️ Error",
        description: "Por favor, selecciona un archivo Excel",
        variant: "destructive",
      });
      return;
    }

    // Simulación de procesamiento de archivo
    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setProcessedData({
            totalRows: 250,
            rejectedRows: 35,
            processedDate: new Date().toLocaleString(),
          });

          toast({
            title: "✅ Procesamiento Completado",
            description: `Archivo ${file.name} procesado exitosamente`,
            variant: "default",
          });
        }
      }, 500);
    };

    simulateUpload();
  };

  const handleDownload = () => {
    toast({
      title: "📥 Descarga",
      description: "Descargando archivo de rechazos...",
    });
    // Aquí iría la lógica real de descarga
  };

  const handleReset = () => {
    setFile(null);
    setProcessedData(null);
    setUploadProgress(0);
  };

  return (
    <div className="container m-auto py-10 text-center space-y-8">
      <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">
        RECHAZOS
      </h1>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-3">
            <FileSpreadsheet className="w-8 h-8 text-yellow-500" />
            <span>Carga de Archivo de Rechazos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx, .xls"
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center hover:border-yellow-400 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <FileSpreadsheet className="w-16 h-16 text-gray-400" />
                <p className="text-md text-gray-600">
                  {file
                    ? `Archivo seleccionado: ${file.name}`
                    : "Arrastra y suelta tu archivo Excel o haz clic para seleccionar"}
                </p>
              </div>
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              onClick={handleSubmit}
              disabled={!file}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors"
            >
              <Upload className="mr-2" /> Procesar Archivo
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={!processedData}
                  className="w-full"
                >
                  <ListChecks className="mr-2" /> Ver Detalles
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Detalles del Procesamiento</DialogTitle>
                </DialogHeader>
                {processedData && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total de Registros:</span>
                      <Badge variant="secondary">
                        {processedData.totalRows}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Registros Rechazados:</span>
                      <Badge variant="destructive">
                        {processedData.rejectedRows}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fecha de Procesamiento:</span>
                      <Badge variant="outline">
                        {processedData.processedDate}
                      </Badge>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {processedData && (
            <div className="flex space-x-4">
              <Button
                onClick={handleDownload}
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                <Download className="mr-2" /> Descargar Resultados
              </Button>
              <Button
                onClick={handleReset}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="mr-2" /> Reiniciar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
