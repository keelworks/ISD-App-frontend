import { useState } from "react";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google.svg";
import { MyInput } from "../../utilities/utils";
import useUserAuthApi from "../../utilities/formPostLogic/userAuthApi";
import React from "react";
import { useDispatch } from "react-redux";
import { userSignedUp } from "../../redux/slices/authSlice";

const errorSchema = yup
  .object({
    name: yup
      .string()
      .required("Enter your first and last name.")
      .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Enter both first and last name"),
    email: yup.string().email().required("Enter email."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be at least 8 letters.")
      .matches(
        /^[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.\?\/]+$/,
        "Password can only contain latin letters, numbers and symbols."
      )
      .matches(
        /[A-Z]/,
        "The password should contain at least one uppercase letter"
      )
      .matches(
        /[a-z]/,
        "The password should contain at least one lowercase letter"
      )
      .matches(
        /[~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.\?\/]/,
        "The password should contain at least one symbol"
      )
      .matches(/[0-9]/, "The password should contain at least one number"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password."),
  })
  .required();

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitForm } = useUserAuthApi();
  const [submitError, setSubmitError] = useState(false);

  const submitSignUp = async (data) => {
    try {
      // Clearing success message if still shown
      setShowSuccessMessage(false);

      const result = await submitForm("register", data);

      //dispatch userSignedUp to save the token
      dispatch(userSignedUp(result));

      // Showing success message
      setShowSuccessMessage(true);

      // Pop up modal here saying check email?

      reset();

      // Clearing success message
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/accountsetup/account_successfully_created");
      }, 3000);
    } catch (error) {
      setSubmitError(true);

      setTimeout(() => {
        setSubmitError(false);
      }, 3000);
    }
    reset();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitSignUp)}>
        <h3 className="form-title">ISD Design</h3>
        <fieldset>
          <MyInput
            name="name"
            label="Full Name "
            type="input"
            placeholder="First and last name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </fieldset>
        <fieldset>
          <MyInput
            name="email"
            label="Email "
            type="input"
            placeholder="name@company.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </fieldset>
        <fieldset>
          <MyInput
            name="password"
            label="Password "
            type="password"
            placeholder="**"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </fieldset>
        <fieldset>
          <MyInput
            name="passwordConfirmation"
            label="Repeat Password"
            type="password"
            placeholder="**"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </fieldset>

        <div className="button-container">
          {/* Can replace later for default loading and submission success messages */}
          {isSubmitting && <div className="loading-message">Loading...</div>}
          {submitError && <p className="error-message">Signup error...</p>}
          {showSuccessMessage && (
            <p className="success-message">Form has been submitted!</p>
          )}

          <button className="button signup" disabled={isSubmitting}>
            Create account
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
            <p>Already have an account?</p>&nbsp;
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
