import "./SaveNextButtons.scss";

const SaveNextButtons = () => {
  const handleSaveClick = () => {
    //need to save info
  };

  return (
    <div className="button-container">
      <button className="button save" type="button" onClick={handleSaveClick}>
        Save
      </button>
      <button className="button next" type="submit">
        Next
      </button>
    </div>
  );
};

export default SaveNextButtons;
