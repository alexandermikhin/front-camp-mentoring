// @flow
import { MoviesService } from "../services/movies.service";
import * as act from "./actions";

const moviesService = new MoviesService();

export function fetchMovies(params: { [key: string]: string } = {}) {
  return async (dispatch: Function, getState: Function) => {
    dispatch(act.getMovies());
    const state = getState();
    const queryParams = {};
    queryParams.search = params.search || state.searchPhrase;
    if (queryParams.search) {
      queryParams.searchBy = params.searchBy || state.searchBy;
    }

    queryParams.sortBy = params.sortBy || state.sortBy;
    queryParams.sortOrder = "desc";
    const foundMovies = await moviesService.getMovies(queryParams);
    dispatch(act.getMoviesSuccess(foundMovies));
  };
}

export function fetchMovie(id: string) {
  return async (dispatch: Function, _getState: Function) => {
    dispatch(act.getMovie());
    const movie = await moviesService.getById(id);
    return dispatch(act.getMovieSuccess(movie));
  }
}
