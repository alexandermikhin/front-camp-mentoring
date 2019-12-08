import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-toolbar">
          <div className="app-title">netflixroulette</div>
        </div>
        <div className="search">
          <label className="search-label">FIND YOUR MOVIE</label>
          <div className="search-input">
            <input type="text" />
            <button className="search-btn">SEARCH</button>
          </div>
          <div className="search-parameters">
            <label className="search-parameters__label">SEARCH BY</label>
            <div className="search-by-selector">
              <span>TITLE</span>
              <span>GENRE</span>
            </div>
          </div>
        </div>
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

export default App;
