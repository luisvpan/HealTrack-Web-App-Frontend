import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/bi/quotation-quantity`;

export default async function getQuotationQuantity(): Promise<GetQuotationQuantity> {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.quotationQuantity;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface GetQuotationQuantity {
  quotationQuantity: number;
}
