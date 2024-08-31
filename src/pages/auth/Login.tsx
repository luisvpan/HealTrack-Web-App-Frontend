import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonAlert,
  IonModal,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { SyntheticEvent, useCallback, useState } from "react";
import healtrackLogo from "../../components/HealTrack.png";

import "./login.css";

import { useAppDispatch } from "../../store";
import login from "../../services/auth/login";
import sendResetPasswordEmail from "../../services/users/sendResetPassword";
import { authUser } from "../../store/authSlice";

import useSuccessToast from "../../components/SuccessToast";
import useErrorToast from "../../components/ErrorToast";
import BackendError from "../../exceptions/backend-error";

const Login: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar la visibilidad de la contraseña
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

  const onForgotPasswordSubmit = async () => {
    try {
      await sendResetPasswordEmail(email);
      successToast("Correo enviado con éxito");
      setOpenModal(false);
    } catch (error) {
      if (error instanceof BackendError) {
        errorToast(error.message);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <form onSubmit={onLoginSubmit} className="form-container">
          <div className="logo-title-container">
          <img src={healtrackLogo} alt="HealTrack Logo" className="logo" />
            <IonText className="login-title">HealTrack</IonText>
          </div>
          <IonText className="subtitle">Bienvenido/a</IonText>
          <IonInput
            name="email"
            placeholder="Correo"
            className="login-input"
          ></IonInput>

          <div className="password-input-container">
            <IonInput
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"} // Controla el tipo de input
              name="password"
              className="login-input"
            ></IonInput>
            <IonIcon
              className="password-toggle-icon"
              icon={showPassword ? eyeOff : eye} // Cambia el ícono según la visibilidad
              onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad de la contraseña
            />
          </div>
          <IonButton className="login-button" type="submit">
            Iniciar Sesión
          </IonButton>

          {/* Enlace para "¿Olvidó contraseña?" */}
          <IonText
            className="forgot-password-link"
            onClick={() => setOpenModal(true)}
          >
            ¿Olvidó su contraseña? Pulse aquí
          </IonText>
        </form>
      </IonContent>

      {/* Modal para solicitar el email */}
      <IonModal isOpen={openModal} onDidDismiss={() => setOpenModal(false)}>
        <div className="modal-content">
          <IonText>Ingrese su correo electrónico</IonText>
          <IonInput
            name="reset-email"
            placeholder="Correo"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
          <IonButton onClick={onForgotPasswordSubmit}>
            Enviar correo de restablecimiento
          </IonButton>
          <IonButton onClick={() => setOpenModal(false)} color="light">
            Cancelar
          </IonButton>
        </div>
      </IonModal>

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
