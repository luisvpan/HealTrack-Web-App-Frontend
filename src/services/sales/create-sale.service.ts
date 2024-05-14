import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import {
  //NewQuotationDetails,
  QuotationDetails,
} from "types/types";

const URL = `${API_BASE_URL}/quotations`;

export default async function createSale(
  body: CreateSaleBody
): Promise<CreateSaleResponse> {
  try {
    const formData = new FormData();

    formData.append("status", body.status);
    formData.append("clientDni", body.clientDni);
    formData.append("products", body.products);

    formData.append("releasedAt", body.releasedAt);

    if (body.channelId) {
      formData.append("channelId", body.channelId.toString());
    }

    if (body.quotationPdf) {
      formData.append("quotationPdf", body.quotationPdf);
    }

    if (body.sourceRequotingId) {
      formData.append("sourceRequotingId", body.sourceRequotingId.toString());
    }

    const response = await axios.post(URL, formData, {
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
interface CreateSaleBody {
  status: string;
  quotationDuration: number;
  clientDni: string;
  channelId?: number;
  products: string;
  releasedAt: string;
  telephoneNumber: string;
  contactPerson: string;
  sourceRequotingId?: number;
  quotationPdf: File;
}

interface CreateSaleResponse {
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
