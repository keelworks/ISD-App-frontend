import React, { useEffect } from "react";
import "./InformationalPopup.scss";

const InformationalPopup = ({ 
  isVisible, 
  message = "The request has been assigned",
  duration = 3000, // 3 seconds default
  onComplete,
  showCheckmark = true
}) => {
  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="informational-popup">
      <div className="informational-popup-main">
        {showCheckmark && (
          <div className="checkmark-container">
            <div className="checkmark">✓</div>
          </div>
        )}
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default InformationalPopup;
