import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Loader from "../Loader/Loader";
import Movie from "./Movie";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movieID } = useParams();
  const alert = useAlert();
  const { watchList, error, message, clearError, clearMessage, addMovie } =
    useGlobalContext();

  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(false);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  const clickHandler = () => {
    if (watchList.includes(movieID)) {
      return;
    }
    addMovie({ movieId: movieID });
  };

  const fetchDetails = async (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=e8dce7da46844c6b013c0e835f59da30&language=en-US`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoadingData(false);
      setMovie(data);
      //   console.log(data);
    } catch (error) {
      setLoadingData(false);
      setErrorData(true);
    }
  };

  const fetchSimilarMovies = async (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=e8dce7da46844c6b013c0e835f59da30&page=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoadingData(false);
      setSimilarMovies(data.results);
      //   console.log(data);
    } catch (error) {
      setLoadingData(false);
      setErrorData(true);
    }
  };

  useEffect(() => {
    fetchDetails(movieID);
    fetchSimilarMovies(movieID);
  }, [movieID]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }
    if (message) {
      alert.success(message);
      clearMessage();
    }
  }, [alert, message, error, clearError, clearMessage]);

  return (
    <Fragment>
      {loadingData ? (
        <Loader />
      ) : errorData ? ( 
        <h1 className="error__msg">Something went wrong! Try again</h1>
      ) : (
        <div className="movie__details">
          <div
            className="section__1"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundPosition: "center center",
            }}
          >
            {/* <img
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt="movie_poster"
            /> */}
            <div className="section__12">
              <h1>{movie?.original_title}</h1>
              <h3>{movie?.overview}</h3>
              <div className="section__121">
                <p>
                  <span>Genres: </span>
                  {movie.genres &&
                    movie?.genres.map((item) => (
                      <small key={item?.id}>{item?.name}</small>
                    ))}
                </p>
                <p>
                  <span>Release Date: </span>
                  {movie?.release_date}
                </p>
                <p>
                  <span>Runtime: </span>
                  {movie?.runtime} min.
                </p>
                <p>
                  <span>Rating: </span>
                  {movie?.vote_average}
                </p>
                <button onClick={clickHandler}>
                  {watchList.includes(movieID)
                    ? "Already added"
                    : "Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>

          <div className="section__2">
            <h1>Similar Movies</h1>
            <div>
              {similarMovies?.map((item) => (
                <Movie key={item?.id} movie={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetails;
