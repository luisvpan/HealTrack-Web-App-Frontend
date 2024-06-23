// onesignal.js
import OneSignal from "react-onesignal";
import { APP_ID, API_KEY } from "../../config/constants";

export async function initOneSignal() {
  try {
    OneSignal.init({
      appId: APP_ID,
      apiKey: API_KEY,
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerParam: { scope: "/push/onesignal/js/" },
      serviceWorkerPath: "/push/onesignal/OneSignalSDKWorker.js",
    });

    OneSignal.Slidedown.promptPush();
  } catch (error) {
    console.error("Error initializing OneSignal:", error);
  }
}
