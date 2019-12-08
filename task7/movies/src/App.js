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

  handleSearch(phrase, field) {
    if (!phrase) {
      this.setState({ foundMovies: this.movies });
      return;
    }

    let movies;
    switch (field) {
      case "title":
        movies = this.movies.filter(m => m.title.includes(phrase));
        break;
      case "genre":
        movies = this.movies.filter(m => m.category.includes(phrase));
        break;
      default:
        movies = this.movies;
    }

    this.setState({ foundMovies: movies });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header-toolbar">
            <div className="app-title">netflixroulette</div>
          </div>
          <Search onSearch={this.handleSearch.bind(this)} />
        </header>
        <SearchResults movies={this.state.foundMovies} />
        <footer className="footer">netflixroulette</footer>
      </div>
    );
  }
}

export default App;
