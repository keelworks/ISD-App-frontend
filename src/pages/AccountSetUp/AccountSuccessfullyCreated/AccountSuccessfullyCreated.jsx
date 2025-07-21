import "./AccountSuccessfullyCreated.scss";
import TickCircleSolid from "../../../assets/icons/big-tick-circle-solid.svg";
import { useNavigate } from "react-router-dom";

const AccountSuccessfullyCreated = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/requests");
  };

  const registerNewCompany = () => {
    navigate("/accountsetup/company_name");
  };

  return (
    <div className="form-container account-setup">
      <div className="form account-successfully-created">
        <img
          src={TickCircleSolid}
          alt="Green Tick Icon"
          className="big-green-tick"
        />
        <h1 className="account-created-message">
          Your account was successfully created!
        </h1>
        <button className="button go-to-dashboard" onClick={goToDashboard}>
          Go to Dashboard
        </button>
        <div className="register-company">
          Haven’t registered the company?{" "}
          <button
            className="register-company-button"
            onClick={registerNewCompany}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSuccessfullyCreated;
