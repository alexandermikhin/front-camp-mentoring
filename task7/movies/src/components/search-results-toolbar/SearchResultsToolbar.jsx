import React from "react";
import { connect } from "react-redux";
import * as act from "../../redux/actions";
import { fetchMovies } from "../../redux/fetch-movies";
import { store } from "../../redux/store";
import Switcher from "../switcher/Switcher";
import "./SearchResultsToolbar.css";

class SearchResultsToolbar extends React.Component {
  handleSwitch = value => {
    this.props.onSortChange(value);
    store.dispatch(fetchMovies({ sortBy: value }));
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

function getToolbarMesage(state) {
  if (state.selectedMovie) {
    return `Films by ${state.selectedMovie.genres[0]}`;
  }

  const movieCount = state.foundMovies.length;
  return movieCount ? `${movieCount} movie${movieCount > 1 && "s"} found` : "";
}

const mapStateToProps = state => ({
  message: getToolbarMesage(state),
  showSwitcher: !state.selectedMovie,
  activeSorting: state.sortBy
});

const mapDispatchToProps = dispatch => ({
  onSortChange: value => dispatch(act.sortChange(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsToolbar);
