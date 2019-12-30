// @flow
import type { State } from "../models/state.type";

export const initialState: State = {
  selectedMovie: null,
  foundMovies: [],
  sortBy: "vote_average",
  searchBy: "title",
  searchPhrase: ""
};
