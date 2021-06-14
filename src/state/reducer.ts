import { Reducer } from "redux";
import { RootObject } from "../types";

import * as isAction from "./typeGuards";

export interface IQueryObject {
  data?: RootObject;
  loading: boolean;
}

export interface IState {
  resultsByQuery: Record<string, IQueryObject>;
}

const INITIAL_STATE: IState = {
  resultsByQuery: {},
};

export const reducer: Reducer<IState> = (
  state = INITIAL_STATE,
  action: any
) => {
  if (isAction.fetchRequest(action)) {
    const { queryString } = action || {};
    return {
      ...state,
      resultsByQuery: {
        ...state.resultsByQuery,

        /**
         * Key by query string, i.e. `page=1&offset=10`
         */
        [queryString]: {
          ...state.resultsByQuery[queryString],
          loading: true,
        },
      },
    };
  } else if (isAction.fetchSuccess(action)) {
    const { queryString, data } = action || {};
    return {
      ...state,
      resultsByQuery: {
        ...state.resultsByQuery,

        /**
         * Key by query string, i.e. `page=1&offset=10`
         */
        [queryString]: {
          data,
          loading: false,
        },
      },
    };
  } else {
    return state;
  }
};
