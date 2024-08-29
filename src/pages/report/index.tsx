import React, { useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
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

  const [surgeryExpense, setSurgeryExpense] = useState("No")

  const selectValues = [
    {value: "No", label: "No"},
    {value: "Si, de alimentación", label: "Si, de alimentación"},
    {value: "Si, de traslado", label: "Si, de traslado"},
    {value: "Si, pago a cuidadores", label: "Si, pago a cuidadores"},
    {value: "Si, de medicamentos", label: "Si, de medicamentos"},
  ]

  const [surgeryExpenseAmount, setSurgeryExpenseAmount] = useState(0.0)

  const onReportSubmit = useSubmitReport();

  const file = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

              <IonItem>
                <IonSelect 
                  label="¿Tuvo gasto relacionado con la cirugía?" 
                  placeholder="Selecciona una opción" 
                  onIonChange={(event) => {
                    setSurgeryExpense(event.target.value as string);
                  }}>
                  {selectValues.map((item)=>(<IonSelectOption value={item.value}>{item.label}</IonSelectOption>))}
                </IonSelect>
              </IonItem>

              {surgeryExpense !== "No" && (
                <>
                <IonLabel>Monto del Gasto en Cirugía:</IonLabel>
                <IonInput
                  name="surgeryExpenseAmount"
                  placeholder="Monto"
                  type="number"
                  onIonChange={(event) => {
                    setSurgeryExpenseAmount(event.target.value as number);
                  }}
                />
              </>
              )}

              <IonLabel>Descripción (opcional):</IonLabel>
              <IonInput
                name="description"
                placeholder="Descripción"
                onIonChange={(event) => {
                  setDescription(event.target.value as string);
                }}
              />
            </div>
            <div className="button-section">
              <IonButton
                onClick={(e) => {
                  if (Object.values(answers).filter(Boolean).length >= 2) {
                    setOpen(true);
                  } else {
                    onReportSubmit(description, answers, surgeryExpense, surgeryExpenseAmount);
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
                  onReportSubmit(description, answers, surgeryExpense, surgeryExpenseAmount, fileData);
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
