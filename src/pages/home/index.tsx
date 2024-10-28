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
  IonIcon,
  IonToast,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./HomeTab.css";
import store, { useAppDispatch } from "../../store";
import { logout } from "../../store/authSlice";
import { chatbubbleEllipsesOutline, bookOutline } from "ionicons/icons";

import useGetWarningInfo from "./use-get-warning-info";
import WarningBanner from "./warning-banner";
import changePassword, { ChangePasswordBody } from "../../services/users/change-password";
import BackendError from "../../exceptions/backend-error";
import useSuccessToast from "../../components/SuccessToast";
import useErrorToast from "../../components/ErrorToast";
import triggerPanicButton from "../../services/patients/panic-button";
import PatientDetail from "./detail";
import EmployeeDetail from "./employeeDetail";
import { AllRoles, StatusPatient } from "../../types";
import getPatientByUserId from "../../services/patients/get-patient-by-user-id";
import checkUserFormSubmission from "../../services/appForm/check-user-form-submission";

const HomeTab: React.FC = () => {
  const user = store.getState().auth.user;
  const role = store.getState().auth.user?.role;
  const isPatient = role === AllRoles.PATIENT;
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
  const [patientStatus, setPatientStatus] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean | null>(null);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

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

  const goToRecommendations = () => {
    router.push("/recommendations");
  };

  const goToFAQs = () => {
    router.push("/chat-bot");
  };

  const goToCalifications = () => {
    if (hasSubmitted) {
      setShowSubmissionMessage(true);
    } else {
      router.push("/satistaction-formulary");
    }
  };

  useEffect(() => {
    const fetchPatientStatus = async () => {
      if (isPatient && user?.id) {
        try {
          const patientData = await getPatientByUserId(user.id);
          setPatientStatus(patientData.status);
        } catch (error) {
          console.error("Error al obtener el estado del paciente:", error);
        }
      }
    };

    const fetchFormSubmissionStatus = async () => {
      if (user?.id) {
        try {
          const submissionStatus = await checkUserFormSubmission(user.id);
          setHasSubmitted(submissionStatus);
        } catch (error) {
          console.error("Error al verificar si el usuario llenó el formulario:", error);
        }
      }
    };
    
    fetchPatientStatus();
    fetchFormSubmissionStatus();
  }, [isPatient, user]);

  const showCalificationsButton = isPatient && (patientStatus === StatusPatient.INACTIVE || patientStatus === StatusPatient.CLOSED);

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
            <IonButton color="medium" onClick={() => setOpenChangePasswordModal(true)}>
              Cambiar Contraseña
            </IonButton>
            {isPatient && (
              <IonButton
                onClick={() => setOpenPanicConfirmModal(true)}
                color="danger"
                disabled={panicButtonLoading}
              >
                {panicButtonLoading ? "Activando..." : "Botón de Pánico"}
              </IonButton>
            )}
            <IonButton onClick={() => logoutAndReturnToLogin()}>
              Cerrar Sesión
            </IonButton>
          </div>

          {showCalificationsButton && (
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center", marginTop: "10px" }}>
              <IonText>Califica nuestra aplicación</IonText>
              <IonButton 
                onClick={() => goToCalifications()} 
                style={{ marginTop: "10px", fontSize: "14px", padding: "6px 120px" }}
              >
                Califícanos
              </IonButton>
            </div>
          )}

          <div className="horizontal-buttons">
            <IonButton color="light" onClick={goToRecommendations}>
              <IonIcon slot="start" icon={bookOutline} /> Recomendaciones
            </IonButton>

            <IonButton color="light" onClick={goToFAQs}>
              <IonIcon slot="start" icon={chatbubbleEllipsesOutline} /> ChatBot
            </IonButton>
          </div>

          {role === AllRoles.PATIENT ? <PatientDetail /> : <EmployeeDetail />}
        </div>
        
        <IonToast
          isOpen={showSubmissionMessage}
          onDidDismiss={() => setShowSubmissionMessage(false)}
          message="Ya llenaste el formulario, gracias por tus comentarios."
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
