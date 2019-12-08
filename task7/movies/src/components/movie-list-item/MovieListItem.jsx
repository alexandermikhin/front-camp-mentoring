import React from "react";
import "./MovieListItem.css";

export default class MoviListItem extends React.Component {
  render() {
    return (
      <div className="search-results-movies__item movie-item">
        <div className="movie-item__image">
          <img alt="Movie item" src={this.props.movie.imgUrl}/>
        </div>
        <div className="movie-item__details">
          <div>
            <h4 className="movie-item__title">{this.props.movie.title}</h4>
            <span className="movie-item__year">{this.props.movie.year}</span>
          </div>
          <div className="movie-item__category">{this.props.movie.category}</div>
        </div>
      </div>
    );
  }
}
