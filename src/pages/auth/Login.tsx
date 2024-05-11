import {
  IonButton,
  IonContent,
  IonImg,
  IonInput,
  IonPage,
  IonText,
} from "@ionic/react";

import LoginImage from "./loginImage.png";
import "./login.css";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/tab1");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={LoginImage} className="login-image"></IonImg>
        <div>
          <IonText className="login-title">HealTrack</IonText>
          <IonInput placeholder="Correo" className="login-input"></IonInput>
          <IonInput
            placeholder="Contraseña"
            type="password"
            className="login-input"
          ></IonInput>
          <IonButton className="login-button" onClick={handleClick}>
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
