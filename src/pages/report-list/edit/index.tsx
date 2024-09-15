import React, { FunctionComponent, useCallback } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  useIonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../store/index';
import { setErrorMessage, setIsLoading, setSuccessMessage } from '../../../store/customizationSlice';
import Form, { FormValues } from './edit_form';
import editReport from '../../../services/reports/edit-reports';
import useReportById from './use-report-by-id';
import useReportId from './use-report-id';
import { FormikHelpers } from 'formik';
import jsonToFormData from '../../../utils/json-to-formData';

const EditReport: FunctionComponent<Props> = ({ className }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const reportId = useReportId();
  const report = useReportById(reportId);

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);

      console.log("antes: ", values);
  
      // Prepare values for submission
      delete values.id;
      delete values.submit;
      for (const key in values) {
        if (values[key] === "true") {
          values[key] = true;
        }
      }
  
      console.log("Despues: ", values);

      const valuesToSend = jsonToFormData(values);

      editReport(reportId!, valuesToSend)
        .then(() => {
          history.push('/report-list');
          presentToast({
            message: `Reporte ${values.id} editado correctamente`,
            duration: 2000,
            color: 'success',
          });
        })
        .catch((error) => {
          let errorMessage = 'An error occurred!';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          setErrors({
            submit: errorMessage,
          });
          dispatch(setErrorMessage(errorMessage));
          presentToast({
            message: errorMessage,
            duration: 2000,
            color: 'danger',
          });
          setStatus({ success: false });
        })
        .finally(() => {
          setSubmitting(false);
          dispatch(setIsLoading(false));
        });
    },
    [dispatch, history, reportId, presentToast]
  );

  return (
    <IonPage className={className}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Formulario de paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {report && (
          <>
            <IonItem>
              <IonLabel>Formulario de paciente</IonLabel>
            </IonItem>
            <Form
              initialValues={{
                id: 0,
                hasHighTemperature: report.hasHighTemperature,
                hasRedness: report.hasRedness,
                hasSwelling: report.hasSwelling,
                hasSecretions: report.hasSecretions,
                additionalInformation: report.additionalInformation,
                fileUrl: report.fileUrl,
                submit: null,
              }}
              isEdit
              title={"Editar foto o descripcion del Formulario"}
              onSubmit={onSubmit}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

interface Props {
  className?: string;
}

export default EditReport;
