import {
  setLoading,
  setLoadingApprove,
  setSplashScreen,
  stopLoading,
  stopLoadingApprove,
  stopSplashScreen,
} from "./redux-loading/action/redux-loading.types";

export type RootAction = setLoading | stopLoading | setSplashScreen | stopSplashScreen | setLoadingApprove | stopLoadingApprove;
