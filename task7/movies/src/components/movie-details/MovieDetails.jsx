import React from "react";
import { connect } from "react-redux";
import { fetchMovie } from "../../redux/fetch-movies";
import { store } from "../../redux/store";
import "./MovieDetails.css";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this._id = "";
  }

  componentDidMount() {
    this.getMovieData();
  }

  componentDidUpdate() {
    this.getMovieData();
  }

  render() {
    return (
      <div className="movie-details">
        {this.props.movie && (
          <React.Fragment>
            <div className="movie-image">
              <img
                className="movie-image__item"
                alt="Movie"
                src={this.props.movie.poster_path}
              />
            </div>
            <div className="movie-description">
              <div className="movie-description__header">
                <h1 className="movie-title">{this.props.movie.title}</h1>
                <div className="movie-rating">
                  <span className="movie-rating__value">
                    {this.props.movie.vote_average}
                  </span>
                </div>
              </div>
              <div className="movie-genre">
                {this.props.movie.genres.map((genre, index) => (
                  <React.Fragment key={genre}>
                    <span>{genre}</span>
                    {index !== this.props.movie.genres.length - 1 && (
                      <span>, </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="movie-data">
                <span className="movie-data__year">
                  {this.getYear(this.props.movie.release_date)}
                </span>
                <span className="movie-data__duration">
                  {this.props.movie.runtime} min
                </span>
              </div>
              <p className="movie-annotaion">{this.props.movie.overview}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  getMovieData() {
    const { id } = this.props;
    if (id !== this._id) {
      store
        .dispatch(fetchMovie(id))
        .then(action => this.props.movieLoaded(action));

      this._id = id;
    }
  }

  getYear(date) {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear();
  }
}

const mapStateToProps = state => ({
  movie: state.selectedMovie
});

export default connect(mapStateToProps)(MovieDetails);
