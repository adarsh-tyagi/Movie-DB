const reducer = (state, action) => {
  switch (action.type) {
    // register, login and user details
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "USER_DETAILS_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "USER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        watchList: action.payload.user.watchList,
      };

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "USER_DETAILS_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload.message,
        user: null,
        watchList: [],
      };

    // logout user
    case "LOGOUT_REQUEST":
      return {
        loading: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        watchList: [],
        message: action.payload.message,
      };
    case "LOGOUT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    // delete user
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.payload.message,
        success: action.payload.success,
        watchList: [],
      };
    case "DELETE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    // forgot and reset password for user
    case "FORGOT_PASSWORD_REQUEST":
    case "RESET_PASSWORD_REQUEST":
      return {
        ...state,
        loading: false,
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "FORGOT_PASSWORD_FAIL":
    case "RESET_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    // add and movie from user's watchlist
    case "ADD_MOVIE_REQUEST":
    case "REMOVE_MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_MOVIE_SUCCESS":
    case "REMOVE_MOVIE_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        watchList: action.payload.watchList,
      };
    case "ADD_MOVIE_FAIL":
    case "REMOVE_MOVIE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    // clear errors
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    // clear message
    case "CLEAR_MESSAGE":
      return { ...state, message: null };

    default:
      return state;
  }
};

export default reducer;
