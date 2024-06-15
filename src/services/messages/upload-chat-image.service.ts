import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import store from "../../store";
import BackendError from "../../exceptions/backend-error";
// Own

const URL = `${API_BASE_URL}/chats`;

export default async function sendImage(
  body: any,
  otherId: number
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("file", body);
    formData.append("message", "");
    console.log("Valor del dato: " + formData.get("message"));
    console.log("Valor del dato: " + formData.get("file"));
    console.log(body);
    const response = await axios.post(`${URL}/${otherId}/messages/`, formData, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
