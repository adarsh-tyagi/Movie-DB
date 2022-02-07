import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movie = ({ movie }) => {
  const [show, setShow] = React.useState(false);
  // console.log(movie);
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie__box"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img
        src={
          movie.backdrop_path === null
            ? url
            : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        }
        alt="movie_poster"
        className={movie.backdrop_path === null ? "null__image" : ""}
      />
      {show && (
        <div className="movie__info">
          <h1>{movie.original_title}</h1>
          <p>{movie.vote_average}</p>
          <p>{movie.release_date}</p>
        </div>
      )}
    </Link>
  );
};

export default Movie;
