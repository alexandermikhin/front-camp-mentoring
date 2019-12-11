import React from "react";
import MovieList from "../movie-list/MovieList";
import SearchResultsToolbar from "../search-results-toolbar/SearchResultsToolbar";
import "./SearchResults.css";

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: "rating"
    };
  }

  handleSortChange = value => {
    this.setState({ sorting: value });
  };

  render() {
    return (
      <main className="search-results">
        <SearchResultsToolbar
          message={this.props.toolbarOptions.message}
          showSwitcher={this.props.toolbarOptions.showSwitcher}
          activeSorting={this.state.sorting}
          onSortChange={this.handleSortChange}
        />
        <MovieList
          movies={this.getMovies()}
          onDetailsClick={this.props.onDetailsClick}
          onCategoryClick={this.props.onCategoryClick}
        />
      </main>
    );
  }

  getMovies() {
    const sortedMovies = [...this.props.movies];
    switch (this.state.sorting) {
      case "releaseDate":
        sortedMovies.sort(this.sortByReleaseDate);
        break;
      case "rating":
        sortedMovies.sort(this.sortByRating);
        break;
      default:
        break;
    }

    return sortedMovies;
  }

  sortByReleaseDate = (movie1, movie2) => {
    return movie2.year - movie1.year;
  };

  sortByRating = (movie1, movie2) => {
    return movie2.rating - movie1.rating;
  };
}
