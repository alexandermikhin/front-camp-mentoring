import { APP_SEARCH, SEARCH_BY_CHANGE, SEARCH_PHRASE_CHANGE } from "./actions";
import { initialStore } from "./initial-store";

export function reducer(store = initialStore, action) {
  switch (action.type) {
    case APP_SEARCH:
      return {
        ...store,
        searchBy: "title",
        searchPhrase: action.payload.searchPhrase
      };
    case SEARCH_PHRASE_CHANGE:
      return {
        ...store,
        searchPhrase: action.payload
      };
    case SEARCH_BY_CHANGE:
      return {
        ...store,
        searchBy: action.payload
      };

    default:
      return store;
  }
}
