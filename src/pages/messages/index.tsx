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
  IonModal,
  IonButton,
} from "@ionic/react";
import {
  addCircleOutline,
  chatboxEllipsesOutline,
  chevronBackCircle,
  searchSharp,
} from "ionicons/icons";

import "./MessagesTab.css";
import getAllChats from "../../services/chats/get-all-chats.service";
import { Chat } from "../../types";
import store from "../../store";
import { useHistory } from "react-router";
import getAllEmployees from "../../services/users/get-all-employees.service";
import postChat from "../../services/chats/create-chat.service";

const MessageTab: React.FC = () => {
  const user = store.getState().auth.user;
  const [chats, setChats] = useState<Chat[]>([]);
  const [employees, setEmployees] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const fetchAllChats = useCallback(async () => {
    try {
      const response = await getAllChats();
      setChats(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllEmployees = useCallback(async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllChats();
  }, [fetchAllChats]);

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);

  const createChat = useCallback(async (userId: number) => {
    try {
      await postChat(userId);
      fetchAllChats();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            {chats.map((chat) => (
              <IonItem
                routerLink={`/conversation/${chat.id}`}
                lines="none"
                detail={false}
                key={chat.id}
              >
                <IonAvatar slot="start">
                  <img src="https://i.pravatar.cc/300" />
                </IonAvatar>
                <IonLabel className="ion-text-nowrap">
                  {chat.created_by.id === user!.id ? (
                    <h2>
                      {chat.users[0].name} {chat.users[0].lastname}
                    </h2>
                  ) : (
                    <h2>
                      {chat.created_by.name} {chat.created_by.lastname}
                    </h2>
                  )}

                  {chat.last_message === null ? (
                    <p>Escribe el primer mensaje!</p>
                  ) : (
                    <p>{chat.last_message.message}</p>
                  )}
                </IonLabel>
                <div className="info-container">
                  {chat.unread_messages_count > 0 && (
                    <IonBadge className="ion-badge">
                      {chat.unread_messages_count}
                    </IonBadge>
                  )}
                  {chat.last_message && (
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
                  )}
                </div>
              </IonItem>
            ))}
          </div>
        </div>
        {user?.role !== "patient" ? (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton className="ion-fab-button">
              <IonIcon
                onClick={() => setOpen(true)}
                icon={chatboxEllipsesOutline}
              ></IonIcon>
            </IonFabButton>
          </IonFab>
        ) : null}
      </IonContent>
      <IonModal isOpen={open}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Iniciar una conversación</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="modal-content">
            <IonIcon
              icon={chevronBackCircle}
              className="back-icon"
              onClick={() => setOpen(false)}
            ></IonIcon>
            {employees.map((employee: any) => {
              return (
                <IonItem key={employee.user.id}>
                  <div className="item-container">
                    <div className="employee-container">
                      <h3 className="employee-name">
                        {employee.user.name} {employee.user.lastname}
                      </h3>
                      <h4>Rol: {employee.user.role}</h4>
                    </div>
                    <IonButton
                      onClick={() => {
                        createChat(employee.user.id);
                        setOpen(false);
                      }}
                    >
                      <IonIcon
                        className="add-icon"
                        icon={addCircleOutline}
                      ></IonIcon>
                    </IonButton>
                  </div>
                </IonItem>
              );
            })}
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default MessageTab;
