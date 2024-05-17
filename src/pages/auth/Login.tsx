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
import { SyntheticEvent, useCallback } from "react";
import { useAppDispatch } from "../../store";
import { authUser } from "../../store/authSlice";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onLoginSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const emailInput = form.elements.namedItem("email") as HTMLInputElement;
      const passwordInput = form.elements.namedItem(
        "password"
      ) as HTMLInputElement;

      const user = await login({
        email: emailInput.value,
        password: passwordInput.value,
      });

      dispatch(authUser({ ...user, remember: true }));
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
            name="email"
            placeholder="Correo"
            className="login-input"
          ></IonInput>

          <IonInput
            placeholder="Contraseña"
            type="password"
            name="password"
            className="login-input"
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
