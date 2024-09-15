import axios from "axios";
// Own
import { API_BASE_URL } from "../../config/constants";
import { PaginatedReportResult } from "../../types";
import BackendError from "../../exceptions/backend-error";
import addQueryParams from "../add-query-params";
import store from "../../store";

const URL = `${API_BASE_URL}/reports`;

export default async function getReportsByUser(
  userId: number,
  limit: number,
  page: number
): Promise<PaginatedReportResult> {
  try {
    // Construir los parámetros de consulta
    const urlPaginated = addQueryParams(`${URL}/user/${userId}`, {
      limit,
      page,
    });

    // Realizar la solicitud
    const response = await axios.get<PaginatedReportResult>(urlPaginated, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
