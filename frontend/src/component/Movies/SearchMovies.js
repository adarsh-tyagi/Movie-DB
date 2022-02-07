import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./SearchMovies.css";

var url =
  "https://api.themoviedb.org/3/movie/popular?api_key=e8dce7da46844c6b013c0e835f59da30";

const SearchMovies = () => {
  const [name, setName] = useState(""); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      //   console.log(data.results);
      setLoading(false);
      setMovies(data.results);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(url);
  }, []);

  useEffect(() => {
    if (name) {
      var url = `https://api.themoviedb.org/3/search/movie?api_key=e8dce7da46844c6b013c0e835f59da30&language=en-US&query=${name}&page=1&include_adult=false`;
      fetchMovies(url);
    //   console.log(movies);
    }
  }, [name]);
  return (
    <div className="movie__container">
      <input
        value={name}
        placeholder="Search"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="movie__list">
        {error ? (
          <h1 className="error__msg">Something went wrong. Try again</h1>
        ) : loading ? (
          <h1 className="loading__msg">Loading...</h1>
        ) : (
          movies.map((movie) => <Movie key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
