import React from "react";
import "./MovieDetails.css";

export default function MovieDetails(props) {
    return (
      <div className="movie-details">
        <div className="movie-image">
          <img alt="Movie" src={props.movie.imageUrl} />
        </div>
        <div className="movie-description">
          <div className="movie-description__header">
            <h1 className="movie-title">{props.movie.title}</h1>
            <span className="movie-rating">{props.movie.rating}</span>
          </div>
          <div className="movie-genre">{props.movie.category}</div>
          <div className="movie-data">
            <span className="movie-data__year">{props.movie.year}</span>
            <span className="movie-data__year-phase">year</span>
            <span className="movie-data__duration">
              {props.movie.duration}
            </span>
            <span className="movie-data__duration-phase">min</span>
          </div>
          <p className="movie-annotaion">{props.movie.annotation}</p>
        </div>
      </div>
    );
}
