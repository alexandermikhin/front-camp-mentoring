import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import "./App.css";
import MovieDetails from "./components/movie-details/MovieDetails";
import SearchResults from "./components/search-results/SearchResults";
import Search from "./components/search/Search";
import { MovieItemContext } from "./context/MovieItemContext";
import { Subject } from "./core/subject";
import { MoviesService } from "./services/movies.service";
import { fetchMovies } from "./store/fetch-movies";
import { store } from "./store/store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null,
      foundMovies: [],
      sortBy: this.props.sortBy,
      searchBy: this.props.searchBy,
      searchPhrase: this.props.searchPhrase
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

  openSearch = () => {
    store.dispatch(fetchMovies());
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
            <Search search$={this.searchSubject} />
          )}
        </header>
        <MovieItemContext.Provider value={this.movieItemContextValue}>
          <SearchResults
            movies={this.props.foundMovies}
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

  async _filterMovies() {
    const state = this.props.getState();
    const queryParams = {};
    queryParams.search = state.searchPhrase;
    if (queryParams.search) {
      queryParams.searchBy = state.searchBy;
    }

    queryParams.sortBy = state.sortBy;
    queryParams.sortOrder = "desc";
    const foundMovies = await this.moviesService.getMovies(queryParams);
    this.props.onSearchComplete(foundMovies);
  }
}

const mapStateToProps = state => ({
  searchBy: state.searchBy,
  searchPhrase: state.searchPhrase,
  foundMovies: state.foundMovies
});

export default connect(mapStateToProps)(App);
