import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { alarm, chatbubbles, home, list, notifications } from 'ionicons/icons';
import HomeTab from './pages/home';
import MessagesTab from './pages/messages';
import MessageNotificationSection from './pages/messageNotifications';
import Login from './pages/auth/Login';
import Conversation from './pages/conversation';
import ReportTab from './pages/report';
import NotificationSection from './pages/notifications';
import ReportList from './pages/report-list';
import EditReport from './pages/report-list/edit';

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';
import { AllRoles } from '../src/types';
import { initOneSignal } from './services/one-signal/one-signal.service';
import { getUnreadMessageNotificationsCount } from './services/messageNotifications/get-message-notifications-unread';
import { getUnreadNotificationsCount } from './services/notifications/get-notifications-unread';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import 'react-toastify/dist/ReactToastify.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  initOneSignal();

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <AppContent />
          <ToastContainer />
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [panicUnreadCount, setPanicUnreadCount] = useState(0);
  const token = store.getState().auth.token;
  const role = store.getState().auth.user?.role;

  // Callback to fetch unread message notifications count
  const fetchUnreadMessageNotificationsCount = useCallback(async () => {
    const userId = store.getState().auth.user?.id;
    if (userId) {
      try {
        const count = await getUnreadMessageNotificationsCount(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error fetching unread message notifications count:', error);
      }
    }
  }, []);

  // Callback to fetch unread general notifications count
  const fetchUnreadNotificationsCount = useCallback(async () => {
    const userId = store.getState().auth.user?.id;
    if (userId) {
      try {
        const count = await getUnreadNotificationsCount(userId);
        setPanicUnreadCount(count); // Assuming panic notifications are a subset of notifications
      } catch (error) {
        console.error('Error fetching unread notifications count:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchUnreadMessageNotificationsCount();
    const intervalId1 = setInterval(() => {
      fetchUnreadMessageNotificationsCount();
    }, 30000); // 30 segundos

    fetchUnreadNotificationsCount();
    const intervalId2 = setInterval(() => {
      fetchUnreadNotificationsCount();
    }, 30000); // 30 segundos

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, [fetchUnreadMessageNotificationsCount, fetchUnreadNotificationsCount]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        {!token ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Route exact path="/home">
              <HomeTab />
            </Route>
            <Route exact path="/messages">
              <MessagesTab />
            </Route>
            <Route path="/conversation/:otherId">
              <Conversation />
            </Route>
            <Route exact path="/report">
              <ReportTab />
            </Route>
            <Route exact path="/report-list">
              <ReportList />
            </Route>
            <Route exact path="/message-notifications">
              <MessageNotificationSection />
            </Route>
            <Route exact path="/notifications">
              <NotificationSection />
            </Route>
            <Route exact path="/reports/edit/:id">
              <EditReport />
            </Route>
          </>
        )}
      </IonRouterOutlet>

      <IonTabBar slot={location.pathname !== "/login" ? "bottom" : undefined}>
        <IonTabButton tab="home" href="/home">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        {role === AllRoles.ADMIN ? null : (
          <IonTabButton tab="messages" href="/messages">
            <IonIcon aria-hidden="true" icon={chatbubbles} />
            <IonLabel>Mensajes</IonLabel>
          </IonTabButton>
        )}
        {role === AllRoles.PATIENT ? (
          <IonTabButton tab="report" href="/report">
            <IonIcon aria-hidden="true" icon={alarm} />
            <IonLabel>Formulario</IonLabel>
          </IonTabButton>
        ) : null}
        {role === AllRoles.PATIENT ? (
          <IonTabButton tab="report-list" href="/report-list">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>Reportes</IonLabel>
          </IonTabButton>
        ) : null}
        {role === AllRoles.ADMIN ? null : (
          <IonTabButton tab="notifications" href="/message-notifications">
            <IonIcon aria-hidden="true" icon={notifications} />
            <IonLabel>Notificaciones</IonLabel>
            <IonBadge 
              color="danger" 
              style={{ display: unreadCount > 0 ? 'block' : 'none' }}
            >
              {unreadCount}
            </IonBadge>
          </IonTabButton>
        )}
        {role === AllRoles.ADMIN || role === AllRoles.PATIENT ? null : (
          <IonTabButton tab="panic-button" href="/notifications">
            <IonIcon aria-hidden="true" icon={notifications} />
            <IonLabel>Panic Button</IonLabel>
            <IonBadge 
              color="danger" 
              style={{ display: panicUnreadCount > 0 ? 'block' : 'none' }}
            >
              {panicUnreadCount}
            </IonBadge>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default App;
