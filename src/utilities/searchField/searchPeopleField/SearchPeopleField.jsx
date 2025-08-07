import "./SearchPeopleField.scss";
import SearchBar from "../searchComponenets/searchBar/SearchBar";
import SearchResultsList from "../searchComponenets/searchResultsList/SearchResultsList";
import { useState } from "react";
import SelectedEmailsContainer from "../searchComponenets/selectedEmailsContainer/SelectedEmailsContainer";
import { useEffect } from "react";
import { useGetMembersByOrganizationIdQuery } from "../../../redux/RTKQueries/membersQuery";
import { useSelector } from "react-redux";
import { selectCurrentCompanyId } from "../../../redux/slices/currentUserSlice";

const SearchPeopleField = ({
  name,
  label,
  register,
  setValue,
  setError,
  clearErrors,
  submitCount,
  peopleRequiredToAttend = [],
  allowOnlyOneToSelect = false,
  role = "",
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(peopleRequiredToAttend);
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState([]);
  const organizationId = useSelector(selectCurrentCompanyId);
  const {
    data: membersByOrganization,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetMembersByOrganizationIdQuery(organizationId);

  useEffect(() => {
    if (isFetching === false && isSuccess === true) {
      setEmails(membersByOrganization.map((member) => member.User.email));
    }
  }, [membersByOrganization]);

  const capitalizeEveryStringInArray = (array) => {
    const capitalized = array.map((s, i) =>
      i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)
    );
    return capitalized;
  };

  const nameToRegister = capitalizeEveryStringInArray(name.split("_")).join("");

  register(nameToRegister);

  useEffect(() => {
    setValue(nameToRegister, selectedEmails);
    // console.log(submitCount);
    if (selectedEmails.length === 0 && submitCount > 0) {
      setError(nameToRegister, {
        type: "custom",
        message: "Select at least one email",
      });
    } else {
      clearErrors(nameToRegister);
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
        emails={emails}
      />
      {searchResults.length > 0 && (
        <SearchResultsList
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
          setInput={setInput}
          allowOnlyOneToSelect={allowOnlyOneToSelect}
        />
      )}
    </div>
  );
};

export default SearchPeopleField;
