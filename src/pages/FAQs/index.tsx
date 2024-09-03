import { IonContent, IonList, IonItem, IonLabel, IonPage, IonHeader, IonTitle, IonToolbar, IonModal, IonButton } from '@ionic/react';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'; // Importa useHistory para la redirección
import useData from './useData';
import { FAQs } from '../../types';
import './FAQList.css';

const FAQList: React.FC = () => {
  const { items } = useData();
  const [selectedFAQ, setSelectedFAQ] = useState<FAQs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const history = useHistory(); // Usa useHistory para la redirección

  const openFAQ = useCallback((faq: FAQs) => {
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedFAQ(null);
  }, []);

  const goHome = () => {
    history.push('/home'); // Redirige a la página de inicio
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FAQs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton className="back-button" expand="full" onClick={goHome}>
          Volver al Inicio
        </IonButton>
        <IonList>
          {items.map((item) => (
            <IonItem key={item.id} button onClick={() => openFAQ(item)} className="recommendation-item">
              <IonLabel>
                <h2>{item.question}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="modal-title">Detalles de la Pregunta</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedFAQ && (
              <>
                <h2 className="modal-title">"{selectedFAQ.question}"</h2>
                <div className="modal-content-container">{selectedFAQ.answer}</div>
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

export default FAQList;
