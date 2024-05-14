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
import login from "../../services/auth/login";
import { SyntheticEvent, useCallback, useState } from "react";

const Login: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={LoginImage} className="login-image"></IonImg>
        <form onSubmit={onLoginSubmit}>
          <IonText className="login-title">HealTrack</IonText>
          <IonInput
            placeholder="Correo"
            className="login-input"
            onIonChange={(e) => setEmail(e.target.value as string)}
          ></IonInput>
          <IonInput
            placeholder="Contraseña"
            type="password"
            className="login-input"
            onIonChange={(e) => setPassword(e.target.value as string)}
          ></IonInput>
          <IonButton className="login-button" type="submit">
            Iniciar Sesión
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
