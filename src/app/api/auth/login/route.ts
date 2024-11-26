// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiService } from "@/services/querys";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: LoginRequest = await request.json();

  // Validaciones iniciales
  if (!email || !password) {
    return NextResponse.json(
      { error: "Credenciales incompletas" }, 
      { status: 400 }
    );
  }

  try {
    // Llamada al servicio de autenticación
    const response = await apiService.create("users/login", {
      email,
      password,
    });

    if (response.ok) {
      // Establecer cookie segura
      cookies().set("authToken", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
      });

      return NextResponse.json({
        success: true,
        redirectUrl: "/botWhatsApp",
        user: {
          id: response.data.user.id,
          email: response.data.user.correo,
          role: response.data.user.rol
        }
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: response.message || "Credenciales inválidas" 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Error interno del servidor" 
      }, 
      { status: 500 }
    );
  }
}