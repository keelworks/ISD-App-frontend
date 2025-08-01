import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "./LogIn.scss";
import GoogleIcon from "../../assets/icons/google.svg";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MyInput,
  retrieveRoleFromGetUserRoleResponse,
} from "../../utilities/utils";
import useUserAuthApi from "../../utilities/formPostLogic/userAuthApi";
import React from "react";
import { userLoggedIn } from "../../redux/slices/authSlice";
import { setCurrentUserRole } from "../../redux/slices/currentUserSlice";
import { useLazyGetUserDetailsQuery } from "../../redux/RTKQueries/usersQuery";

const errorSchema = yup
  .object({
    email: yup.string().email().required("Enter email."),
    password: yup.string().required("No password provided."),
  })
  .required();

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(errorSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitForm } = useUserAuthApi();
  const [submitError, setSubmitError] = useState(false);
  const [fetchUserRole] = useLazyGetUserDetailsQuery();

  const submitLogIn = async (data) => {
    try {
      const result = await submitForm("signin", data);
      dispatch(userLoggedIn(result));
      const response = await fetchUserRole();
      const userRole = retrieveRoleFromGetUserRoleResponse(response);
      dispatch(setCurrentUserRole({ role: userRole }));
      navigate("/requests");
    } catch (error) {
      console.log(error);
      if (error.message) {
        setSubmitError(error.message);
      }
      if (error.status) {
        setSubmitError("Login Error...");
      }

      setTimeout(() => {
        setSubmitError(false);
      }, 3000);
    }
    reset();
  };

  return (
    <div className="form-container login">
      <form className="form" onSubmit={handleSubmit(submitLogIn)}>
        <h3 className="form-title">ISD Design</h3>
        <fieldset>
          <MyInput
            name="email"
            type="input"
            label="Email"
            placeholder="name@company.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </fieldset>
        <fieldset>
          <MyInput
            name="password"
            label="Password"
            type="password"
            placeholder="**"
            value="12345678Qq!"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </fieldset>
        <div className="button-container">
          {/* Can replace later for default loading and submission success messages */}
          {isSubmitting && <div className="loading-message">Loading...</div>}
          {submitError && <p className="error-message">{submitError}</p>}
          <button className="button signup" disabled={isSubmitting}>
            Log In
          </button>
          <span>or</span>
          {/* backend for google auth needs to be implemented on the backend later */}
          <a href="/backend-route" className="button google-login">
            <div>
              <img
                src={GoogleIcon}
                alt="Google Login"
                className="google-icon"
              />
              <span>Sign in with Google</span>
            </div>
          </a>
          <div className="back-to-login">
            <p>{`Don't have an account?`}</p>
            &nbsp;
            <Link to="/signup">Create</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
