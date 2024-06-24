import React, { useCallback, useEffect, useState } from "react";
import useErrorToast from "../../components/ErrorToast";
import getReportsByUser from "../../services/reports/get-reports-by-user.service";
import { Report } from "../../types";
import BackendError from "../../exceptions/backend-error";
import dayjs from "dayjs";
import store from "../../store";

const useGetWarningInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const user = store.getState().auth.user;

  const errorToast = useErrorToast();

  const validateCreatedReport = (report: Report) => {
    const creationDate = dayjs(report.createdAt);
    const today = dayjs();

    if (!creationDate.isSame(today, "day") && today.hour() > 6) {
      setWarning(true);
    }
  };

  const getWarningInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!user?.id || user.role !== "patient") return;
      const reports = await getReportsByUser(user?.id);
      if (reports.length === 0) {
        return setWarning(true);
      } else validateCreatedReport(reports[0]);
    } catch (error) {
      if (error instanceof BackendError) {
        errorToast(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getWarningInfo();
  }, [getWarningInfo]);
  return { isLoading, warning };
};

export default useGetWarningInfo;
