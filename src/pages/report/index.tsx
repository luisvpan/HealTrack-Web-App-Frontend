import React, { useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./ReportTab.css";
import { cameraOutline } from "ionicons/icons";
import useSubmitReport from "./use-submit-report";

export interface QuestionValues {
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
}
interface ReportQuestion {
  label: string;
  key: keyof QuestionValues;
}

const reportQuestions: ReportQuestion[] = [
  { label: "Tiene temperatura mayor de 38,5 °C", key: "hasHighTemperature" },
  {
    label: "Tiene enrojecimiento alrededor de la herida operatoria",
    key: "hasRedness",
  },
  { label: "Tiene hinchazón en la herida operatoria", key: "hasSwelling" },
  {
    label: "Presenta secreciones que salen a través de la herida operatoria",
    key: "hasSecretions",
  },
];

const initialValues = {
  hasHighTemperature: false,
  hasRedness: false,
  hasSwelling: false,
  hasSecretions: false,
};

const ReportTab: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [answers, setAnswers] = useState(initialValues);
  const [fileData, setFileData] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const handleAnswerChange = (index: keyof QuestionValues, answer: boolean) => {
    const newAnswers = { ...answers };
    newAnswers[index] = answer;

    setAnswers(newAnswers);
  };

  const onReportSubmit = useSubmitReport();

  const file = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      setFileData(file);
    }
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar class="ion-padding">
          <IonTitle>Reporte Diario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form className="daily-report">
          <IonList>
            <div className="question-list">
              {reportQuestions.map(
                (question: ReportQuestion, index: number) => (
                  <div className="question" key={index}>
                    <p>{question.label}</p>
                    <IonRadioGroup
                      onIonChange={(e) =>
                        handleAnswerChange(question.key, e.detail.value)
                      }
                    >
                      <div className="answers-container">
                        <div className="radius-container">
                          <p>Sí</p>
                          <IonRadio value={true}></IonRadio>
                        </div>
                        <div className="radius-container">
                          <p>No</p>
                          <IonRadio value={false}></IonRadio>
                        </div>
                      </div>
                    </IonRadioGroup>
                  </div>
                )
              )}
              <IonLabel>Descripción (opcional):</IonLabel>
              <IonInput
                name="description"
                placeholder="Descripción"
                onIonChange={(event) => {
                  setDescription(event.target.value as string);
                  console.log(event.target.value);
                }}
              />
            </div>
            <div className="button-section">
              <IonButton
                onClick={(e) => {
                  if (Object.values(answers).filter(Boolean).length >= 2) {
                    setOpen(true);
                  } else {
                    onReportSubmit(description, answers);
                  }
                }}
              >
                Enviar
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>

      <IonModal isOpen={open}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Subir foto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="modal-content">
            <IonLabel>
              Contestó afirmativamente 2 preguntas, por lo tanto, deberá subir
              una foto
            </IonLabel>
            <IonLabel>Seleccione una foto dandole click al botón</IonLabel>
            <div className="camera-button">
              <IonIcon icon={cameraOutline} className="camera-icon"></IonIcon>
              <input
                type="file"
                ref={file}
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>
            <div className="buttons-container">
              <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
              <IonButton
                onClick={(e) => {
                  setOpen(false);
                  onReportSubmit(description, answers, fileData);
                  setAnswers(initialValues);
                }}
              >
                Enviar
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default ReportTab;
