import { ThunkAction } from 'redux-thunk'
import * as qs from 'qs'

import * as ActionTypes from './actionTypes'
import Api from '../api'

type TActionTypes = typeof ActionTypes

export interface IActions {
  [ActionTypes.FETCH_REQUEST]: {
    type: TActionTypes['FETCH_REQUEST']
    /**
     * Stored query string
     * @example '?page=1'
     */
     queryString: string
  }
  [ActionTypes.FETCH_SUCCESS]: {
    type: TActionTypes['FETCH_SUCCESS']
    /**
     * Stored query string
     * @example '?page=1'
     */
     queryString: string
     data: any
  }
  [ActionTypes.FETCH_FAILURE]: {
    type: TActionTypes['FETCH_FAILURE']
    /**
     * Stored query string
     * @example '?page=1'
     */
     queryString: string
  }
}

interface IQueryParams {
  page?: number
}

export const fetchRequest = (queryString: string) => ({
  type: ActionTypes.FETCH_REQUEST,
  queryString
})

export const fetchSuccess = (queryString: string, data: any) => ({
  type: ActionTypes.FETCH_SUCCESS,
  queryString,
  data
})

export const fetchFailure = (queryString: string) => ({
  type: ActionTypes.FETCH_FAILURE,
  queryString
})

export const fetchResults: (query?: IQueryParams) => ThunkAction<any, any, unknown, any> = (query: IQueryParams = {}) => async (dispatch, getState) => {
  const queryString = qs.stringify(query)
  dispatch(fetchRequest(queryString))
  try {
    const response = await Api.getPeople(query)
    dispatch(fetchSuccess(queryString, response.data))
  } catch (e) {
    dispatch(fetchFailure(queryString))
  }
}