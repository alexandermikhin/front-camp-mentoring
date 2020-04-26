import { render } from "@testing-library/react";
import React from "react";
import MovieList from "./MovieList";
import { BrowserRouter } from "react-router-dom";

test("Movie list should render movie list items if present", () => {
  const movies = [
    { id: "movie-0-id", genres: [] },
    { id: "movie-1-id", genres: [] }
  ];
  const { container } = render(
    <BrowserRouter>
      <MovieList movies={movies} />
    </BrowserRouter>
  );
  const movieListItems = container.querySelectorAll(
    ".search-results-movies__item"
  );
  expect(movieListItems.length).toBe(2);
});
