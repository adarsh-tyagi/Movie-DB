import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import Movie from "./Movie";
import "./WatchList.css";

const WatchList = () => {
  const { watchList, error, message, clearError, clearMessage, removeMovie } =
    useGlobalContext();
  const alert = useAlert();

  const [movieList, setMovieList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const clickHandler = (movieID) => {
    removeMovie({ movieId: movieID });
  };

  const fetchWatchList = async (watchList) => {
    try {
      for (let i = 0; i < watchList.length; i++) {
        const movieId = watchList[i];
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieList((prevState) => [...prevState, data]);
      }
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    fetchWatchList(watchList);
  }, [watchList]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }
    if (message) {
      alert.success(message);
      clearMessage();
    }
  }, [alert, error, message, clearError, clearMessage]);

  return (
    <Fragment>
      <MetaData title="MovieDB | WatchList" />
      {loadingData ? (
        <Loader />
      ) : loadingError ? (
        <h1 className="error__msg">Something went wrong! Try again</h1>
      ) : (
        <div className="watchlist">
          <h1>Your Watchlist</h1>
          <div className="watchlist__movies">
            {movieList.length === 0 ? (
              <h1 className="error__msg">Nothing to show</h1>
            ) : (
              ""
            )}
            {movieList.map((movie) => (
              <div key={movie.id}>
                <Movie movie={movie} />
                <button onClick={() => clickHandler(movie.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WatchList;
