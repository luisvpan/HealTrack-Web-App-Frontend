import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/channels`;

export default async function updateChannel(
  body: UpdateChannelBody,
  channelId: number
): Promise<UpdateChannelResponse> {
  try {
    const response = await axios.put(`${URL}/${channelId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateChannelBody {
  description: string;
}

interface UpdateChannelResponse {
  channelId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
