import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
  IonAlert,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import { trashOutline, closeOutline } from "ionicons/icons";
import { deleteAllMessageNotificationsByUserId } from "../../services/messageNotifications/delete-all-message-notifications";
import { deleteMessageNotification } from "../../services/messageNotifications/delete-message-notifications";
import getMessageNotificationsByUserId from "../../services/messageNotifications/get-message-notifications";
import markMessageMessageNotificationAsRead from "../../services/messageNotifications/mark-as-read-message";
import store from "../../store";
import "./MessageNotificationList.css";

const MessageNotificationList: React.FC = () => {
  const user = store.getState().auth.user;
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const data = await getMessageNotificationsByUserId(user.id);
        setNotifications(data);
      }
    };
    fetchNotifications();
  }, [user]);

  const handleDeleteNotification = async (id: number) => {
    await deleteMessageNotification(id);
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDeleteAllNotifications = async () => {
    if (user) {
      await deleteAllMessageNotificationsByUserId(user.id);
      setNotifications([]);
    }
    setShowConfirmAlert(false);
  };

  const handleOpenNotification = async (notification: any) => {
    if (!notification.isRead) {
      await markMessageMessageNotificationAsRead(notification.id);
    }
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  return (
    <>
      <IonButton
        onClick={() => setShowConfirmAlert(true)}
        expand="full"
        color="danger"
      >
        Eliminar todas las notificaciones
      </IonButton>

      <IonList>
        {notifications.map((notification) => (
          <IonItem
            key={notification.id}
            onClick={() => handleOpenNotification(notification)}
          >
            <IonLabel>
              <h2>{notification.title}</h2>
              <p>{new Date(notification.createdAt).toLocaleDateString("es-ES")}</p>
            </IonLabel>
            <IonButton
              fill="clear"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotification(notification.id);
              }}
            >
              <IonIcon icon={trashOutline} />
            </IonButton>
          </IonItem>
        ))}
      </IonList>

      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => setShowConfirmAlert(false)}
        header={"Confirmación"}
        message={"¿Estás seguro de que deseas eliminar todas las notificaciones?"}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
          },
          {
            text: "Eliminar",
            handler: handleDeleteAllNotifications,
          },
        ]}
      />

      <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mensaje recibido</IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              onClick={handleCloseModal}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ padding: '16px' }}>
          <div className="modal-content">
            <p>{selectedNotification?.message}</p>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default MessageNotificationList;
