import React from "react";
import { connect } from "react-redux";
import * as act from "../../redux/actions";
import { fetchMovies } from "../../redux/fetch-movies";
import { store } from "../../redux/store";
import Switcher from "../switcher/Switcher";
import "./Search.css";

class Search extends React.Component {
  handleChange = event => {
    this.props.searchPhraseChange(event.target.value);
  };

  handleSubmit = event => {
    this.props.onSearch(this.props.searchPhrase, this.props.searchBy);
    store.dispatch(
      fetchMovies({
        search: this.props.searchPhrase,
        searchBy: this.props.searchBy
      })
    );
    event.preventDefault();
  };

  handleSwitch = value => {
    this.props.searchByChange(value);
  };

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <label className="search-label">FIND YOUR MOVIE</label>
        <div className="search-input">
          <input
            type="text"
            className="search-input__element"
            value={this.props.searchPhrase}
            onChange={this.handleChange}
          />
          <button type="submit" className="search-input__button">
            SEARCH
          </button>
        </div>
        <div className="search-parameters">
          <label className="search-parameters__label">SEARCH BY</label>
          <Switcher
            prop1={{ title: "TITLE", value: "title" }}
            prop2={{ title: "GENRE", value: "genres" }}
            active={this.props.searchBy}
            onChange={this.handleSwitch}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  searchPhrase: state.searchPhrase,
  searchBy: state.searchBy
});

const mapDispatchToProps = dispatch => ({
  onSearch: (phrase, genre) => dispatch(act.appSearch(phrase, genre)),
  searchPhraseChange: phrase => dispatch(act.searchPhraseChange(phrase)),
  searchByChange: genre => dispatch(act.searchByChange(genre))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
