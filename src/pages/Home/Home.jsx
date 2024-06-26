import "./Home.scss";
import { Link } from "react-router-dom";
import React from "react";
import img from "../../assets/images/homepageBg2.jpg";

const Home = () => {
  return (
    <div
      className="bg-container"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <div className="info-container d-flex flex-column justify-content-center align-items-left h-100">
        <h2 className="text-white display-4 info-text">
          Foster change through customized <br />
          <span style={{ color: "#ffc107" }}>course building </span>
          experience
        </h2>
        <h5 className="text-white mt-3 mb-4 paragraph">
          ISD Design will hold process documents for building a course for your
          organization.
        </h5>
        <div>
          <Link to="/login">
            <button className="btn-yellow">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="btn-blue">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
