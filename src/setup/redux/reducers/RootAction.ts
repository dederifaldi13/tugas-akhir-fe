import {
  setLoading,
  setSplashScreen,
  stopLoading,
  stopSplashScreen,
} from "./redux-loading/action/redux-loading.types";

export type RootAction = setLoading | stopLoading | setSplashScreen | stopSplashScreen;
