// onesignal.js
import OneSignal from "react-onesignal";
import { APP_ID, API_KEY } from "../../config/constants";

let oneSignalInstance: any;

export async function initOneSignal() {
  console.log("Initializing OneSignal...");
  try {
    oneSignalInstance = await OneSignal.init({
      appId: APP_ID,
      apiKey: API_KEY,
      allowLocalhostAsSecureOrigin: true,
    });
    console.log("OneSignal initialized:", oneSignalInstance);
    OneSignal.Slidedown.promptPush();
    return oneSignalInstance;
  } catch (error) {
    console.error("Error initializing OneSignal:", error);
  }
}

export async function getOneSignalInstance() {
  return oneSignalInstance;
}
