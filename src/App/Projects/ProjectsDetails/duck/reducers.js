import { combineReducers } from "redux";
import * as types from "./types";

const borrowers = (state = [], action) => {
  switch (action.type) {
    case types.GET_BORROWERS_START:
      return state
    case types.GET_BORROWERS_SUCCESS:
      return action.payload
    case types.GET_BORROWERS_FAILURE:
      return action.payload
    default:
      return state;

  }
}

const funding_orgs = (state = [], action) => {
  switch (action.type) {
    case types.GET_FUNDING_ORG_START:
      return state
    case types.GET_FUNDING_ORG_SUCCESS:
      return action.payload
    case types.GET_FUNDING_ORG_FAILURE:
      return action.payload
    default:
      return state;

  }
}

const agencies = (state = [], action) => {
  switch (action.type) {
    case types.GET_AGENCIES_START:
      return state;
    case types.GET_AGENCIES_SUCCESS:
      return action.payload;
    case types.GET_AGENCIES_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const currencies = (state = [], action) => {
  switch (action.type) {
    case types.GET_CURRENCIES_START:
      return state;
    case types.GET_CURRENCIES_SUCCESS:
      return action.payload;
    case types.GET_CURRENCIES_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const project_total_cost = (state =  { data:[], total_cost:{}, error:null}, action) => {
  switch (action.type) {
    case types.CREATE_TOTAL_COST_START:
      return { ...state, posting: true };
    case types.CREATE_TOTAL_COST_SUCCESS:
      return { ...state, total_cost:action.payload }
    case types.CREATE_TOTAL_COST_FAILURE:
      return { error: action.payload.error };
    default:
      return state;
  }
};

export const projectDetails = combineReducers({
  borrowers,
  funding_orgs,
  agencies,
  currencies,
  project_total_cost
});
