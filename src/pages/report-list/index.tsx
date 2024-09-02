import store from "../../store";
import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { AllRoles } from "../../types";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonText,
  IonDatetime,
  IonButton,
  IonModal,
} from "@ionic/react";
import { FunctionComponent, useState } from "react";
import usePatientsOptions from "../../core/patients/use-patients-options";
import dayjs from "dayjs";

const ReportsList: FunctionComponent<Prop> = ({ className }) => {
  const userRole = store.getState().auth.user?.role;
  const patientOptions = usePatientsOptions();
  const {
    items,
    fetchReports,
    setPatientId,
    patientId,
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    pagination,
    setPagination,
  } = useData();

  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleStartDateChange = (e: CustomEvent) => {
    setTempStartDate(e.detail.value as string);
  };

  const handleEndDateChange = (e: CustomEvent) => {
    setTempEndDate(e.detail.value as string);
  };

  const handleAcceptStartDate = () => {
    setStartDate(dayjs(tempStartDate).format("YYYY-MM-DD"));
    setShowStartDateModal(false);
  };

  const handleAcceptEndDate = () => {
    setEndDate(dayjs(tempEndDate).format("YYYY-MM-DD"));
    setShowEndDateModal(false);
  };

  const handleClearStartDate = () => {
    setTempStartDate(""); // Clear the temporary start date
  };

  const handleClearEndDate = () => {
    setTempEndDate(""); // Clear the temporary end date
  };

  return (
    <>
      <IonCard className={className}>
        <IonCardHeader>
          <div className="header-container">
            <IonText className="title-header">
              <h3>Reportes</h3>
            </IonText>
            <div className="filters-container">
              {userRole !== AllRoles.PATIENT && (
                <>
                  <IonItem button onClick={() => setShowStartDateModal(true)}>
                    <IonLabel>Desde: </IonLabel>
                    <IonText>{startDate || "Seleccione una fecha"}</IonText>
                  </IonItem>
                  <IonItem button onClick={() => setShowEndDateModal(true)}>
                    <IonLabel>Hasta: </IonLabel>
                    <IonText>{endDate || "Seleccione una fecha"}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Paciente: </IonLabel>
                    <IonSelect
                      value={patientId}
                      placeholder="Seleccione un paciente"
                      onIonChange={(e) => setPatientId(Number(e.detail.value))}
                    >
                      {patientOptions.map((option) => (
                        <IonSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </>
              )}
            </div>
          </div>
        </IonCardHeader>
        <IonCardContent className="content">
          <div className="table-wrapper">
            <div className="table-container">
              <Table
                items={items}
                fetchItems={fetchReports}
                paginationData={pagination}
                setPaginationData={setPagination}
              />
            </div>
          </div>
          <div className="pagination-container">
            {/* Agrega aquí el componente de paginación */}
          </div>
        </IonCardContent>
      </IonCard>

      {/* Modal para la fecha de inicio */}
      <IonModal isOpen={showStartDateModal} onDidDismiss={() => setShowStartDateModal(false)}>
        <IonCard>
          <IonCardHeader>
            <IonLabel>Selecciona la fecha de inicio</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonDatetime value={tempStartDate} onIonChange={handleStartDateChange} />
            <div className="buttons-container">
              <IonButton expand="full" color="primary" onClick={handleAcceptStartDate}>Aceptar</IonButton>
              <IonButton expand="full" color="light" onClick={handleClearStartDate}>Limpiar</IonButton>
              <IonButton expand="full" color="light" onClick={() => setShowStartDateModal(false)}>Cerrar</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonModal>

      {/* Modal para la fecha de fin */}
      <IonModal isOpen={showEndDateModal} onDidDismiss={() => setShowEndDateModal(false)}>
        <IonCard>
          <IonCardHeader>
            <IonLabel>Selecciona la fecha de fin</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonDatetime value={tempEndDate} onIonChange={handleEndDateChange} />
            <div className="buttons-container">
              <IonButton expand="full" color="primary" onClick={handleAcceptEndDate}>Aceptar</IonButton>
              <IonButton expand="full" color="light" onClick={handleClearEndDate}>Limpiar</IonButton>
              <IonButton expand="full" color="light" onClick={() => setShowEndDateModal(false)}>Cerrar</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </>
  );
};

interface Prop {
  className?: string;
}

export default styled(ReportsList)`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Asegura que el contenedor principal ocupe toda la altura de la pantalla */

  .header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .filters-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: calc(90vh - 56px); /* Ajusta la altura disponible para el contenido */
  }

  .table-wrapper {
    overflow-y: auto; /* Permitir el scroll vertical en el contenedor de la tabla */
    flex: 1; /* Permite que el contenedor ocupe el espacio restante */
  }

  .table-container {
    min-width: 1000px; /* Ancho mínimo de la tabla para asegurar el scroll horizontal */
    height: 100%; /* Asegura que el contenedor de la tabla ocupe toda la altura disponible */
  }

  .pagination-container {
    margin-top: 10px; /* Espacio entre la tabla y el botón de paginación */
    padding: 10px; /* Opcional: para mayor separación */
  }

  .buttons-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
`;
