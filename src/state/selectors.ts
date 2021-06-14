import { createSelector, Selector } from "reselect";
import { Result } from "../types";
import { IState, IQueryObject } from "./reducer";

export const selectResultsByQuery: Selector<IState, IState["resultsByQuery"]> =
  (state) => state.resultsByQuery;

export const createSelectResult = (queryString: string) => {
  return createSelector(selectResultsByQuery, (resultsByQuery) => {
    return resultsByQuery[queryString] || {};
  });
};
