export interface PostData {
  email: string;
  name?: string;
  password: string;
}

export interface errorResponseInterface {
  message: string;
  type: string;
}

export interface AuthResponse {
  token: string;
  uid: string;
}

