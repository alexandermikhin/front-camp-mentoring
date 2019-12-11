import React from "react";
import "./MovieListItem.css";

export default class MoviListItem extends React.Component {
  getDetails = event => {
    this.props.onDetailsClick(this.props.movie.id);
    window.scrollTo(0, 0);
    event.preventDefault();
  };

  filterByCategory = event => {
    this.props.onCategoryClick(this.props.movie.category);
    window.scrollTo(0, 0);
    event.preventDefault();
  };

  render() {
    return (
      <div className="search-results-movies__item movie-item">
        <div className="movie-item__image">
          <img alt="Movie item" src={this.props.movie.imgUrl} />
        </div>
        <div className="movie-item__details">
          <div>
            <h4 className="movie-item__title">
              <button onClick={this.getDetails}>
                {this.props.movie.title}
              </button>
            </h4>
            <span className="movie-item__year">{this.props.movie.year}</span>
          </div>
          <div className="movie-item__category">
            <button onClick={this.filterByCategory}>
              {this.props.movie.category}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
