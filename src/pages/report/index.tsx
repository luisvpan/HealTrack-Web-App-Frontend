import React, { useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ReportTab.css";
import { cameraOutline } from "ionicons/icons";

const reportQuestions = [
  "Tiene temperatura mayor de 38,5 °C",
  "Tiene enrojecimiento alrededor de la herida operatoria",
  "Tiene hinchazón en la herida operatoria",
  "Presenta secreciones que salen a través de la herida operatoria",
];

const ReportTab: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [answers, setAnswers] = useState(
    Array(reportQuestions.length).fill(null)
  );

  const handleAnswerChange = (index: number, answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para manejar la subida de archivos
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aquí puedes manejar el archivo subido
      console.log(file);
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
              {reportQuestions.map((question: string, index: number) => (
                <div className="question">
                  <p>{question}</p>
                  <IonRadioGroup
                    onIonChange={(e) =>
                      handleAnswerChange(index, e.detail.value)
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
              ))}
            </div>
            <div className="button-section">
              <IonButton
                onClick={() => {
                  if (answers.filter((answer) => answer === true).length > 1) {
                    setOpen(true);
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
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            <div className="buttons-container">
              <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
              <IonButton onClick={() => setOpen(false)}>Enviar</IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default ReportTab;
