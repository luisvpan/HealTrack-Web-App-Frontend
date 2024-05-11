import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useHistory } from "react-router";

const Tab1: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/login");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={handleClick}>volver al login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
