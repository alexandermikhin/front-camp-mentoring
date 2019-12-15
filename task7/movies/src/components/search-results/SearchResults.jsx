import React from "react";
import MovieList from "../movie-list/MovieList";
import SearchResultsToolbar from "../search-results-toolbar/SearchResultsToolbar";
import "./SearchResults.css";

export default class SearchResults extends React.Component {
  render() {
    return (
      <main className="search-results">
        <SearchResultsToolbar />
        <MovieList movies={this.props.movies} />
      </main>
    );
  }
}
