import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/clients`;

export default async function createClient(
  body: CreateClientBody
): Promise<CreateClientResponse> {
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

interface CreateClientBody {
  clientDni: string;
  name: string;
  email: string;
  stateId: number;
  cityId: number;
  clientType: string;
  contactPerson: string;
  telephoneNumber: string;
}

interface CreateClientResponse {
  clientId: number;
  name: string;
  email: string;
  stateId: number;
  cityId: number;
  clientType: string;
  createdAt: string;
  updatedAt: string;
}
