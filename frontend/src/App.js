import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./component/Loader/Loader";
import { useGlobalContext } from "./context";
import Home from "./component/Movies/Home";
import Header from "./component/Header/Header";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import WatchList from "./component/Movies/WatchList";
import MovieDetails from "./component/Movies/MovieDetails";
import ProtectRoute from "./component/ProtectRoute";
import MetaData from "./component/MetaData";

function App() {
  const { loading, isAuthenticated, user } = useGlobalContext();

  return (
    <div className="container">
      <MetaData title="MovieDB | Home" />
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route
              exact
              path="/profile"
              element={<ProtectRoute component={Profile} />}
            />
            <Route exact path="/forgot/password" element={<ForgotPassword />} />
            <Route
              exact
              path="/reset/password/:token"
              element={<ResetPassword />}
            />
            <Route
              exact
              path="/watchlist"
              element={<ProtectRoute component={WatchList} />}
            />
            <Route
              exact
              path="/movie/:movieID"
              element={<ProtectRoute component={MovieDetails} />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
