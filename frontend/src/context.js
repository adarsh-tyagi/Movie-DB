import React, { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { BACKEND_URL } from "./urls.js";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  isAuthenticated: false,
  success: null,
  message: null,
  error: null,
  user: {},
  watchList: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // register action
  const registerUser = async (userdata) => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${BACKEND_URL}/register`,
        userdata,
        config
      );
      localStorage.setItem("moviedbtoken", data.token);
      // console.log("register user", data);
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "REGISTER_FAIL", payload: error.response.data });
    }
  };

  // login action
  const loginUser = async (userdata) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${BACKEND_URL}/login`,
        userdata,
        config
      );
      localStorage.setItem("moviedbtoken", data.token);
      // console.log("login", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };

  // user details action
  const getUserDetails = async () => {
    try {
      dispatch({ type: "USER_DETAILS_REQUEST" });
      const moviedbtoken = localStorage.getItem("moviedbtoken");
      const config = {
        headers: {
          Authorization: moviedbtoken,
        },
      };
      const { data } = await axios.get(`${BACKEND_URL}`, config);
      // console.log("get user details", data);
      dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "USER_DETAILS_FAIL", payload: error.response.data });
    }
  };

  // logout action
  const logoutUser = async () => {
    try {
      dispatch({ type: "LOGOUT_REQUEST" });
      const moviedbtoken = localStorage.getItem("moviedbtoken");
      const config = {
        headers: {
          Authorization: moviedbtoken,
        },
      };
      const { data } = await axios.get(`${BACKEND_URL}/logout`, config);
      localStorage.removeItem("moviedbtoken");
      // console.log("logout", data);
      dispatch({ type: "LOGOUT_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "LOGOUT_FAIL", payload: error.response.data });
    }
  };

  // delete user action
  const deleteUser = async () => {
    try {
      dispatch({ type: "DELETE_USER_REQUEST" });
      const moviedbtoken = localStorage.getItem("moviedbtoken");
      const config = {
        headers: {
          Authorization: moviedbtoken,
        },
      };
      const { data } = await axios.delete(`${BACKEND_URL}`, config);
      localStorage.removeItem("moviedbtoken");
      // console.log("delete", data);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: "DELETE_USER_FAIL",
        payload: error.response.data,
      });
    }
  };

  // forgot password action
  const forgotPasswordUser = async (email) => {
    try {
      dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${BACKEND_URL}/forgot/password`,
        email,
        config
      );
      // console.log("forgot password", data);
      dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.response.data });
    }
  };

  // reset password action
  const resetPasswordUser = async ({ token, password, confirmPassword }) => {
    try {
      dispatch({ type: "RESET_PASSWORD_REQUEST" });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${BACKEND_URL}/reset/password/${token}`,
        { password, confirmPassword },
        config
      );
      // console.log("reset password", data);
      dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.response.data });
    }
  };

  // add movie action
  const addMovie = async (userdata) => {
    try {
      dispatch({ type: "ADD_MOVIE_REQUEST" });
      const moviedbtoken = localStorage.getItem("moviedbtoken");
      const config = {
        headers: {
          Authorization: moviedbtoken,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/movie/add`,
        userdata,
        config
      );
      // console.log("add movie", data);
      dispatch({ type: "ADD_MOVIE_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "ADD_MOVIE_FAIL", payload: error.response.data });
    }
  };

  // remove movie action
  const removeMovie = async (userdata) => {
    try {
      dispatch({ type: "REMOVE_MOVIE_REQUEST" });
      const moviedbtoken = localStorage.getItem("moviedbtoken");
      const config = {
        headers: {
          Authorization: moviedbtoken,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/movie/remove`,
        userdata,
        config
      );
      // console.log("remove movie", data);
      dispatch({ type: "REMOVE_MOVIE_SUCCESS", payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "REMOVE_MOVIE_FAIL", payload: error.response.data });
    }
  };

  // clear errors
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // clear message
  const clearMessage = () => {
    dispatch({ type: "CLEAR_MESSAGE" });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        getUserDetails,
        forgotPasswordUser,
        resetPasswordUser,
        deleteUser,
        addMovie,
        removeMovie,
        clearError,
        clearMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
