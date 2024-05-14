import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/configs`;

export default async function updateConfig(
  body: UpdateConfigBody,
  configId: number
): Promise<UpdateConfigResponse> {
  try {
    const response = await axios.put(`${URL}/${configId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateConfigBody {
  administrationEmail: string;
  quotationExpirationTime: number;
}
interface UpdateConfigResponse {
  configId: number;
  administrationEmail: string;
  quotationExpirationTime: number;
  createdAt: Date;
  updatedAt: Date;
}
