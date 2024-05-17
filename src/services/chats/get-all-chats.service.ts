import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";
import { Chat } from "../../types";
// Own

const URL = `${API_BASE_URL}/chats`;

export default async function getAllChats(): Promise<Chat[]> {
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
