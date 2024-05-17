import React, { useCallback, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonBadge,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import { chatboxEllipsesOutline, searchSharp } from "ionicons/icons";

import "./MessagesTab.css";
import getAllChats from "../../services/chats/get-all-chats.service";
import { Chat } from "../../types";
import store from "../../store";

const MessageTab: React.FC = () => {
  const user = store.getState().auth.user;
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchAllChats = useCallback(async () => {
    try {
      const response = await getAllChats();
      setChats(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllChats();
  }, [fetchAllChats]);
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar class="ion-padding">
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="chat-list">
          <div className="heading">
            <h1>Mensajes Recientes</h1>
            <IonIcon icon={searchSharp} className="header-icon"></IonIcon>
          </div>

          <div className="chats">
            {chats.map((chat, index) => (
              <IonItem
                routerLink={`/conversation/${chat.id}`}
                lines="none"
                detail={false}
              >
                <IonAvatar slot="start">
                  <img src="https://i.pravatar.cc/300" />
                </IonAvatar>
                <IonLabel className="ion-text-nowrap">
                  {chat.created_by.id === user!.id ? (
                    <h2>
                      {chat.users[index].name} {chat.users[index].lastname}
                    </h2>
                  ) : (
                    <h2>
                      {chat.created_by.name} {chat.created_by.lastname}
                    </h2>
                  )}

                  <p>{chat.last_message.message}</p>
                </IonLabel>
                <div className="info-container">
                  {chat.unread_messages_count > 0 && (
                    <IonBadge className="ion-badge">
                      {chat.unread_messages_count}
                    </IonBadge>
                  )}
                  <p>
                    {new Date(chat.last_message.updatedAt).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </IonItem>
            ))}
          </div>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="ion-fab-button">
            <IonIcon icon={chatboxEllipsesOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MessageTab;
