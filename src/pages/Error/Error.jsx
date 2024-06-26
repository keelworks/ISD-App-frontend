import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  return (
    <main className="body-container">
      <div className="error-container">
        <h1 className="error-title">Oops! Page Not Found.</h1>
        <p className="error-paragraph">
          We can't seem to find the page you are looking for!
        </p>
        <Link className="home-link" to="/">
          Back home
        </Link>
      </div>
    </main>
  );
};

export default Error;
