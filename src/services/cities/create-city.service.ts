import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/cities`;

export default async function createCity(
  body: CreateCityBody
): Promise<CreateCityResponse> {
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

interface CreateCityBody {
  name: string;
}

interface CreateCityResponse {
  cityId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
