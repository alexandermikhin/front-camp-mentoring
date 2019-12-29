// @flow
import React from "react";
import MovieListItem from "../movie-list-item/MovieListItem";
import "./MovieList.css";

type Props = {
  movies: Array<any>
}

export default class MovieList extends React.Component<Props> {
  render() {
    return (
      <div className="search-results-movies">
        {this.props.movies.length > 0 ? (
          this.props.movies.map(movie => (
            <MovieListItem key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="no-results">No movies found</div>
        )}
      </div>
    );
  }
}
