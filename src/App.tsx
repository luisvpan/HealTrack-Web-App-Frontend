import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { alarm, chatbubbles, home } from "ionicons/icons";
import HomeTab from "./pages/home";
import MessagesTab from "./pages/messages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";
import "react-toastify/dist/ReactToastify.css";
/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/auth/Login";
import Conversation from "./pages/conversation";
import ReportTab from "./pages/report";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

setupIonicReact();

const App: React.FC = () => {
  const token = store.getState().auth.token;
  console.log(token);

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          {token ? <AppContent /> : <LoginContent />}
          <ToastContainer />
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

const LoginContent: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const role = store.getState().auth.user?.role;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <HomeTab />
        </Route>
        <Route exact path="/messages">
          <MessagesTab />
        </Route>
        <Route path="/conversation/:otherId">
          <Conversation />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
        <Route exact path="/report">
          <ReportTab />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot={location.pathname !== "/login" ? "bottom" : undefined}>
        <IonTabButton tab="home" href="/home">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="messages" href="/messages">
          <IonIcon aria-hidden="true" icon={chatbubbles} />
          <IonLabel>Mensajes</IonLabel>
        </IonTabButton>
        {role !== "patient" ? null : (
          <IonTabButton tab="report" href="/report">
            <IonIcon aria-hidden="true" icon={alarm} />
            <IonLabel>Reporte</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default App;
