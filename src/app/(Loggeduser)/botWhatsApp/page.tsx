"use client";
import { useEffect, useState } from "react";
import {
  QrCode,
  RefreshCcw,
  Webhook,
  AlertTriangle,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BotStatus = "disconnected" | "connecting" | "connected";

export default function BotWhatsAppPage() {
  const [qrImageUrl, setQrImageUrl] = useState<null | string>(null);
  const [botStatus, setBotStatus] = useState<BotStatus>("disconnected");
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [lastConnectionTime, setLastConnectionTime] = useState<Date | null>(
    null
  );

  const url = ""; // Tu URL de generación de QR

  const fetchQr = async (url: string) => {
    try {
      setBotStatus("connecting");
      const response = await fetch(url, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setQrImageUrl(imageUrl);
        setConnectionAttempts((prev) => prev + 1);
        setLastConnectionTime(new Date());
        setBotStatus("connected");
      } else {
        setBotStatus("disconnected");
        console.error("Error al obtener la imagen:", response.statusText);
      }
    } catch (error) {
      setBotStatus("disconnected");
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchQr(url);
    const interval = setInterval(() => {
      fetchQr(url);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = async () => {
    toast({
      title: "🔄 Reiniciando Bot",
      description: "Iniciando proceso de reinicio del Bot de WhatsApp",
      variant: "default",
    });

    // Aquí añadirías la lógica real de reinicio del bot
    await fetchQr(url);
  };

  const getBadgeVariant = () => {
    switch (botStatus) {
      case "connected":
        return "default";
      case "connecting":
        return "outline";
      case "disconnected":
        return "destructive";
    }
  };

  return (
    <div className="container m-auto py-10 text-center space-y-8">
      <div className="flex items-center justify-center space-x-4">
        <Smartphone className="w-12 h-12 text-green-500" />
        <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">
          BOT WHATSAPP
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <QrCode className="w-8 h-8 text-green-500" />
            <span>Estado del Bot</span>
          </CardTitle>
          <Badge variant={getBadgeVariant()}>
            {botStatus === "connected"
              ? "Conectado"
              : botStatus === "connecting"
              ? "Conectando"
              : "Desconectado"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center items-center">
            {qrImageUrl ? (
              <div className="relative">
                <img
                  src={qrImageUrl}
                  alt="QR Code"
                  className="max-w-xs mx-auto rounded-xl shadow-lg border-4 border-green-200"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 text-red-500">
                <AlertTriangle className="w-16 h-16" />
                <span className="text-lg font-semibold">
                  No se ha podido generar el QR
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-4 justify-center">
            <Button
              onClick={handleRestart}
              className="bg-yellow-400 text-black hover:bg-yellow-500 transition-colors"
            >
              <RefreshCcw className="mr-2" /> Reiniciar Bot
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Webhook className="mr-2" /> Detalles de Conexión
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Información de Conexión</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Estado Actual:</span>
                    <Badge variant={getBadgeVariant()}>{botStatus}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Intentos de Conexión:</span>
                    <Badge variant="secondary">{connectionAttempts}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Última Conexión:</span>
                    <Badge variant="outline">
                      {lastConnectionTime?.toLocaleString() || "No disponible"}
                    </Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <p className="text-sm text-red-600 font-bold">
            <AlertTriangle className="inline mr-2 text-red-600" />
            El QR se actualiza cada 1 minuto. Recargar la página de ser
            necesario
          </p>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
