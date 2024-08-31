import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const DynamicTable: FunctionComponent<Props<any>> = ({
  headers,
  rows,
  settings,
  components,
  className,
  renderColumnClass,
  emptyState,
}) => {
  return (
    <IonCard className={className}>
      <IonCardContent>
        <IonGrid fixed={true}>
          <div style={{ display: "flex", overflowX: "auto", overflowY: "hidden", flexDirection: "column" }}>
            <IonRow>
              {headers.map(({ columnLabel, cellAlignment }, index) => (
                <IonCol key={columnLabel} style={{ textAlign: cellAlignment || "left" }}>
                  <IonText>{columnLabel}</IonText>
                </IonCol>
              ))}
              {components && <IonCol style={{ textAlign: "right" }}></IonCol>}
            </IonRow>
            {rows.map((row, indexRow) => {
              const rowClassName = renderColumnClass?.(row, indexRow) || "";
              return (
                <IonRow
                  key={`row-${indexRow}`}
                  className={rowClassName}
                  style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  {headers.map(({ fieldName, cellAlignment, ...header }, index) => (
                    <IonCol key={`${index}-${fieldName}`} style={{ textAlign: cellAlignment || "left" }}>
                      <IonText>
                        {fieldName && row[fieldName]}
                        {header.onRender && header.onRender(row, indexRow)}
                      </IonText>
                    </IonCol>
                  ))}
                  {components && (
                    <IonCol style={{ textAlign: settings?.cellAlignment || "right" }}>
                      {components.map((renderComponent, index) => renderComponent(row, indexRow))}
                    </IonCol>
                  )}
                </IonRow>
              );
            })}
            <IonRow>
              <IonCol size="12">
                {emptyState && rows.length <= 0 ? emptyState : ""}
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

type RowItem = Record<string, any>;
type SettingComponent<T, R> = (rowItem: T, index: number) => R;

interface Props<T> {
  className?: string;
  headers: Header<T>[];
  rows: RowItem[];
  settings?: Settings;
  components?: SettingComponent<T, ReactNode | string>[];
  renderColumnClass?: SettingComponent<T, string>;
  emptyState?: ReactNode | string;
}

export interface Settings {
  cellAlignment?: "left" | "center" | "right";
}

export interface Header<T> {
  columnLabel: string;
  fieldName?: string;
  cellAlignment?: "left" | "center" | "right";
  onRender?: SettingComponent<T, ReactNode | string>;
}

export default styled(DynamicTable)`
  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .table-wrapper {
    overflow-x: auto; /* Permitir el scroll horizontal en el contenedor de la tabla */
  }
`;
