import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonModal,
  IonInput,
  IonLabel,
  IonItem,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import "./HomeTab.css";
import store, { useAppDispatch } from "../../store";
import { logout } from "../../store/authSlice";

import useGetWarningInfo from "./use-get-warning-info";
import WarningBanner from "./warning-banner";
import changePassword, { ChangePasswordBody } from "../../services/users/change-password";
import BackendError from "../../exceptions/backend-error";
import useSuccessToast from "../../components/SuccessToast";
import useErrorToast from "../../components/ErrorToast";
import triggerPanicButton from "../../services/patients/panic-button";

const HomeTab: React.FC = () => {
  const user = store.getState().auth.user;
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openPanicConfirmModal, setOpenPanicConfirmModal] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [panicButtonLoading, setPanicButtonLoading] = useState(false);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const logoutAndReturnToLogin = () => {
    dispatch(logout());
    router.push("/login");
  };

  const { warning, isLoading } = useGetWarningInfo();

  const handleChangePassword = async () => {
    try {
      const body: ChangePasswordBody = {
        userEmail: email,
        currentPassword,
        newPassword,
      };

      await changePassword(body);
      successToast("Contraseña actualizada correctamente");
      setOpenChangePasswordModal(false);
    } catch (error) {
      if (error instanceof BackendError) {
        errorToast(error.message);
      }
    }
  };

  const handlePanicButtonClick = async () => {
    if (user?.id) {
      try {
        setPanicButtonLoading(true);
        await triggerPanicButton(user.id);
        successToast("Botón de pánico activado");
      } catch (error) {
        errorToast("Error al activar el botón de pánico");
      } finally {
        setPanicButtonLoading(false);
      }
    } else {
      errorToast("Usuario no encontrado");
    }
  };

  const confirmPanicButton = async () => {
    await handlePanicButtonClick();
    setOpenPanicConfirmModal(false);
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

          <WarningBanner warning={warning} isLoading={isLoading} />

          <div className="button-group">
            <IonButton onClick={() => setOpenChangePasswordModal(true)}>
              Cambiar Contraseña
            </IonButton>
            <IonButton
              onClick={() => setOpenPanicConfirmModal(true)}
              color="danger"
              disabled={panicButtonLoading}
            >
              {panicButtonLoading ? "Activando..." : "Botón de Pánico"}
            </IonButton>
            <IonButton onClick={() => logoutAndReturnToLogin()}>
              Cerrar Sesión
            </IonButton>
          </div>
        </div>
      </IonContent>

      <IonModal isOpen={openChangePasswordModal} onDidDismiss={() => setOpenChangePasswordModal(false)}>
        <div className="modal-content">
          <IonText className="modal-title">Cambiar Contraseña</IonText>

          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña Actual</IonLabel>
            <IonInput
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onIonChange={(e) => setCurrentPassword(e.detail.value!)}
              required
            />
            <IonButton slot="end" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? "Ocultar" : "Mostrar"}
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Nueva Contraseña</IonLabel>
            <IonInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onIonChange={(e) => setNewPassword(e.detail.value!)}
              required
            />
            <IonButton slot="end" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? "Ocultar" : "Mostrar"}
            </IonButton>
          </IonItem>

          <IonButton expand="block" onClick={handleChangePassword}>
            Guardar Cambios
          </IonButton>
          <IonButton expand="block" color="light" onClick={() => setOpenChangePasswordModal(false)}>
            Cancelar
          </IonButton>
        </div>
      </IonModal>

      <IonModal isOpen={openPanicConfirmModal} onDidDismiss={() => setOpenPanicConfirmModal(false)}>
        <div className="modal-content">
          <IonText className="modal-title">Activar Botón de Pánico</IonText>
          <IonText className="modal-subtitle">¿Estás seguro de que deseas activar el botón de pánico?</IonText>

          <div className="confirm-button-group">
            <IonButton
              expand="block"
              color="danger"
              onClick={confirmPanicButton}
            >
              Sí
            </IonButton>
            <IonButton
              expand="block"
              color="primary"
              onClick={() => setOpenPanicConfirmModal(false)}
            >
              No
            </IonButton>
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default HomeTab;
