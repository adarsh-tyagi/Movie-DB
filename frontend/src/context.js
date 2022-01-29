import React, { useEffect, useReducer, useContext } from "react";
import reducer from "./reducer";
const AppContext = React.createContext();

const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=e8dce7da46844c6b013c0e835f59da30";

const initialState = {
  loading: false,
  success: null,
  message: null,
  error: null,
  user: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {}, []);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
