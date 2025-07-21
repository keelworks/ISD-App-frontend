import React from "react";
import "./CancelConfirmationPopup.scss";
import { useNavigate } from "react-router-dom";

const CancelConfirmationPopup = ({ 
  isVisible, 
  onClose, 
  redirectPath = "/requests",
  title = "Are you sure you want to cancel?",
  subtitle = "Changes will not be saved."
}) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleYesClick = () => {
    navigate(redirectPath);
  };

  const handleNoClick = () => {
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('cancel-popup')) {
      onClose();
    }
  };

  return (
    <div className="cancel-popup" onClick={handleBackgroundClick}>
      <div className="cancel-popup-main">
        <h3 className="cancel-title">{title}</h3>
        <p className="cancel-subtitle">{subtitle}</p>
        
        <div className="button-container cancel-button-container">
          <button 
            className="button no-button" 
            type="button"
            onClick={handleNoClick}
          >
            No
          </button>
          <button 
            className="button yes-button" 
            type="button"
            onClick={handleYesClick}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationPopup;
