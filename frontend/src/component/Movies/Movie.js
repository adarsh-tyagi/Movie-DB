import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <Link to={`/movie/${movie.id}`} className="movie__container">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="movie_poster"
      />
      <div className="movie__info">
        <h1>{movie.original_title}</h1>
        <p>{movie.vote_average}</p>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default Movie;
