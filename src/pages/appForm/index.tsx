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
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./FormTab.css";
import useSubmitAppForm from "./use-submit-appForm";

export interface FormularyValues {
  likeApp: string;
  innescesaryDificultToUse: string;
  easyToUse: string;
  needExpertSupport: string;
  wellIntegratedFunctions: string;
  manyContradictions: string;
  peopleLearnQuickly: string;
  tediousToUse: string;
  feltConfidentUsing: string;
  neededKnowledgeBeforeUse: string;
  additionalInformation: string | null;
}

interface FormularyQuestion {
  label: string;
  key: keyof FormularyValues;
}

const formularyQuestions: FormularyQuestion[] = [
  { label: "Me gustaría usar esta herramienta más frecuentemente", key: "likeApp" },
  { label: "Considero que esta herramienta es innecesariamente compleja", key: "innescesaryDificultToUse" },
  { label: "Considero que la herramienta es fácil de usar", key: "easyToUse" },
  { label: "Considero necesario el apoyo de personal experto para poder utilizar esta herramienta", key: "needExpertSupport" },
  { label: "Considero que las funciones de la herramienta están bien integradas", key: "wellIntegratedFunctions" },
  { label: "Considero que la herramienta presenta muchas contradicciones", key: "manyContradictions" },
  { label: "Imagino que la mayoría de las personas aprenderían a usar esta herramienta rápidamente", key: "peopleLearnQuickly" },
  { label: "Considero que el uso de esta herramienta es tedioso", key: "tediousToUse" },
  { label: "Me sentí muy confiado al usar la herramienta", key: "feltConfidentUsing" },
  { label: "Necesité saber bastantes cosas antes de poder empezar a usar esta herramienta", key: "neededKnowledgeBeforeUse" },
];

const initialValues: FormularyValues = {
  likeApp: "",
  innescesaryDificultToUse: "",
  easyToUse: "",
  needExpertSupport: "",
  wellIntegratedFunctions: "",
  manyContradictions: "",
  peopleLearnQuickly: "",
  tediousToUse: "",
  feltConfidentUsing: "",
  neededKnowledgeBeforeUse: "",
  additionalInformation: null,
};

const FormularyTab: React.FC = () => {
  const [answers, setAnswers] = useState(initialValues);
  const [description, setDescription] = useState<string>("");
  const onReportSubmit = useSubmitAppForm();
  const file = useRef<HTMLInputElement>(null);

  const handleAnswerChange = (key: keyof FormularyValues, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar class="ion-padding">
          <IonTitle>Formulario de Satisfación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form className="formulary">
          <IonList>
            <div className="question-list">
              {formularyQuestions.map((question, index) => (
                <div className="question" key={index}>
                  <p>{question.label}</p>
                  <IonRadioGroup
                    onIonChange={(e) =>
                      handleAnswerChange(question.key, e.detail.value)
                    }
                  >
                    <div className="answers-container">
                      <div className="radius-container">
                        <p>Totalmente en desacuerdo</p>
                        <IonRadio value="Totalmente en desacuerdo"></IonRadio>
                      </div>
                      <div className="radius-container">
                        <p>En desacuerdo</p>
                        <IonRadio value="En desacuerdo"></IonRadio>
                      </div>
                      <div className="radius-container">
                        <p>Neutral</p>
                        <IonRadio value="Neutral"></IonRadio>
                      </div>
                      <div className="radius-container">
                        <p>De acuerdo</p>
                        <IonRadio value="De acuerdo"></IonRadio>
                      </div>
                      <div className="radius-container">
                        <p>Totalmente de acuerdo</p>
                        <IonRadio value="Totalmente de acuerdo"></IonRadio>
                      </div>
                    </div>
                  </IonRadioGroup>
                </div>
              ))}

              <IonLabel>Información adicional (opcional):</IonLabel>
              <IonInput
                name="additionalInformation"
                placeholder="Escribe aquí"
                onIonChange={(event) => {
                  setDescription(event.target.value as string);
                  setAnswers({ ...answers, additionalInformation: event.target.value as string });
                }}
              />
            </div>
            <div className="button-section">
              <IonButton
                onClick={(e) => {
                  onReportSubmit(description, answers);
                }}
              >
                Enviar
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default FormularyTab;
