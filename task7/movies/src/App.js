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
      foundMovies: [],
      sortBy: "vote_average",
      searchBy: "title",
      searchPhrase: ""
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
    const foundMovies = await this._filterMovies({
      search: phrase,
      searchBy: field
    });

    this.setState({ foundMovies, searchBy: field, searchPhrase: phrase });
  };

  handleDetailsClick = async id => {
    const movie = await this.moviesService.getById(id);
    if (movie) {
      const foundMovies = await this._filterMovies({
        search: movie.genres[0],
        searchBy: "genres"
      });

      this.setState({
        selectedMovie: movie,
        foundMovies
      });
    }
  };

  handleCategoryClick = async category => {
    const foundMovies = await this._filterMovies({
      search: category,
      searchBy: "genres"
    });
    this.setState({
      selectedMovie: null,
      foundMovies,
      searchPhrase: category,
      searchBy: "genres"
    });

    this.searchSubject.setValue({ searchPhrase: category, searchBy: "genres" });
  };

  handleSortChange = async sorting => {
    const foundMovies = await this._filterMovies({ sortBy: sorting });

    this.setState({
      foundMovies,
      sortBy: sorting
    });
  };

  openSearch = async () => {
    const foundMovies = await this._filterMovies();
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
            sortBy={this.state.sortBy}
            onSortChange={this.handleSortChange}
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
      return `Films by ${this.state.selectedMovie.genres[0]}`;
    }

    const movieCount = this.state.foundMovies.length;
    return movieCount
      ? `${movieCount} movie${movieCount > 1 && "s"} found`
      : "";
  }

  async _filterMovies(params = {}) {
    const queryParams = {};
    queryParams.search = params.search || this.state.searchPhrase;
    if (queryParams.search) {
      queryParams.searchBy = params.searchBy || this.state.searchBy;
    }

    queryParams.sortBy = params.sortBy || this.state.sortBy;
    queryParams.sortOrder = "desc";

    return await this.moviesService.getMovies(queryParams);
  }
}

export default App;
