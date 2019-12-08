import React from "react";
import "./MovieList.css";
import MovieListItem from "../movie-list-item/MovieListItem";

export default class MovieList extends React.Component {
  render() {
    return (
      <div className="search-results-movies">
        {this.props.movies.map(movie => (
          <MovieListItem />
        ))}
      </div>
    );
  }
}
