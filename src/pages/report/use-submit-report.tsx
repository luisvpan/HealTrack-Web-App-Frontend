import { useCallback } from "react";

import { QuestionValues } from ".";

import jsonToFormData from "../../utils/json-to-formData";
import useSuccessToast from "../../components/SuccessToast";
import createReport from "../../services/reports/create-report.service";
import { useIonRouter } from "@ionic/react";

const useSubmitReport = () => {
  const successToast = useSuccessToast();
  const router = useIonRouter();
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
        router.push("/messages");
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  return onSubmit;
};

export default useSubmitReport;
