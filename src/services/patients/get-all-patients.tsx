import axios from "axios";
// Own
import { API_BASE_URL } from "../../config/constants";
import { Patient } from "../../types";
import BackendError from "../../exceptions/backend-error";
import store from "../../store";

const URL = `${API_BASE_URL}/patients`;

export default async function getAllPatients(
  status?: string
): Promise<Patient[]> {
  try {
    const response = await axios.get<Patient[]>(
      `${URL}${!!status ? "?status=" + status : ""}`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
