import { Dispatch } from "react";
import { IAppActions } from "../../../Store";

export const setLoading = () => {
  return async (dispatch: Dispatch<IAppActions>) => {
    dispatch({
      type: "SET_LOADING",
    });
  };
};

export const stopLoading = () => {
  return async (dispatch: Dispatch<IAppActions>) => {
    dispatch({
      type: "STOP_LOADING",
    });
  };
};

export const setSplashScreen = () => {
  return async (dispatch: Dispatch<IAppActions>) => {
    dispatch({
      type: "SET_SPLASHSCREEN",
    });
  };
};

export const stopSplashScreen = () => {
  return async (dispatch: Dispatch<IAppActions>) => {
    dispatch({
      type: "STOP_SPLASHSCREEN",
    });
  };
};