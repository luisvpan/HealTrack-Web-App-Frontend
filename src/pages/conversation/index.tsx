import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBackCircle, sendSharp } from "ionicons/icons";
import "./Conversation.css";
import { useHistory, useParams } from "react-router";
import { Socket, io } from "socket.io-client";
import store from "../../store";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import getMessagesById from "../../services/messages/get-messages-by-id.service";
import { ChatInfo, Message } from "../../types";
import sendMessage from "../../services/messages/create-message.service";

const Conversation: React.FC = () => {
  const history = useHistory();

  const { otherId } = useParams<{ otherId: string }>();
  const handleClick = () => {
    history.push("/messages");
  };

  const token = store.getState().auth.token;
  const userId = store.getState().auth.user?.id;
  const user = store.getState().auth.user;

  const today = new Date();

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3000", {
        extraHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }
  }, [token]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);

  const getAllMessages = useCallback(async () => {
    try {
      const response = await getMessagesById(Number(otherId));
      setMessages(response.data.items);
      setChatInfo(response.data.chat);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const submitMessage = useCallback(async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const message = form.elements.namedItem("message") as HTMLInputElement;
      await sendMessage(message.value, Number(otherId));
      socket.current!.emit("send_message", { user, message: message.value });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    socket.current!.on("connect", () => {
      console.log("Socket connected");
    });
    socket.current!.on("send_message", (newMessage: any) => {
      const adaptedMessage = {
        id: newMessage.message.id,
        message: newMessage.message.message.message,
        was_edited: newMessage.message.was_edited,
        createdAt: newMessage.message.createdAt,
        updatedAt: newMessage.message.updatedAt,
        user: newMessage.user,
      };

      setMessages((prevMessages) => {
        if (!prevMessages.some((message) => message.id === adaptedMessage.id)) {
          return [...prevMessages, adaptedMessage];
        } else {
          return prevMessages;
        }
      });
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="header">
            <IonIcon
              icon={chevronBackCircle}
              className="back-icon"
              onClick={handleClick}
            ></IonIcon>
            <IonAvatar className="ion-avatar">
              <img src="https://i.pravatar.cc/300" />
            </IonAvatar>
            {chatInfo && (
              <span className="details">
                {chatInfo.created_by.id === user!.id ? (
                  <h1>
                    {chatInfo.users[0].name} {chatInfo.users[0].lastname}{" "}
                    <span className="role">({chatInfo.users[0].role})</span>
                  </h1>
                ) : (
                  <h1>
                    {chatInfo.created_by.name} {chatInfo.created_by.lastname}{" "}
                    <span className="role">({chatInfo.created_by.role})</span>
                  </h1>
                )}
                {
                  //<p>En línea</p>
                }
              </span>
            )}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={submitMessage}>
          <div className="conversation">
            <div className="chat-section">
              {!messages
                ? null
                : messages.map((message) => (
                    <>
                      {message.user.id !== userId ? (
                        <div className="other messages" key={message.id}>
                          <div className="message other">{message.message}</div>
                          <span>
                            {today.toDateString() ===
                            new Date(message.createdAt).toDateString()
                              ? new Date(message.createdAt).toLocaleTimeString(
                                  "es-ES",
                                  { hour: "2-digit", minute: "2-digit" }
                                )
                              : new Date(message.createdAt).toLocaleDateString(
                                  "es-ES",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                          </span>
                        </div>
                      ) : (
                        <div className="mine messages" key={message.id}>
                          <div className="message mine">{message.message}</div>
                          <span>
                            {today.toDateString() ===
                            new Date(message.createdAt).toDateString()
                              ? new Date(message.createdAt).toLocaleTimeString(
                                  "es-ES",
                                  { hour: "2-digit", minute: "2-digit" }
                                )
                              : new Date(message.createdAt).toLocaleDateString(
                                  "es-ES",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                          </span>
                        </div>
                      )}
                    </>
                  ))}
            </div>
          </div>
          <div className="message-input">
            <IonInput
              placeholder="Escribe tu mensaje"
              name="message"
            ></IonInput>
            <div className="send-button">
              <IonButton type="submit">
                <IonIcon icon={sendSharp}></IonIcon>
              </IonButton>
            </div>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Conversation;
