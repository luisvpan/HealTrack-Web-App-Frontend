import { SyntheticEvent, useCallback } from "react";
import store from "../../store";
import { QuestionValues } from ".";
import { useHistory } from "react-router";
import jsonToFormData from "../../utils/json-to-formData";
import useSuccessToast from "../../components/SuccessToast";
import createReport from "../../services/reports/create-report.service";

const useSubmitReport = () => {
  const role = store.getState().auth.user?.role;
  const successToast = useSuccessToast();
  const history = useHistory();
  const onSubmit = useCallback(
    async (description: string, report: QuestionValues, file?: File) => {
      try {
        const body = {
          hasHighTemperature: report.hasHighTemperature,
          hasRedness: report.hasRedness,
          hasSwelling: report.hasSwelling,
          hasSecretions: report.hasSecretions,
          additionalInformation: description,
          ...(!!file ? { file: file } : {}),
        };

        const dataToSend = jsonToFormData(body);
        await createReport(dataToSend);
        successToast("Reporte creado con éxito");
        history.push("/messages");
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  return onSubmit;
};

export default useSubmitReport;
