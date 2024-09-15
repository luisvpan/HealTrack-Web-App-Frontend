import React, { useEffect, useState } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonSpinner, IonText } from "@ionic/react";
import { Props } from "./types";
import getMedicName from "../../../services/patients/get-medic-name";
import dayjs from "dayjs";

const Detail: React.FC<Props> = ({ patient }) => {
  const surgeryDate = dayjs(patient.surgeryDate).format("DD/MM/YYYY");
  const [medicName, setMedicName] = useState<string>("");

  useEffect(() => {
    const fetchMedicName = async () => {
      try {
        const name = await getMedicName(patient.id);
        setMedicName(name);
      } catch (error) {
        console.error(`Error fetching medic name for patient ${patient.id}:`, error);
      }
    };

    fetchMedicName();
  }, [patient.id]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Información del Paciente</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>Nombre:</IonLabel>
          <IonText>{patient.user.name} {patient.user.lastname}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Edad:</IonLabel>
          <IonText>{patient.age}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Sexo:</IonLabel>
          <IonText>{patient.sex === "M" ? "Masculino" : "Femenino"}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Dirección:</IonLabel>
          <IonText>{patient.address}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Hospital:</IonLabel>
          <IonText>{patient.hospital.name}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Teléfono Celular:</IonLabel>
          <IonText>{patient.personalPhone}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Teléfono de Casa:</IonLabel>
          <IonText>{patient.homePhone}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Enfermero/a:</IonLabel>
          <IonText>{medicName || "No asignado"}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Procedimiento:</IonLabel>
          <IonText>{patient.surgeryProcedure}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Fecha de Procedimiento:</IonLabel>
          <IonText>{surgeryDate}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Estado:</IonLabel>
          <IonText>{patient.status}</IonText>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default Detail;
