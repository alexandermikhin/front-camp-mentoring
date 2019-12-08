import React from "react";
import "./App.css";
import Search from "./components/search/Search";
import SearchResults from './components/search-results/SearchResults';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header-toolbar">
            <div className="app-title">netflixroulette</div>
          </div>
          <Search />
        </header>
        <SearchResults />
        <footer className="footer">netflixroulette</footer>
      </div>
    );
  }
}

export default App;
