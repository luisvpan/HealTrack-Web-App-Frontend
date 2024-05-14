import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { QuotationDetails } from "types/types";

const URL = `${API_BASE_URL}/quotations`;

export default async function updateSalePdf(
  quotationId: number,
  body: any
): Promise<UpdateSaleResponse> {
  try {
    const formData = new FormData();

    if (body.quotationPdf) {
      formData.append("quotationPdf", body.quotationPdf);
    }

    const response = await axios.put(`${URL}/${quotationId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateSaleResponse {
  quotationId: number;
  status: string;
  quotationDuration: number;
  observations: null;
  clientDni: string;
  channelId: number;
  userId: number;
  requotingId: null;
  createdAt: string;
  updatedAt: string;
  items: QuotationDetails[];
}
