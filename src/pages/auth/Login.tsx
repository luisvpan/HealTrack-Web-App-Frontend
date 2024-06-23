import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonAlert,
} from "@ionic/react";
import { SyntheticEvent, useCallback, useState } from "react";

import "./login.css";

import { useHistory } from "react-router";
import { useAppDispatch } from "../../store";
import login from "../../services/auth/login";
import { authUser } from "../../store/authSlice";
import BackendError from "../../exceptions/backend-error";
import { getOneSignalInstance } from "../../services/one-signal/one-signal.service";

const Login: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onLoginSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const oneSignalInstance = getOneSignalInstance();

      const form = event.target as HTMLFormElement;
      const emailInput = form.elements.namedItem("email") as HTMLInputElement;
      const passwordInput = form.elements.namedItem(
        "password"
      ) as HTMLInputElement;

      const user = await login({
        email: emailInput.value,
        password: passwordInput.value,
      });

      console.log(user);

      const osresponse = await oneSignalInstance.login(
        user.id.toString(),
        user.token
      );

      console.log(osresponse);
      dispatch(authUser({ ...user, remember: true }));
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <form onSubmit={onLoginSubmit} className="form-container">
          <IonText className="login-title">Bienvenido/a</IonText>
          <IonText className="subtitle">HealTrack</IonText>
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
      <IonAlert
        isOpen={openAlert}
        header="Usuario bloqueado"
        message="El usuario se encuentra hospitalizado o dado de alta."
        buttons={["Cerrar"]}
        onDidDismiss={() => setOpenAlert(false)}
      />
    </IonPage>
  );
};

export default Login;
