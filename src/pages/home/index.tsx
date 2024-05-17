import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomeTab.css";
import store from "../../store";

const HomeTab: React.FC = () => {
  console.log(store.getState());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>¡Bienvenido Rodolfo!</IonText>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
