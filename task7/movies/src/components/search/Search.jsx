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
    alert(
      `Search phrase: "${this.state.searchPhrase}", genre: "${this.state.searchBy}".`
    );
    event.preventDefault();
  }

  handleSwitch(value) {
    debugger;
    this.setState({ searchBy: value });
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit.bind(this)}>
        <label className="search-label">FIND YOUR MOVIE</label>
        <div className="search-input">
          <input
            type="text"
            value={this.state.searchPhrase}
            onChange={this.handleChange.bind(this)}
          />
          <button type="submit" className="search-btn">
            SEARCH
          </button>
        </div>
        <div className="search-parameters">
          <label className="search-parameters__label">SEARCH BY</label>
          <Switcher
            prop1={{ title: "TITLE", value: "title" }}
            prop2={{ title: "GENRE", value: "genre" }}
            onChange={this.handleSwitch.bind(this)}
          />
        </div>
      </form>
    );
  }
}
