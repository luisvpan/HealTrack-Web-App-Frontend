import OneSignal from "react-onesignal";
import { APP_ID, API_KEY } from "../../config/constants";

export default async function runOneSignal() {
  console.log(API_KEY, APP_ID);
  await OneSignal.init({
    appId: APP_ID,
    apiKey: API_KEY,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}
