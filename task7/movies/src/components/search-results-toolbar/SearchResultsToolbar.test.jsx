import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as act from "../../redux/actions";
import { initialState } from "../../redux/initial-state";
import { reducer } from "../../redux/reducer";
import SearchResultsToolbar from "./SearchResultsToolbar";

test("Search results toolbar should display correct message for selected movie", () => {
  const expectedMessage = "Films by genre-0";
  const movie = {
    id: "movie-id",
    genres: ["genre-0", "genre-1"]
  };

  const store = createStore(reducer, initialState);

  store.dispatch(act.getMovieSuccess(movie));
  const { container } = render(
    <Provider store={store}>
      <SearchResultsToolbar />
    </Provider>
  );

  const messageContainer = container.querySelector(
    ".search-results-toolbar__movie-count"
  );

  expect(messageContainer.textContent).toBe(expectedMessage);
});

test("Search results toolbar should display correct message for found movies", () => {
  const expectedMessage = "2 movies found";
  const movies = [{ id: "movie-0-id" }, { id: "movie-1-id" }];
  const store = createStore(reducer, initialState);
  store.dispatch(act.getMoviesSuccess(movies));
  const { container } = render(
    <Provider store={store}>
      <SearchResultsToolbar />
    </Provider>
  );

  const messageContainer = container.querySelector(
    ".search-results-toolbar__movie-count"
  );

  expect(messageContainer.textContent).toBe(expectedMessage);
});
