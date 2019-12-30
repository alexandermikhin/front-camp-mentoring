// @flow
import type { Movie } from "./movie.type";

export type State = {
  selectedMovie: Movie | null,
  foundMovies: Movie[],
  sortBy: string,
  searchBy: string,
  searchPhrase: string
};
