import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import store from "../../store";
import BackendError from "../../exceptions/backend-error";
// Own

const URL = `${API_BASE_URL}/reports`;

export default async function createReport(
  body: CreateReportBody
): Promise<any> {
  try {
    console.log(store.getState().auth.token);
    const response = await axios.post(`${URL}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface CreateReportBody {
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
  isRespondingForEmployee: boolean;
}
