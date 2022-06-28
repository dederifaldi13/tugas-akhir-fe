import { Action } from "redux";
import { DataType, POST_SUCCESS } from "./actions/PostActionTypes";

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  post?: Array<DataType>;
}

const defaultState: DefaultStateI = {
  post: []
};

const postReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case POST_SUCCESS:
      return {
        post: action.payload?.post,
      };
    default:
      return state;
  }
};

export default postReducer;
