// User from Java
export interface User {
    email: string;
    roles: string[];
    sub?: string; 
  }
  
  // JwtResponse from Java
  export interface AuthResponse {
    token: string;
    type: string;
    email: string;
    roles: string[];
  }
  
  // Service from Java
  export interface MedicalService {
    id: number;
    name: string;
    durationMinutes: number;
    price: number;
    isActive: boolean;
  }
  
  // DoctorDTO from Java
  export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
  }