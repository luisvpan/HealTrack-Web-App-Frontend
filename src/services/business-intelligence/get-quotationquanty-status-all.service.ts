import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/bi/quotation-quantity/status/all`;

export default async function getQuotationQuantityAll(
  filter: number
): Promise<StatusLabels[]> {
  try {
    const response = await axios.get(`${URL}/${filter}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface StatusLabels {
  status: string;
  quantity: number;
}
