import axios from 'axios';
// Own
import { API_BASE_URL } from '../../config/constants';
import { Recommendation } from '../../types';
import BackendError from '../../exceptions/backend-error';
import store from '../../store';

const URL = `${API_BASE_URL}/recommendations`;

export default async function getAllRecommendations(): Promise<Recommendation[]> {
  try {
    const response = await axios.get<Recommendation[]>(
      URL, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
