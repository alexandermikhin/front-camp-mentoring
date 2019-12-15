import React from "react";
import Switcher from "../switcher/Switcher";
import "./SearchResultsToolbar.css";

export default class SearchResultsToolbar extends React.Component {
  handleSwitch = value => {
    this.props.onSortChange(value);
  };

  render() {
    return (
      <div className="search-results-toolbar">
        <div className="search-results-toolbar__movie-count">
          {this.props.message}
        </div>
        {this.props.showSwitcher && (
          <div className="search-results-toolbar-sort">
            <label className="search-results-toolbar-sort__label">
              SORT BY
            </label>
            <Switcher
              prop1={{ title: "RELEASE DATE", value: "release_date" }}
              prop2={{ title: "RATING", value: "vote_average" }}
              active={this.props.activeSorting}
              onChange={this.handleSwitch}
            />
          </div>
        )}
      </div>
    );
  }
}
