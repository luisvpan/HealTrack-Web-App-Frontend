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
import store, { useAppDispatch } from "../../store";
import { logout } from "../../store/authSlice";
import { useHistory } from "react-router";

const HomeTab: React.FC = () => {
  const user = store.getState().auth.user;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logoutAndReturnToLogin = () => {
    dispatch(logout());
    history.push("/login");
  };

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
