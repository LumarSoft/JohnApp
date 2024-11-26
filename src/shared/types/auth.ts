// types/auth.ts
export interface LoginResponse {
    success: boolean;
    redirectUrl?: string;
    error?: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }