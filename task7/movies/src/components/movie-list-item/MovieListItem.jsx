import React from "react";
import "./MovieListItem.css";

export default class MoviListItem extends React.Component {
  render() {
    return (
      <div className="search-results-movies__item movie-item">
        <div className="movie-item__image">
          <img alt="Movie item" />
        </div>
        <div className="movie-item__details">
          <div>
            <h4 className="movie-item__title">Pulp fiction</h4>
            <span className="movie-item__year">1994</span>
          </div>
          <div className="movie-item__category">Oscar winning Movie</div>
        </div>
      </div>
    );
  }
}
