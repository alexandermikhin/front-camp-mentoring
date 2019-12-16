import { MoviesService } from "../services/movies.service";
import * as act from "./actions";

const moviesService = new MoviesService();

export function fetchMovies(params = {}) {
  return async (dispatch, getState) => {
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

export function fetchMovie(id) {
    return async (dispatch, _getState) => {
        dispatch(act.getMovie());
        const movie = await moviesService.getById(id);
        return dispatch(act.getMovieSuccess(movie));
    }
}
