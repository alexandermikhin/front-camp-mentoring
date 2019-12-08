import React from "react";
import "./Search.css";

export default class Search extends React.Component {
  render() {
    return (
      <form className="search">
        <label className="search-label">FIND YOUR MOVIE</label>
        <div className="search-input">
          <input type="text" />
          <button type="submit" className="search-btn">
            SEARCH
          </button>
        </div>
        <div className="search-parameters">
          <label className="search-parameters__label">SEARCH BY</label>
          <div className="search-by-selector">
            <span>TITLE</span>
            <span>GENRE</span>
          </div>
        </div>
      </form>
    );
  }
}
