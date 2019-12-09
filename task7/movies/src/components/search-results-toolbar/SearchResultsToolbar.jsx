import React from "react";
import Switcher from "../switcher/Switcher";
import "./SearchResultsToolbar.css";

export default class SearchResultsToolbar extends React.Component {
  handleSwitch(value) {
    this.props.onSortChange(value);
  }

  render() {
    return (
      <div className="search-results-toolbar">
        <div className="search-results-toolbar__movie-count">
          {this.props.message}
        </div>
        {this.props.showSwitcher && (
          <div className="search-results-toolbar__sort">
            <label>SORT BY</label>
            <Switcher
              prop1={{ title: "RELEASE DATE", value: "releaseDate" }}
              prop2={{ title: "RATING", value: "rating" }}
              active={this.props.activeSorting}
              onChange={this.handleSwitch.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}
