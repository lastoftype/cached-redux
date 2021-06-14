import * as ActionTypes from "./actionTypes";
import * as Actions from "./actionCreators";

export const fetchRequest = (a: any): a is Actions.IFetchRequest => {
  return a.type === ActionTypes.FETCH_REQUEST;
};

export const fetchSuccess = (a: any): a is Actions.IFetchSuccess => {
  return a.type === ActionTypes.FETCH_SUCCESS;
};

export const fetchFailure = (a: any): a is Actions.IFetchFailure => {
  return a.type === ActionTypes.FETCH_FAILURE;
};
