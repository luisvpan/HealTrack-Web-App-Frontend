import axios from "axios";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";
import BackendError from "../../exceptions/backend-error";
import { Report } from "../../types";
// Own

const URL = `${API_BASE_URL}/reports`;

export default async function getReportsByUser(
  userId: number
): Promise<Report[]> {
  try {
    const response = await axios.get<Report[]>(`${URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
