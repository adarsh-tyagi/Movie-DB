import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";

const Profile = () => {
  const {
    loading,
    isAuthenticated,
    user,
    error,
    clearError,
    logoutUser,
    deleteUser,
    message,
    clearMessage
  } = useGlobalContext();
  const alert = useAlert();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    navigate("/");
  };

  const deleteHandler = () => {
    deleteUser();
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (message) {
      alert.success(message);
      clearMessage()
    }
  }, [isAuthenticated, navigate, error, alert, clearError, message, clearMessage]);

  return (
    <Fragment>
      <MetaData title="MovieDB | Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="profile__container">
          <div className="container__one">
            <h1>Profile</h1>
            <img
              src={
                user.gender === "male"
                  ? "/images/male.svg"
                  : "/images/female.svg"
              }
              alt={user.name}
            />
          </div>
          <div className="container__two">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{"Joined on " + user.createdAt.substring(0, 10)}</p>
            <Link to="/watchlist">WatchList</Link>
            <button onClick={logoutHandler}>Logout</button>
            <button className="delete" onClick={deleteHandler}>
              Delete Account
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
