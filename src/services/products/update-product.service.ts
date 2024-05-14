import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/products`;

export default async function updateProduct(
  body: UpdateProductBody,
  productId: number
): Promise<UpdateProductResponse> {
  try {
    const response = await axios.put(`${URL}/${productId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

interface UpdateProductBody {
  name: string;
}

interface UpdateProductResponse {
  productId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
