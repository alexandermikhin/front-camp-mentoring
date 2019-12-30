// @flow
import type { Movie  } from '../models/movie.type';

export const APP_SEARCH = "APP_SEARCH";

export const appSearch = (phrase: string, field: string) => ({
  type: APP_SEARCH,
  payload: {
    searchPhrase: phrase,
    searchBy: field
  }
});

export const SEARCH_PHRASE_CHANGE = "SEARCH_PHRASE_CHANGE";

export const searchPhraseChange = (value: string) => ({
  type: SEARCH_PHRASE_CHANGE,
  payload: value
});

export const SEARCH_BY_CHANGE = "SEARCH_BY_CHANGE";

export const searchByChange = (value: string) => ({
  type: SEARCH_BY_CHANGE,
  payload: value
});

export const SORT_CHANGE = "SORT_CHANGE";

export const sortChange = (value: string) => ({
  type: SORT_CHANGE,
  payload: value
});

export const GET_MOVIES = "GET_MOVIES";

export const getMovies = () => ({
  type: GET_MOVIES
});

export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";

export const getMoviesSuccess = (movies: Movie[]) => ({
  type: GET_MOVIES_SUCCESS,
  payload: movies
});

export const GET_MOVIE = "GET_MOVIE";

export const getMovie = () => ({
  type: GET_MOVIES
});

export const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";

export const getMovieSuccess = (movie: Movie | null) => ({
  type: GET_MOVIE_SUCCESS,
  payload: movie
}); 
