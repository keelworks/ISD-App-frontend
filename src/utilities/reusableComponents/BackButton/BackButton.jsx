import "./BackButton.scss";
import LessThanIcon from "../../../assets/icons/less-than.svg";

const BackButton = ({ handleBackButtonClick }) => {
  return (
    <div className="back-button-container">
      <button
        type="button"
        className="back-button"
        onClick={handleBackButtonClick}
      >
        <img
          src={LessThanIcon}
          alt="Back Button Sign"
          className="back-button-icon"
        />
        <span className="back-button-text">&nbsp;Back</span>
      </button>
    </div>
  );
};

export default BackButton;
