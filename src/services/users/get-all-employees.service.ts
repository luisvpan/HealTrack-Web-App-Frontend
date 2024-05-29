import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";

// Own

const URL = `${API_BASE_URL}`;

export default async function getAllEmployees(): Promise<any> {
  try {
    const response = await axios.get(`${URL}/employees`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
