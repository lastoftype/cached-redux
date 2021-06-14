import { ThunkAction } from "redux-thunk";
import * as qs from "qs";

import * as ActionTypes from "./actionTypes";
import Api from "../api";
import { Result, RootObject } from "../types";
import { IState } from "./reducer";

type TActionTypes = typeof ActionTypes;

export interface IFetchRequest {
  type: TActionTypes["FETCH_REQUEST"];
  /**
   * Stored query string
   * @example '?page=1'
   */
  queryString: string;
}

export const fetchRequest = (queryString: string) => ({
  type: ActionTypes.FETCH_REQUEST,
  queryString,
});

export interface IFetchSuccess {
  type: TActionTypes["FETCH_SUCCESS"];
  /**
   * Stored query string
   * @example '?page=1'
   */
  queryString: string;
  data: RootObject;
}

export const fetchSuccess = (queryString: string, data: Result) => ({
  type: ActionTypes.FETCH_SUCCESS,
  queryString,
  data,
});

export interface IFetchFailure {
  type: TActionTypes["FETCH_FAILURE"];
  /**
   * Stored query string
   * @example '?page=1'
   */
  queryString: string;
}

export const fetchFailure = (queryString: string) => ({
  type: ActionTypes.FETCH_FAILURE,
  queryString,
});

interface IQueryParams {
  page?: number;
}

/**
 * Async Thunk action
 */
export const fetchResults: (
  query?: IQueryParams
) => ThunkAction<void, IState, void, any> =
  (query: IQueryParams = {}) =>
  async (dispatch) => {
    // translate query to string, i.e. `page=1&offset=10`
    const queryString = qs.stringify(query);
    dispatch(fetchRequest(queryString));
    try {
      const response = await Api.getPeople(query);
      dispatch(fetchSuccess(queryString, response.data));
    } catch (e) {
      dispatch(fetchFailure(queryString));
    }
  };
