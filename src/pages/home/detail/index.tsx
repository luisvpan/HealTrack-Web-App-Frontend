import React, { useState, useEffect } from "react";
import Detail from "./detail";
import styled from "styled-components";
import getPatientByUserId from "../../../services/patients/get-patient-by-user-id";
import { useAppSelector } from "../../../store";
import { Patient } from "../../../types";
import { IonSpinner } from "@ionic/react";

const PatientDetail: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (user?.id) {
        try {
          const patientData = await getPatientByUserId(user.id);
          setPatient(patientData);
        } catch (error) {
          console.error("Error fetching patient:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [user?.id]);

  if (loading) {
    return <IonSpinner />;
  }

  if (!patient) {
    return <div>No se encontró el paciente.</div>;
  }

  return (
    <div>
      <Detail patient={patient} />
    </div>
  );
};

export default styled(PatientDetail)`
  display: flex;
  flex-direction: column;
`;
