import React, { useEffect, useReducer, useContext } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

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
  return (
    <AppContext.Provider value={{ }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
