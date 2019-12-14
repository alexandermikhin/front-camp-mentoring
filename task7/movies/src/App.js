import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./App.css";
import MovieDetails from "./components/movie-details/MovieDetails";
import SearchResults from "./components/search-results/SearchResults";
import Search from "./components/search/Search";
import { MovieItemContext } from "./context/MovieItemContext";
import { Subject } from "./core/subject";
import { MoviesService } from "./services/movies.service";

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
    this.moviesService = new MoviesService();
  }

  componentDidMount() {
    this.openSearch();
  }

  handleSearch = async (phrase, field) => {
    this.setState({ foundMovies: await this._filterMovies(phrase, field) });
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

  handleCategoryClick = async category => {
    const foundMovies = await this._filterMovies(category, "genre");
    this.setState({
      selectedMovie: null,
      foundMovies
    });

    this.searchSubject.setValue({ searchPhrase: category, searchBy: "genre" });
  };

  openSearch = async () => {
    const foundMovies = await this.moviesService.getMovies();
    this.setState({ selectedMovie: null, foundMovies });
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

  async _filterMovies(phrase, field) {
    if (!phrase) {
      return await this.moviesService.getMovies();
    }

    const params = {};
    params.search = phrase;
    switch (field) {
      case "title":
        params.searchBy = "title";
        break;
      case "genre":
        params.searchBy = "genres";
        break;
      default:
        params.searchBy = "title";
        break;
    }

    return await this.moviesService.getMovies(params);
  }
}

export default App;
