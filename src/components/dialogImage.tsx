import {
    IonModal,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  } from "@ionic/react";
  import { FunctionComponent } from "react";
  import styled from "styled-components";
  
  const DialogImage: FunctionComponent<Prop> = ({
    open,
    handleClose,
    className,
    imageUrl,
  }) => {
    return (
      <IonModal isOpen={open} onDidDismiss={handleClose} className={className}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Imagen de reporte</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
            {imageUrl && (
              <img
                srcSet={imageUrl}
                src={imageUrl}
                alt="Imagen de reporte"
                loading="lazy"
                style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
              />
            )}
          </div>
          <IonButton expand="block" color="medium" onClick={handleClose}>
            Cerrar
          </IonButton>
        </IonContent>
      </IonModal>
    );
  };
  
  interface Prop {
    open: boolean;
    handleClose: () => void;
    className?: string;
    imageUrl: string | null;
  }
  
  export default styled(DialogImage)`
    display: flex;
    flex-direction: column;
  `;
  