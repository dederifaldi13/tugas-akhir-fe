import { IAppActions } from "../../Store";

export interface DefaultLoadingI {
  loading: boolean;
  type: String;
  splashScreen: boolean;
}

const defaultState: DefaultLoadingI = {
  loading: false,
  type: "",
  splashScreen: true
};

const loadingState = (
  state: DefaultLoadingI = defaultState,
  action: IAppActions
): DefaultLoadingI => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "SET_SPLASHSCREEN":
      return {
        ...state,
        splashScreen: true
      }
    case "STOP_SPLASHSCREEN":
      return {
        ...state,
        splashScreen: false
      }
    default:
      return state;
  }
};

export default loadingState;
