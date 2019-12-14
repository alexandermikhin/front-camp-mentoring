import React from "react";
import "./MovieDetails.css";

export default class MovieDetails extends React.Component {
  render() {
    return (
      <div className="movie-details">
        <div className="movie-image">
          <img className="movie-image__item" alt="Movie" src={this.props.movie.poster_path} />
        </div>
        <div className="movie-description">
          <div className="movie-description__header">
            <h1 className="movie-title">{this.props.movie.title}</h1>
            <div className="movie-rating">
              <span className="movie-rating__value">
                {this.props.movie.vote_average}
              </span>
            </div>
          </div>
          <div className="movie-genre">
            {this.props.movie.genres.map((genre, index) => (
              <React.Fragment key={genre}>
                <span>{genre}</span>
                {index !== this.props.movie.genres.length - 1 && (
                  <span>, </span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="movie-data">
            <span className="movie-data__year">{this.getYear(this.props.movie.release_date)}</span>
            <span className="movie-data__duration">
              {this.props.movie.runtime} min
            </span>
          </div>
          <p className="movie-annotaion">{this.props.movie.overview}</p>
        </div>
      </div>
    );
  }

  getYear(date) {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear();
  }
}
