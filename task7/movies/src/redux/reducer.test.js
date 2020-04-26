import * as act from "./actions";
import { initialState } from "./initial-state";
import { reducer } from "./reducer";

test("GET_MOVIE_SUCCESS should set selected movie", () => {
  const state = initialState;
  const movie = {
    id: "movie-id",
    title: "movie-title"
  };
  const expectedState = {
    ...initialState,
    selectedMovie: movie
  };

  const actualState = reducer(state, act.getMovieSuccess(movie));
  expect(actualState).toEqual(expectedState);
});

test("GET_MOVIES_SUCCESS should set found movies", () => {
  const state = initialState;
  const movies = [
    {
      id: "movie-0-id",
      title: "movie-0-title"
    },
    {
      id: "movie-1-id",
      title: "movie-1-title"
    }
  ];
  const expectedState = {
    ...initialState,
    foundMovies: movies
  };

  const actualState = reducer(state, act.getMoviesSuccess(movies));
  expect(actualState).toEqual(expectedState);
});

test("SORT_CHANGE should set sort option", () => {
  const state = initialState;
  const sort = "sort-option";
  const expectedState = {
    ...initialState,
    sortBy: sort
  };

  const actualState = reducer(state, act.sortChange(sort));
  expect(actualState).toEqual(expectedState);
});

test("SEARCH_BY_CHANGE should set searchBy option", () => {
  const state = initialState;
  const searchBy = "search-by";
  const expectedState = {
    ...initialState,
    searchBy
  };

  const actualState = reducer(state, act.searchByChange(searchBy));
  expect(actualState).toEqual(expectedState);
});
