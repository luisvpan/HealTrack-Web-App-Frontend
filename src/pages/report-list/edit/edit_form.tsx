import React, { FunctionComponent } from 'react';
import { Formik, FormikHelpers, FormikErrors } from 'formik';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { useIonToast } from '@ionic/react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  additionalInformation: yup.string().nullable(),
  file: yup.mixed().nullable(),
});

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isEdit,
}) => {
  const [presentToast] = useIonToast();

  const handleFormSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    try {
      await onSubmit(values, helpers);
    } catch (error) {
      let errorMessage = 'An error occurred!';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      presentToast({
        message: errorMessage,
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonContent className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">Informacion Adicional</IonLabel>
              <IonLabel position="floating"></IonLabel>
              <IonLabel position="floating"></IonLabel>
              <IonInput
                id="additionalInformation"
                name="additionalInformation"
                value={values.additionalInformation || ''}
                onIonBlur={handleBlur}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem>
              {/* Alternativa personalizada para Dropzone */}
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setFieldValue('file', file);
                  }
                }}
              />
            </IonItem>
            {errors.submit && (
              <IonText color="danger">
                <p>{errors.submit}</p>
              </IonText>
            )}
            <IonButton
              expand="full"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              Guardar
            </IonButton>
          </form>
        )}
      </Formik>
    </IonContent>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  isEdit?: boolean;
}

export type FormValues = {
  id: number;
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
  additionalInformation: string | null;
  fileUrl: string | null;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default Form;
