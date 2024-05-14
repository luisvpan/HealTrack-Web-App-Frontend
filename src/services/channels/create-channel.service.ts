import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/channels`;

export default async function createChannel(
  body: CreateChannelBody
): Promise<CreateChannelResponse> {
  try {
    const response = await axios.post(URL, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface CreateChannelBody {
  description: string;
}

interface CreateChannelResponse {
  channelId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
