import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomeTab.css";
import store, { useAppDispatch } from "../../store";
import { logout } from "../../store/authSlice";
import { useHistory } from "react-router";

import { checkmarkCircle, notifications } from "ionicons/icons";
import useGetWarningInfo from "./use-get-warning-info";
import WarningBanner from "./warning-banner";

const HomeTab: React.FC = () => {
  const user = store.getState().auth.user;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const logoutAndReturnToLogin = () => {
    dispatch(logout());
    history.push("/login");
  };
  const { warning, isLoading } = useGetWarningInfo();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="page-container">
          <IonText className="welcome-title">
            ¡Bienvenido/a, {user?.name} {user?.lastname}!
          </IonText>

          <WarningBanner warning={warning} isLoading={isLoading} />

          <div className="logout-button">
            <IonButton onClick={() => logoutAndReturnToLogin()}>
              Cerrar Sesión
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
