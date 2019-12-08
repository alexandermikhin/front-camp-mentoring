import React from "react";
import "./App.css";
import Search from "./components/search/Search";
import SearchResults from "./components/search-results/SearchResults";
import movies from "./data/movies";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundMovies: []
    };
  }

  componentDidMount() {
    this.movies = movies;
    this.setState({ foundMovies: this.movies });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header-toolbar">
            <div className="app-title">netflixroulette</div>
          </div>
          <Search />
        </header>
        <SearchResults movies={this.state.foundMovies} />
        <footer className="footer">netflixroulette</footer>
      </div>
    );
  }
}

export default App;
