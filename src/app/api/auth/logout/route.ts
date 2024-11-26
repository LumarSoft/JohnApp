// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Eliminar cookie de autenticación
    cookies().delete("authToken");

    return NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente",
      redirectUrl: "/"
    }, { 
      status: 200 
    });
  } catch (error) {
    console.error("Error durante el logout:", error);
    return NextResponse.json({
      success: false,
      error: "No se pudo cerrar la sesión"
    }, { 
      status: 500 
    });
  }
}