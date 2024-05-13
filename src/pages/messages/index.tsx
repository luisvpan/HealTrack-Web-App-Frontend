import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonBadge,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import {
  chatboxEllipsesOutline,
  checkmarkDoneOutline,
  searchSharp,
} from "ionicons/icons";

import "./MessagesTab.css";

const MessageTab: React.FC = () => {
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
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Emmanuel Salcedo</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Emmanuel Salcedo</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Hector Ferrer</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Emmanuel Salcedo</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Emmanuelinho</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
            <IonItem routerLink="/conversation" lines="none" detail={false}>
              <IonAvatar slot="start">
                <img src="https://i.pravatar.cc/300" />
              </IonAvatar>
              <IonLabel className="ion-text-nowrap">
                <h2>Alejandro Rosas</h2>
                <p>Escribiendo...</p>
              </IonLabel>
              <div className="info-container">
                <IonBadge className="ion-badge">1</IonBadge>
                <p>12:30pm</p>
              </div>
            </IonItem>
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
