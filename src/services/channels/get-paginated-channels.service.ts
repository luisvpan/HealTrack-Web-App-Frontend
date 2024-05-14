import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { PaginatedResponse } from "services/types";
import store from "store";
import { Channel } from "types/types";

const URL = `${API_BASE_URL}/channels`;

export default async function getAllChannels({
  page,
  size,
}: Props): Promise<PaginatedResponse<Channel>> {
  try {
    const response = await axios.get(`${URL}?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface Props {
  page: number;
  size: number;
}
