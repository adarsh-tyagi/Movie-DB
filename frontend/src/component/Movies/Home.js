import React, { Fragment } from "react";
import { useGlobalContext } from "../../context";
import Loader from "../Loader/Loader";
import SearchMovies from "./SearchMovies";

const Home = () => {
  const { loading, isAuthenticated } = useGlobalContext();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          {!isAuthenticated ? (
            <div className="home__section">
              <img src="/images/home.svg" alt="home_poster" />
              <h1>Sign in and search for movies</h1>
            </div>
          ) : (
            <SearchMovies />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
