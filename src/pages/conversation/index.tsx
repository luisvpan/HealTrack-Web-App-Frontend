import {
  IonAvatar,
  IonContent,
  IonFab,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkDoneOutline,
  chevronBackCircle,
  sendSharp,
} from "ionicons/icons";
import "./Conversation.css";
import { useHistory } from "react-router";

const Conversation: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/messages");
  };

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
            <IonAvatar>
              <img src="https://i.pravatar.cc/300" />
            </IonAvatar>
            <span className="details">
              <h1>Alejandro Rosas</h1>
              <p>En línea</p>
            </span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="conversation">
          <div className="chat-section">
            <div className="other messages">
              <div className="message other">Hey!</div>
              <div className="message other">You There</div>
              <div className="message other">Hello, how's going?</div>
              <span>1:04pm</span>
            </div>

            <div className="mine messages">
              <div className="message mine">Great, thanks!</div>
              <div className="message mine"> How about you</div>
              <span>
                <IonIcon icon={checkmarkDoneOutline}></IonIcon> 1:44pm
              </span>
            </div>

            <div className="other messages">
              <div className="message other">Hey!</div>
              <div className="message other">You There</div>
              <div className="message other">Hello, how's going?</div>
              <span>1:04pm</span>
            </div>

            <div className="mine messages">
              <div className="message mine">Great, thanks!</div>
              <div className="message mine"> How about you</div>
              <span>
                <IonIcon icon={checkmarkDoneOutline}></IonIcon> 1:44pm
              </span>
            </div>

            <div className="other messages">
              <div className="message other">Hey!</div>
              <div className="message other">You There</div>
              <div className="message other">
                Hello, how's going? Im Actually pretty good everything is
                alright HAHAHA
              </div>
              <span>1:04pm</span>
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <div className="message-input">
          <IonInput placeholder="Escribe tu mensaje"></IonInput>
          <div className="send-button">
            <IonIcon icon={sendSharp}></IonIcon>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Conversation;
