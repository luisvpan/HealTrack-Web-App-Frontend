import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ReportTab.css";

const reportQuestions = [
  "Tiene temperatura mayor de 38,5 °C",
  "Tiene enrojecimiento alrededor de la herida operatoria",
  "Tiene hinchazón en la herida operatoria",
  "Presenta secreciones que salen a través de la herida operatoria",
  "Tiene temperatura mayor de 38,5 °C",
  "Tiene enrojecimiento alrededor de la herida operatoria",
  "Tiene hinchazón en la herida operatoria",
  "Presenta secreciones que salen a través de la herida operatoria",
];

const ReportTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reporte Diario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form className="daily-report">
          <IonList>
            <div className="question-list">
              <IonListHeader>Diario</IonListHeader>
              {reportQuestions.map((question: string) => (
                <div className="question">
                  <p>{question}</p>
                  <div className="radius-container">
                    <p>Sí</p>
                    <IonRadio></IonRadio>
                    <p>No</p>
                    <IonRadio></IonRadio>
                  </div>
                </div>
              ))}
            </div>
            <IonButton className="ion-button">Enviar</IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ReportTab;
