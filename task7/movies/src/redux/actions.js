export const APP_SEARCH = "APP_SEARCH";

export const appSearch = (phrase, field) => ({
  type: APP_SEARCH,
  payload: {
    searchPhrase: phrase,
    searchBy: field
  }
});

export const SEARCH_PHRASE_CHANGE = "SEARCH_PHRASE_CHANGE";

export const searchPhraseChange = value => ({
  type: SEARCH_PHRASE_CHANGE,
  payload: value
});

export const SEARCH_BY_CHANGE = "SEARCH_BY_CHANGE";

export const searchByChange = value => ({
  type: SEARCH_BY_CHANGE,
  payload: value
});

export const SORT_CHANGE = "SORT_CHANGE";

export const sortChange = value => ({
  type: SORT_CHANGE,
  payload: value
});

export const GET_MOVIES = "GET_MOVIES";

export const getMovies = () => ({
  type: GET_MOVIES
});

export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";

export const getMoviesSuccess = movies => ({
  type: GET_MOVIES_SUCCESS,
  payload: movies
});

export const GET_MOVIE = "GET_MOVIE";

export const getMovie = () => ({
  type: GET_MOVIES
});

export const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";

export const getMovieSuccess = movie => ({
  type: GET_MOVIE_SUCCESS,
  payload: movie
}); 
