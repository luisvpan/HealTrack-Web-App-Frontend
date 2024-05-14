import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/sellers`;

export default async function updateSellerPassword(
  body: UpdateEmployeeBody,
  employeeId: number
): Promise<UpdateEmployeeResponse> {
  try {
    const response = await axios.put(
      `${URL}/${employeeId}/change-password`,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateEmployeeBody {
  password: string;
}

interface UpdateEmployeeResponse {
  employeeId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
