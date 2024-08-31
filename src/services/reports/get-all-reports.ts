import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import { PaginatedReportResult } from "../../types";
import BackendError from "../../exceptions/backend-error";
import addQueryParams from "../add-query-params";
import store from "../../store";

const URL = `${API_BASE_URL}/reports`;

export default async function getAllReports(
  userId: number | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  limit: number,
  page: number
): Promise<PaginatedReportResult> {
  const params: Record<string, any> = {
    userId,
    limit,
    page,
  };

  if (startDate) {
    params.startDate = startDate;
  }

  if (endDate) {
    params.endDate = endDate;
  }

  const urlPaginated = addQueryParams(URL, params);

  try {
    const response = await axios.get(urlPaginated, {
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
