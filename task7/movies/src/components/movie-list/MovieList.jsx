import React from "react";
import MovieListItem from "../movie-list-item/MovieListItem";
import "./MovieList.css";

export default class MovieList extends React.Component {
  render() {
    return (
      <div className="search-results-movies">
        {this.props.movies.length > 0 ? (
          this.props.movies.map(movie => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onDetailsClick={this.props.onDetailsClick.bind(this)}
              onCategoryClick={this.props.onCategoryClick.bind(this)}
            />
          ))
        ) : (
          <div className="no-results">No movies found.</div>
        )}
      </div>
    );
  }
}
