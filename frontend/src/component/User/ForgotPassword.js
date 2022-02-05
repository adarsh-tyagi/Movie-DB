import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import EmailIcon from "@mui/icons-material/Email";
import { useGlobalContext } from "../../context";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const {
    loading,
    isAuthenticated,
    message,
    error,
    forgotPasswordUser,
    clearError,
    clearMessage,
  } = useGlobalContext();
  const alert = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    forgotPasswordUser({ email });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message) {
      alert.success(message);
      clearMessage();
    }
  }, [alert, error, isAuthenticated, message, navigate, clearError, clearMessage]);

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="fp__container">
          <form encType="multipart/form-data" onSubmit={submitHandler}>
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
            <input type="submit" value="Send Link" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
