export interface User {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  adresse?: string;
  verifier: boolean;
  role: 'CLIENT' | 'ADMIN' | 'TECHNICIEN';
  create_date?: Date;
  update_date?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}
