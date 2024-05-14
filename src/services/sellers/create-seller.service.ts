import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/sellers`;

export default async function createSeller(
  body: CreateEmployeeBody
): Promise<CreateEmployeeResponse> {
  try {
    const response = await axios.post(URL, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface CreateEmployeeBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface CreateEmployeeResponse {
  employeeId: number;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
