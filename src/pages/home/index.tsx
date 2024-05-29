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
  const user = store.getState().auth.user;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>¡Bienvenido a HealTrack!</IonText>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
