import * as ActionTypes from './actionTypes'
import * as ActionCreators from './actionCreators'

export const fetchRequest = (action: any): action is ActionCreators.IActions['FETCH_REQUEST'] => {
  return action.type === ActionTypes.FETCH_REQUEST
}

export const fetchSuccess = (action: any): action is ActionCreators.IActions['FETCH_SUCCESS'] => {
  return action.type === ActionTypes.FETCH_SUCCESS
}

export const fetchFailure = (action: any): action is ActionCreators.IActions['FETCH_FAILURE'] => {
  return action.type === ActionTypes.FETCH_FAILURE
}