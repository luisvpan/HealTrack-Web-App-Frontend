import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/quotations`;

export default async function exportPdf(saleId: number) {
  try {
    const response = await axios.get(`${URL}/download/${saleId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
      responseType: "blob",
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
