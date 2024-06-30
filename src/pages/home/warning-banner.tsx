import { IonIcon, IonText } from "@ionic/react";
import { checkmarkCircle, notifications } from "ionicons/icons";
import store from "../../store";

const WarningBanner = ({ warning, isLoading }: Props) => {
  const user = store.getState().auth.user;
  return (
    <>
      {!warning && user?.role === "patient" && !isLoading && (
        <div className="please-upload-banner">
          <IonText>
            Nos interesa saber como está tu estado ¡Suba el reporte diario!
          </IonText>
          <IonIcon className="bell-icon" icon={notifications}></IonIcon>
        </div>
      )}

      {warning && user?.role === "patient" && !isLoading && (
        <div className="uploaded-banner">
          <IonText>¡Ya ha subido el reporte del día de hoy!</IonText>
          <IonIcon className="check-icon" icon={checkmarkCircle}></IonIcon>
        </div>
      )}
    </>
  );
};

export interface Props {
  warning: boolean;
  isLoading: boolean;
}

export default WarningBanner;
