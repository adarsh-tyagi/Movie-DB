import React, { Fragment, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import MaleIcon from "@mui/icons-material/Male";
import { useGlobalContext } from "../../context";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Login = () => {
  const {
    loading,
    isAuthenticated,
    message,
    error,
    loginUser,
    registerUser,
    clearError,
    clearMessage
  } = useGlobalContext();

  const alert = useAlert();
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    registerUser({name, email, password, gender});
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      clearError();
    }
    if (message) {
      alert.success(message);
      clearMessage()
    }
  }, [error, alert, isAuthenticated, navigate, loading, clearError, message, clearMessage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="login__container">
          <div className="switch__btn">
            <button
              className={login ? "active" : ""}
              onClick={() => setLogin(true)}
            >
              Login
            </button>
            <button
              className={!login ? "active" : ""}
              onClick={() => setLogin(false)}
            >
              Register
            </button>
          </div>

          {login ? (
            <form onSubmit={loginHandler}>
              <div>
                <EmailIcon />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <LockIcon />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Login" className="btn" />
              <Link to="/forgot/password">Forgot Password ?</Link>
            </form>
          ) : (
            <form onSubmit={registerHandler}>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <EmailIcon />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <LockIcon />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <MaleIcon />
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Choose Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <input type="submit" value="Register" className="btn" />
            </form>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Login;
