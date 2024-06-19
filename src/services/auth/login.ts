import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";

// Own

const URL = `${API_BASE_URL}/auth/login`;

export default async function login(body: LoginBody): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(URL, body);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
  token: string;
}
