import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./App.css";
import MovieDetails from "./components/movie-details/MovieDetails";
import SearchResults from "./components/search-results/SearchResults";
import Search from "./components/search/Search";
import { MovieItemContext } from "./context/MovieItemContext";
import { Subject } from "./core/subject";
import movies from "./data/movies";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null,
      foundMovies: []
    };

    this.movieItemContextValue = {
      openMovieDetails: this.handleDetailsClick,
      filterByCategory: this.handleCategoryClick
    };

    this.searchSubject = new Subject();
  }

  componentDidMount() {
    this.movies = movies;
    this.setState({ foundMovies: this.movies });
  }

  handleSearch = (phrase, field) => {
    this.setState({ foundMovies: this._filterMovies(phrase, field) });
  };

  handleDetailsClick = id => {
    const movie = this.movies.find(m => m.id === id);
    if (movie) {
      const foundMovies = this._filterMovies(movie.category, "genre");
      this.setState({
        selectedMovie: movie,
        foundMovies
      });
    }
  };

  handleCategoryClick = category => {
    const foundMovies = this._filterMovies(category, "genre");
    this.setState({
      selectedMovie: null,
      foundMovies
    });

    this.searchSubject.setValue({ searchPhrase: category, searchBy: "genre" });
  };

  openSearch = () => {
    this.setState({
      selectedMovie: null,
      foundMovies: this.movies
    });
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header-toolbar">
            <span className="app-title">
              <span className="app-title__company">netflix</span>roulette
            </span>
            {this.state.selectedMovie && (
              <span className="app-search" onClick={this.openSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            )}
          </div>
          {this.state.selectedMovie ? (
            <MovieDetails movie={this.state.selectedMovie} />
          ) : (
            <Search onSearch={this.handleSearch} search$={this.searchSubject} />
          )}
        </header>
        <MovieItemContext.Provider value={this.movieItemContextValue}>
          <SearchResults
            toolbarOptions={this.getToolbarOptions()}
            movies={this.state.foundMovies}
            onDetailsClick={this.handleDetailsClick}
            onCategoryClick={this.handleCategoryClick}
          />
        </MovieItemContext.Provider>
        <footer className="footer">
          <span className="app-title">
            <span className="app-title__company">netflix</span>roulette
          </span>
        </footer>
      </div>
    );
  }

  getToolbarOptions() {
    return {
      showSwitcher: !this.state.selectedMovie,
      message: this._getToolbarMesage()
    };
  }

  _getToolbarMesage() {
    if (this.state.selectedMovie) {
      return `Films by ${this.state.selectedMovie.category}`;
    }

    const movieCount = this.state.foundMovies.length;
    return movieCount
      ? `${movieCount} movie${movieCount > 1 && "s"} found`
      : "";
  }

  _filterMovies(phrase, field) {
    if (!phrase) {
      return this.movies;
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

    return movies;
  }
}

export default App;
