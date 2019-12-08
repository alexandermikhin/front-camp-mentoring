import React from "react";
import Switcher from "../switcher/Switcher";
import "./SearchResultsToolbar.css";

export default class SearchResultsToolbar extends React.Component {
  handleSwitch(value) {}

  render() {
    return (
      <div className="search-results-toolbar">
        <div className="search-results-toolbar__movie-count">
          <span className="movie-number">{this.props.found} </span>
          <span className="movie-number-text">
            movie{this.props.found > 1 && "s"} found
          </span>
        </div>
        <div className="search-results-toolbar__sort">
          <label>SORT BY</label>
          <Switcher
            prop1={{ title: "RELEASE DATE", value: "releaseDate" }}
            prop2={{ title: "RATING", value: "rating" }}
            onChange={this.handleSwitch.bind(this)}
          />
        </div>
      </div>
    );
  }
}
