import axios from 'axios';
// Own
import { API_BASE_URL } from '../../config/constants';
import { Employee } from '../../types';
import BackendError from '../../exceptions/backend-error';
import store from '../../store';

const URL = `${API_BASE_URL}/employees/user`;

export default async function getEmployeeByUserId(userId: number): Promise<Employee> {
  try {
    const response = await axios.get<Employee>(
      `${URL}/${userId}`, 
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
