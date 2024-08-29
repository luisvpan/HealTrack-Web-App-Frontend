import React, { useState, useEffect, useCallback } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonBadge,
} from "@ionic/react";
import { chatbubbleOutline } from "ionicons/icons";
import { getUnreadMessageNotificationsCount } from "../../services/messageNotifications/get-message-notifications-unread";
import MessageNotificationList from "./messageNotificationsList";
import store from "../../store";
import "./MessageNotificationSection.css";

const MessageNotificationSection: React.FC = () => {
  const user = store.getState().auth.user;
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadNotificationsCount = useCallback(async () => {
    if (user?.id) {
      try {
        const count = await getUnreadMessageNotificationsCount(user.id);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error fetching unread notifications count:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadNotificationsCount();
    const intervalId = setInterval(() => {
      fetchUnreadNotificationsCount();
    }, 30000); // 30 segundos

    return () => clearInterval(intervalId);
  }, [fetchUnreadNotificationsCount]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MessageNotificationList />
      </IonContent>
    </IonPage>
  );
};

export default MessageNotificationSection;
