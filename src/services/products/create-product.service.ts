import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/products`;

export default async function createProduct(
  body: CreateProductBody
): Promise<CreateProductResponse> {
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

interface CreateProductBody {
  name: string;
}

interface CreateProductResponse {
  productId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
