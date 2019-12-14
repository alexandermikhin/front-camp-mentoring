import React from "react";
import "./MovieListItem.css";
import { MovieItemContext } from "../../context/MovieItemContext";

export default class MoviListItem extends React.Component {
  static contextType = MovieItemContext;
  getDetails = event => {
    this.context.openMovieDetails(this.props.movie.id);
    window.scrollTo(0, 0);
    event.preventDefault();
  };

  filterByCategory = (category, event) => {
    this.context.filterByCategory(category);
    window.scrollTo(0, 0);
    event.preventDefault();
  };

  render() {
    return (
      <div className="search-results-movies__item movie-item">
        <div className="movie-item__image">
          <img alt="Movie item" src={this.props.movie.poster_path} />
        </div>
        <div className="movie-item__details">
          <div>
            <h4 className="movie-item__title">
              <button
                className="movie-item__title-button"
                onClick={this.getDetails}
              >
                {this.props.movie.title}
              </button>
            </h4>
            <span className="movie-item__year">
              {this.getYear(this.props.movie.release_date)}
            </span>
          </div>
          <div className="movie-item__category">
            {this.props.movie.genres.map((genre, index) => (
              <React.Fragment key={genre}>
                <button onClick={this.filterByCategory.bind(this, genre)}>
                  {genre}
                </button>
                {index !== this.props.movie.genres.length - 1 && (
                  <span>, </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  getYear(date) {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear();
  }
}
