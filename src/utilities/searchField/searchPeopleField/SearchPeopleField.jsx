import "./SearchPeopleField.scss";
import SearchBar from "../searchComponenets/searchBar/SearchBar";
import SearchResultsList from "../searchComponenets/searchResultsList/SearchResultsList";
import { useState } from "react";
import SelectedEmailsContainer from "../searchComponenets/selectedEmailsContainer/SelectedEmailsContainer";
import { useEffect } from "react";

const SearchPeopleField = ({
  name,
  label,
  register,
  setValue,
  setError,
  clearErrors,
  submitCount,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [input, setInput] = useState("");

  register("peopleRequiredToAttend");

  useEffect(() => {
    setValue("peopleRequiredToAttend", selectedEmails);
    if (selectedEmails.length === 0 && submitCount > 0) {
      setError("peopleRequiredToAttend", {
        type: "custom",
        message: "Select at least one email",
      });
    } else {
      clearErrors("peopleRequiredToAttend");
    }
  }, [selectedEmails]);

  return (
    <div className="search-people-field-container">
      <label htmlFor={name}>{label}</label>
      {selectedEmails.length > 0 && (
        <SelectedEmailsContainer
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
      )}
      <SearchBar
        name={name}
        setSearchResults={setSearchResults}
        input={input}
        setInput={setInput}
        selectedEmails={selectedEmails}
      />
      {searchResults.length > 0 && (
        <SearchResultsList
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
          setInput={setInput}
        />
      )}
    </div>
  );
};

export default SearchPeopleField;
