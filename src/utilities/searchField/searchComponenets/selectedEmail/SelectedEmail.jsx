import "./SelectedEmail.scss";

const SelectedEmail = ({ email, selectedEmails, setSelectedEmails }) => {
  const handleRemoveEmailClick = () => {
    const updatedselectedEmails = selectedEmails.filter(
      (emailFromList) => emailFromList !== email
    );
    setSelectedEmails(updatedselectedEmails);
  };
  return (
    <span className="email-chip">
      {email}
      <span className="remove-email-icon" onClick={handleRemoveEmailClick}>
        &#x2715;
      </span>
    </span>
  );
};

export default SelectedEmail;
