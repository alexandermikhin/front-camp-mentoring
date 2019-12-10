import React from "react";
import "./MovieDetails.css";

export default function MovieDetails(props) {
  return (
    <div className="movie-details">
      <div className="movie-image">
        <img alt="Movie" src={props.movie.imgUrl} />
      </div>
      <div className="movie-description">
        <div className="movie-description__header">
          <h1 className="movie-title">{props.movie.title}</h1>
          <div className="movie-rating">
            <span className="movie-rating__value">{props.movie.rating}</span>
          </div>
        </div>
        <div className="movie-genre">{props.movie.category}</div>
        <div className="movie-data">
          <span className="movie-data__year">{props.movie.year}</span>
          <span className="movie-data__duration">{props.movie.duration} min</span>
        </div>
        <p className="movie-annotaion">{props.movie.annotation}</p>
      </div>
    </div>
  );
}
