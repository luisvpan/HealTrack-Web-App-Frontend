import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/configs`;

export default async function getConfig(): Promise<GetConfigResponse> {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface GetConfigResponse {
  configId: number;
  administrationEmail: string;
  quotationExpirationTime: number;
  createdAt: Date;
  updatedAt: Date;
}
