import { useCallback } from "react";
import { FormularyValues } from ".";
import jsonToFormDataString from "../../utils/json-to-data-string";
import useSuccessToast from "../../components/SuccessToast";
import createAppForm from "../../services/appForm/create-appForm";
import { useIonRouter } from "@ionic/react";

const useSubmitAppForm = () => {
  const successToast = useSuccessToast();
  const router = useIonRouter();

  const onSubmit = useCallback(
    async (description: string, form: FormularyValues) => {
      try {
        const body = {
          likeApp: String(form.likeApp),
          innescesaryDificultToUse: String(form.innescesaryDificultToUse),
          easyToUse: String(form.easyToUse),
          needExpertSupport: String(form.needExpertSupport),
          wellIntegratedFunctions: String(form.wellIntegratedFunctions),
          manyContradictions: String(form.manyContradictions),
          peopleLearnQuickly: String(form.peopleLearnQuickly),
          tediousToUse: String(form.tediousToUse),
          feltConfidentUsing: String(form.feltConfidentUsing),
          neededKnowledgeBeforeUse: String(form.neededKnowledgeBeforeUse),
          additionalInformation: description,
        };

        const dataToSend = jsonToFormDataString(body);
        await createAppForm(dataToSend);
        successToast("Formulario enviado con éxito");
        router.push("/home");
      } catch (error) {
        console.log(error);
      }
    },
    [router, successToast]
  );

  return onSubmit;
};

export default useSubmitAppForm;
