// @flow
import * as act from "./actions";
import { initialState } from "./initial-state";
import type { State } from "../models/state.type";

export function reducer(
  state: State = initialState,
  action: { type: string, payload: any }
) {
  switch (action.type) {
    case act.APP_SEARCH:
      return {
        ...state,
        searchBy: action.payload.searchBy,
        searchPhrase: action.payload.searchPhrase
      };
    case act.SEARCH_PHRASE_CHANGE:
      return {
        ...state,
        searchPhrase: action.payload
      };
    case act.SEARCH_BY_CHANGE:
      return {
        ...state,
        searchBy: action.payload
      };
    case act.SORT_CHANGE:
      return {
        ...state,
        sortBy: action.payload
      };

    case act.GET_MOVIES_SUCCESS:
      return {
        ...state,
        foundMovies: action.payload
      };
    case act.GET_MOVIE_SUCCESS:
      return {
        ...state,
        selectedMovie: action.payload
      };

    default:
      return state;
  }
}
