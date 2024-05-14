import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/cities`;

export default async function updateCity(
  body: UpdateCityBody,
  cityId: number
): Promise<UpdateCityResponse> {
  try {
    const response = await axios.put(`${URL}/${cityId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateCityBody {
  name: string;
}

interface UpdateCityResponse {
  cityId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
