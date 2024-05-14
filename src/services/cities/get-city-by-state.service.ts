import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { City } from "types/types";

const URL = `${API_BASE_URL}/states`;

export default async function getAllCitiesByState(
  stateId: number
): Promise<City[]> {
  try {
    const response = await axios.get(`${URL}/${stateId}/cities`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
