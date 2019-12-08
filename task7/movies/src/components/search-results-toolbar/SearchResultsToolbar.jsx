import React from "react";
import "./SearchResultsToolbar.css";

export default class SearchResultsToolbar extends React.Component {
  render() {
    return (
      <div className="search-results-toolbar">
        <div className="search-results-toolbar__movie-count">
          <span className="movie-number">7</span>
          <span className="movie-number-text">movie found</span>
        </div>
        <div className="search-results-toolbar__sort">
          <span>RELEASE DATE</span>
          <span>RATING</span>
        </div>
      </div>
    );
  }
}
