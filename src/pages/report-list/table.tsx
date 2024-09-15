import {
  IonButton,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import Pagination from "../../components/pagination";
import { eyeOutline, createOutline } from "ionicons/icons";
import dayjs from "dayjs";
import DynamicTable, { Settings } from "../../components/DynamicTable";
import { PaginationData, Report } from "../../types";
import { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";
import store from "../../store/index";
import DialogImage from "../../components/dialogImage";
import { AllRoles } from "../../types";
import { useHistory } from "react-router";

const Table: FunctionComponent<Props> = ({
  items,
  className,
  fetchItems,
  setPaginationData,
  paginationData,
}) => {
  const role = store.getState().auth.user?.role;
  const history = useHistory();
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [dialogImage, setDialogImage] = useState<string | null>("");

  const handleOpenImage = useCallback((imageUrl: string | null) => {
    setOpenImage(true);
    setDialogImage(imageUrl);
  }, []);

  const handleCloseImage = useCallback(() => {
    setOpenImage(false);
    setDialogImage("");
  }, []);

  // Debugging: Log items to check if data is being passed correctly
  console.log('Items:', items);

  return (
    <IonGrid className={className}>
      {/* Render a message if no data is available */}
      {items.length === 0 ? (
        <IonText>No hay reportes disponibles.</IonText>
      ) : (
        <DynamicTable
          headers={[
            ...(role !== AllRoles.PATIENT
              ? [
                  {
                    columnLabel: "Paciente",
                    cellAlignment: "center" as Settings["cellAlignment"],
                    onRender: (row: Report) => (
                      <IonText>
                        {`${row.user?.name} ${row.user?.lastname}`}
                      </IonText>
                    ),
                  },
                ]
              : []),
            {
              columnLabel: "Fecha",
              onRender: (row: Report) => (
                <IonText>
                  {dayjs(row.createdAt).format("DD/MM/YYYY")}
                </IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "¿Tiene temperatura alta?",
              onRender: (row: Report) => (
                <IonText>{row.hasHighTemperature ? "Si" : "No"}</IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "¿Tiene enrojecimiento?",
              onRender: (row: Report) => (
                <IonText>{row.hasRedness ? "Si" : "No"}</IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "¿Tiene hinchazón?",
              onRender: (row: Report) => (
                <IonText>{row.hasSwelling ? "Si" : "No"}</IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "¿Tiene secreciones?",
              onRender: (row: Report) => (
                <IonText>{row.hasSecretions ? "Si" : "No"}</IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "¿Tuvo gasto relacionado con la cirugía?",
              fieldName: "surgeryExpense",
              cellAlignment: "center",
            },
            {
              columnLabel: "Monto de gasto",
              onRender: (row: Report) => (
                <IonText>{row.surgeryExpenseAmount} $</IonText>
              ),
              cellAlignment: "center",
            },
            {
              columnLabel: "Descripción",
              fieldName: "additionalInformation",
              cellAlignment: "center",
            },
          ]}
          rows={items}
          components={[
            (row: Report) =>
              row.fileUrl ? (
                <IonButton
                  color="medium"
                  onClick={() => handleOpenImage(row.fileUrl)}
                >
                  <IonIcon slot="start" icon={eyeOutline} />
                  Ver Imagen
                </IonButton>
              ) : null,
            (row: Report) =>
              role === AllRoles.PATIENT ? (
                <IonButton
                  color="primary"
                  onClick={() => {
                    history.push("/reports/edit/" + row.id);
                  }}
                >
                  <IonIcon slot="start" icon={createOutline} />
                  Editar
                </IonButton>
              ) : null,
          ]}
        />
      )}
      <DialogImage
        handleClose={handleCloseImage}
        open={openImage}
        imageUrl={dialogImage}
      />
      <IonRow className={"paginator-container"}>
        <IonCol>
          <Pagination
            totalPages={paginationData.totalPages}
            currentPage={paginationData.page}
            onPageChange={(page) =>
              setPaginationData({ ...paginationData, page })
            }
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

type Props = {
  items: Report[];
  className?: string;
  fetchItems: () => void;
  setPaginationData: (paginationData: PaginationData) => void;
  paginationData: PaginationData;
};

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .table-wrapper {
    overflow-x: auto; /* Permitir el scroll horizontal en el contenedor de la tabla */
  }

  /* Añadir scroll horizontal a la tabla en pantallas pequeñas */
  @media (max-width: 768px) {
    .table-container {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch; /* Mejora la experiencia de scroll en dispositivos táctiles */
    }

    table {
      min-width: 600px; /* Ajusta esto según el ancho mínimo que debe tener tu tabla */
    }
  }
`;
