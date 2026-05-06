export interface JwtResponse {
  token: string;
  type: string;
  email: string;
  esAdmin: number; // 1 para admin, 0 para usuario
}

export interface LoginError {
  message: string;
  status?: number;
}
