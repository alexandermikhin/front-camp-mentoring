import React from "react";
import MovieList from "../movie-list/MovieList";
import SearchResultsToolbar from "../search-results-toolbar/SearchResultsToolbar";
import "./SearchResults.css";

export default class SearchResults extends React.Component {
  render() {
    return (
      <main className="search-results">
        <SearchResultsToolbar
          message={this.props.toolbarOptions.message}
          showSwitcher={this.props.toolbarOptions.showSwitcher}
          activeSorting={this.props.sortBy}
          onSortChange={this.props.onSortChange}
        />
        <MovieList movies={this.props.movies} />
      </main>
    );
  }
}
