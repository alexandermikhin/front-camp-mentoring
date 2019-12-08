import React from "react";
import "./App.css";
import Search from "./components/Seach";

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
        <main className="search-results">
          <div className="search-results-toolbar">
            <div className="search-results-toolbar__movie-count">
              <span className="movie-number">7</span>
              <span className="movie-number-text">movie found</span>
            </div>
            <div className="search-results-toolbar__sort">
              <span>RELEASE DATE</span>
              <span>RATING</span>
            </div>
          </div>
          <div className="search-results-movies">
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
            <div className="search-results-movies__item movie-item">
              <div className="movie-item__image">
                <img alt="Movie item" />
              </div>
              <div className="movie-item__details">
                <div>
                  <h4 className="movie-item__title">Pulp fiction</h4>
                  <span className="movie-item__year">1994</span>
                </div>
                <div className="movie-item__category">Oscar winning Movie</div>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">netflixroulette</footer>
      </div>
    );
  }
}

export default App;
