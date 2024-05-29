import { useCallback } from "react";
import createReport from "../../services/reports/create-report.service";
import store from "../../store";
import useSuccessToast from "../../components/SuccessToast";
import { useHistory } from "react-router";

const useSubmitReport = () => {
  const role = store.getState().auth.user?.role;
  const successToast = useSuccessToast();
  const history = useHistory();
  const onSubmit = useCallback(async (report: any, file?: File) => {
    try {
      const body = {
        hasHighTemperature: report[0],
        hasRedness: report[1],
        hasSwelling: report[2],
        hasSecretions: report[3],
        isRespondingForEmployee: role === "patient" ? true : false,
      };
      await createReport(body);
      successToast("Reporte creado con éxito");
      history.push("/messages");
    } catch (error) {
      console.log(error);
    }
  }, []);
  return onSubmit;
};

export default useSubmitReport;
