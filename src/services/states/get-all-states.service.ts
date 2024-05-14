import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { State } from "types/types";

const URL = `${API_BASE_URL}/states`;

export default async function getAllStates(): Promise<State[]> {
  try {
    const response = await axios.get(`${URL}/all`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
