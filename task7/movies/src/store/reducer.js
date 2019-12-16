import * as act from "./actions";
import { initialStore } from "./initial-store";

export function reducer(store = initialStore, action) {
  switch (action.type) {
    case act.APP_SEARCH:
      return {
        ...store,
        searchBy: action.payload.searchBy,
        searchPhrase: action.payload.searchPhrase
      };
    case act.SEARCH_PHRASE_CHANGE:
      return {
        ...store,
        searchPhrase: action.payload
      };
    case act.SEARCH_BY_CHANGE:
      return {
        ...store,
        searchBy: action.payload
      };
    case act.SORT_CHANGE:
      return {
        ...store,
        sortBy: action.payload
      };

    case act.GET_MOVIES_SUCCESS:
      return {
        ...store,
        foundMovies: action.payload
      };
    case act.GET_MOVIE_SUCCESS:
      return {
        ...store,
        selectedMovie: action.payload
      };

    default:
      return store;
  }
}
