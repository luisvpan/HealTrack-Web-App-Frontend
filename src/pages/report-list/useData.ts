import { AllRoles } from "../../types";
import { PaginationData, Report } from "../../types";
import store, { useAppDispatch } from "../../store";
import BackendError from "../../exceptions/backend-error";
import getAllReports from "../../services/reports/get-all-reports";
import getReportsByUser from "../../services/reports/get-reports-by-user";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "../../store/customizationSlice";

export default function useData() {
  const userId = store.getState().auth.user?.id;
  const userRole = store.getState().auth.user?.role;
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Report[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDateUser, setStartDateUser] = useState<string>("");
  const [endDateUser, setEndDateUser] = useState<string>("");
  const [patientId, setPatientId] = useState<number>(0);

  const fetchReports = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      let requestStartDateAll = startDate || undefined; // Usa `undefined` si no hay fecha
      let requestEndDateAll = endDate || undefined;
  
      if (userRole === AllRoles.ADMIN) {
        const response = await getAllReports(
          patientId,
          requestStartDateAll,
          requestEndDateAll,
          pagination.limit,
          pagination.page
        );
        setItems(response.data);
        setPagination(response.paginationData);
        return;
      }
  
      if (userRole === AllRoles.PATIENT && userId) {
        const response = await getReportsByUser(
          userId,
          pagination.limit,
          pagination.page
        );
        setItems(response.data);
        setPagination(response.paginationData);
        return;
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [
    dispatch,
    endDate,
    pagination.limit,
    pagination.page,
    patientId,
    startDate,
    userId,
    userRole,
  ]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    items,
    pagination,
    setPagination,
    fetchReports,
    setPatientId,
    patientId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } as const;
}
