"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { apiService } from "@/services/querys"; // Asegúrate de que el servicio esté configurado
import { useRouter } from "next/navigation";

// Seeded random number generator para animaciones consistentes
const mulberry32 = (a: number) => {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const InnovativeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Manejar inicio de sesión
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Validaciones simples
    if (!email || !password) {
      setError("Por favor, ingrese su email y contraseña");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, ingrese un email válido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Llamada al servicio API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        router.push(data.redirectUrl);
      } else {
        // Error de autenticación
        setError(data.error || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      setError("Ocurrió un error inesperado. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Generar animaciones de fondo
  const backgroundLines = useMemo(() => {
    const random = mulberry32(42);
    return [...Array(10)].map((_, i) => ({
      key: i,
      initialX: "-100%",
      animateX: "100vw",
      duration: random() * 10 + 5,
      delay: random() * 2,
      top: `${random() * 100}%`,
      height: `${random() * 200 + 50}px`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animaciones de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundLines.map((line) => (
          <motion.div
            key={line.key}
            initial={{ x: line.initialX }}
            animate={{
              x: line.animateX,
              transition: {
                duration: line.duration,
                repeat: Infinity,
                delay: line.delay,
              },
            }}
            className="absolute w-1 bg-yellow-500/20"
            style={{
              top: line.top,
              height: line.height,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        className="w-full max-w-md z-10 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl font-black text-yellow-500"
            initial={{ letterSpacing: "0px" }}
            whileHover={{ letterSpacing: "5px" }}
            transition={{ duration: 0.3 }}
          >
            John Pellegrini
          </motion.h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/50 border border-yellow-500/50 text-yellow-500 placeholder-yellow-500/50 py-5 text-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-yellow-500/50 text-yellow-500 placeholder-yellow-500/50 py-5 text-lg pr-10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-yellow-500" />
              ) : (
                <Eye className="w-5 h-5 text-yellow-500" />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 py-4 text-lg"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default InnovativeLogin;
