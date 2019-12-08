import React from "react";
import "./SearchResults.css";
import SearchResultsToolbar from "../search-results-toolbar/SearchResultsToolbar";
import MovieList from '../movie-list/MovieList';

export default class SearchResults extends React.Component {
  render() {
    return (
      <main className="search-results">
        <SearchResultsToolbar />
        <MovieList />
      </main>
    );
  }
}
