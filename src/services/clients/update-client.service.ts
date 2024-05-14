import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/clients`;

export default async function updateClient(
  body: UpdateClientBody,
  employeeId: string
): Promise<UpdateClientResponse> {
  try {
    const response = await axios.put(`${URL}/${employeeId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateClientBody {
  name: string;
  email: string;
  stateId: number;
  cityId: number;
  clientType: string;
}

interface UpdateClientResponse {
  clientId: number;
  name: string;
  email: string;
  stateId: number;
  cityId: number;
  clientType: string;
  createdAt: string;
  updatedAt: string;
}
