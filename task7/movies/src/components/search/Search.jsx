import React from "react";
import "./Search.css";
import Switcher from "../switcher/Switcher";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPhrase: "",
      searchBy: "title"
    };
  }

  handleChange(event) {
    this.setState({ searchPhrase: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSearch(this.state.searchPhrase, this.state.searchBy);
    event.preventDefault();
  }

  handleSwitch(value) {
    this.setState({ searchBy: value });
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit.bind(this)}>
        <label className="search-label">FIND YOUR MOVIE</label>
        <div className="search-input">
          <input
            type="text"
            className="search-input__element"
            value={this.state.searchPhrase}
            onChange={this.handleChange.bind(this)}
          />
          <button type="submit" className="search-input__button">
            SEARCH
          </button>
        </div>
        <div className="search-parameters">
          <label className="search-parameters__label">SEARCH BY</label>
          <Switcher
            prop1={{ title: "TITLE", value: "title" }}
            prop2={{ title: "GENRE", value: "genre" }}
            active={this.state.searchBy}
            onChange={this.handleSwitch.bind(this)}
          />
        </div>
      </form>
    );
  }
}
