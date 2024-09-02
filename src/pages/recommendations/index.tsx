import { IonContent, IonList, IonItem, IonLabel, IonPage, IonHeader, IonTitle, IonToolbar, IonModal, IonButton } from '@ionic/react';
import { useState, useCallback } from 'react';
import useData from './useData';
import { Recommendation } from '../../types';
import './RecommendationList.css';
import { useIonRouter } from '@ionic/react';

const RecommendationList: React.FC = () => {
  const { items } = useData();
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useIonRouter();

  const openRecommendation = useCallback((recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRecommendation(null);
  }, []);

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recomendaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="full" onClick={goToHome} className="back-button">
          Volver al inicio
        </IonButton>
        <IonList>
          {items.map((item) => (
            <IonItem key={item.id} button onClick={() => openRecommendation(item)} className="recommendation-item">
              <IonLabel>
                <h2>{item.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalles de la Recomendación</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedRecommendation && (
              <>
                <h2 className="modal-title">"{selectedRecommendation.title}"</h2>
                <div className="modal-content-container">{selectedRecommendation.content}</div>
              </>
            )}
            <IonButton expand="full" onClick={closeModal}>
              Cerrar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default RecommendationList;
