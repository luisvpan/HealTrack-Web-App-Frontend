import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Sale } from "types/types";

const URL = `${API_BASE_URL}/quotations`;

export default async function getSaleById(saleId: number): Promise<Sale> {
  try {
    const response = await axios.get(`${URL}/${saleId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
