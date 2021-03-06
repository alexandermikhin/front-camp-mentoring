// @flow
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import MovieDetails from "./components/movie-details/MovieDetails";
import SearchResults from "./components/search-results/SearchResults";
import Search from "./components/search/Search";
import { MovieItemContext } from "./context/MovieItemContext";
import * as act from "./redux/actions";
import { fetchMovies } from "./redux/fetch-movies";
import { store } from "./redux/store";
import type { Movie } from "./models/movie.type";

type Props = {
  handleCategoryClick(category: string): Promise<void>,
  handleInitialLoad(): void,
  selectedMovie: Movie,
  match: any,
  foundMovies: Movie[]
};

class App extends React.Component<Props> {
  movieItemContextValue = {
    filterByCategory: this.handleCategoryClick
  };

  componentDidMount() {
    this.openSearch();
  }

  handleMovieLoad = action => {
    const movie = action.payload;
    store.dispatch(
      fetchMovies({ search: movie.genres[0], searchBy: "genres" })
    );
  };

  handleCategoryClick = async (category: string) => {
    this.props.handleCategoryClick(category);
    store.dispatch(fetchMovies({ search: category, searchBy: "genres" }));
  };

  openSearch = () => {
    this.props.handleInitialLoad();
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
            {this.props.selectedMovie && (
              <Link className="app-search" to="/" onClick={this.openSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            )}
          </div>
          <Switch>
            <Route
              path="/film/:id"
              children={
                <MovieDetails
                  id={this.props.match.params.id}
                  movieLoaded={this.handleMovieLoad}
                />
              }
            />
            <Route
              path="/search/:query"
              children={<Search query={this.props.match.params.query} />}
            />
            <Route component={Search} />
          </Switch>
        </header>
        <MovieItemContext.Provider value={this.movieItemContextValue}>
          <SearchResults
            movies={this.props.foundMovies}
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
}

const mapStateToProps = state => ({
  searchBy: state.searchBy,
  searchPhrase: state.searchPhrase,
  foundMovies: state.foundMovies,
  selectedMovie: state.selectedMovie
});

const mapDispatchToProps = dispatch => ({
  handleCategoryClick: (category: string) => {
    dispatch(act.searchByChange("genres"));
    dispatch(act.searchPhraseChange(category));
    dispatch(act.getMovieSuccess(null));
  },

  handleInitialLoad: () => {
    dispatch(act.getMovieSuccess(null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
