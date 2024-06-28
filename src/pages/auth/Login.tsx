import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonAlert,
  useIonRouter,
} from "@ionic/react";
import { SyntheticEvent, useCallback, useState } from "react";

import "./login.css";

import { useAppDispatch } from "../../store";
import login from "../../services/auth/login";
import { authUser } from "../../store/authSlice";

import useSuccessToast from "../../components/SuccessToast";
import useErrorToast from "../../components/ErrorToast";
import BackendError from "../../exceptions/backend-error";

const Login: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

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

      successToast("Ha iniciado sesión correctamente");

      dispatch(authUser({ ...user, remember: true }));
      router.push("/home");
    } catch (error) {
      if (error instanceof BackendError) {
        errorToast(error.message);
      }
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
