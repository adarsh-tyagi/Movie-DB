import React, { useState, useEffect, Fragment } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";

const ResetPassword = () => {
  const {
    loading,
    isAuthenticated,
    message,
    error,
    resetPasswordUser,
    clearError,
    clearMessage,
  } = useGlobalContext();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    resetPasswordUser({ token, password, confirmPassword });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }
    if (message) {
      alert.success(message);
      clearMessage();
      navigate("/signin");
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [alert, error, isAuthenticated, message, navigate, clearError, clearMessage]);

  return (
    <Fragment>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="login__container">
          <form onSubmit={submitHandler}>
            <div>
              <PasswordIcon />
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
              <LockIcon />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Change Password" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
