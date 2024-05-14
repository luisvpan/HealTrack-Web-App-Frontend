import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { City } from "types/types";

const URL = `${API_BASE_URL}/cities`;

export default async function deleteCity(id: number): Promise<City> {
  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
