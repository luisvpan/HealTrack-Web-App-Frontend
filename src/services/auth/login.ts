import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";

// Own

const URL = `${API_BASE_URL}/auth/login`;
console.log(API_BASE_URL);
export default async function login(body: LoginBody): Promise<LoginResponse> {
  try {
    console.log(URL === "http://localhost:3000/api/v1/auth/login");
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
  email: string;
  role: string;
  token: string;
}
