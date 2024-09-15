import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonGrid, IonRow, IonCol } from "@ionic/react";
import dayjs from "dayjs";
import { Props } from "./types";

const Detail: React.FC<Props> = ({ className, employee }) => {
  const hireDate = dayjs(employee.user?.createdAt).format("DD/MM/YYYY");

  return (
    <div className={className}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Información del empleado</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>Nombre:</IonText>
              </IonCol>
              <IonCol>
                <IonText>{employee.user?.name} {employee.user?.lastname}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Hospital:</IonText>
              </IonCol>
              <IonCol>
                <IonText>{employee.hospital?.name}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Identificación:</IonText>
              </IonCol>
              <IonCol>
                <IonText>{employee.user?.identification}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Correo Electrónico:</IonText>
              </IonCol>
              <IonCol>
                <IonText>{employee.user?.email}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Creado el:</IonText>
              </IonCol>
              <IonCol>
                <IonText>{hireDate}</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Detail;
