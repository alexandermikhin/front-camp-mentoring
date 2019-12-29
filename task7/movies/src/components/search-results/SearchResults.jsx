import React from "react";
import MovieList from "../movie-list/MovieList";
import SearchResultsToolbar from "../search-results-toolbar/SearchResultsToolbar";
import "./SearchResults.css";

type Props = {
  movies: any[]
}

export default class SearchResults extends React.Component<Props> {
  render() {
    return (
      <main className="search-results">
        <SearchResultsToolbar />
        <MovieList movies={this.props.movies} />
      </main>
    );
  }
}
