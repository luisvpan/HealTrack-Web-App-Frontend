import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Seller } from "types/types";

const URL = `${API_BASE_URL}/sellers`;

export default async function deleteSeller(id: number): Promise<Seller> {
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
