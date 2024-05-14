import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { PaginatedResponse } from "services/types";
import store from "store";
import { Sale } from "types/types";

const URL: string = `${API_BASE_URL}/quotations`;

const userId = store.getState().auth.user?.id;

export default async function getSalesByEmployee({
  page,
  size,
}: Props): Promise<PaginatedResponse<Sale>> {
  try {
    if (!userId) throw new Error("Error de usuario");
    const response = await axios.get(
      `${URL}/user/${userId}?page=${page}&size=${size}`,
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

interface Props {
  page: number;
  size: number;
}
