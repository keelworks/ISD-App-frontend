import { useEffect } from "react";
import SelectedEmail from "../selectedEmail/SelectedEmail";
import "./SelectedEmailsContainer.scss";

const SelectedEmailsContainer = ({ selectedEmails, setSelectedEmails }) => {
  return (
    <div className="selected-emails-container">
      {selectedEmails.map((email) => (
        <SelectedEmail
          email={email}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
      ))}
    </div>
  );
};

export default SelectedEmailsContainer;
