import "./SearchResultsList.scss";

const SearchResultsList = ({
  searchResults,
  setSearchResults,
  selectedEmails,
  setSelectedEmails,
  setInput,
  allowOnlyOneToSelect,
}) => {
  const handleEmailClick = (email) => {
    if (allowOnlyOneToSelect) {
      setSelectedEmails([email]);
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
    setInput("");
    setSearchResults([]);
  };
  return (
    <div className="search-results-list">
      <ul>
        {searchResults.map((email) => (
          <li key={email} onClick={() => handleEmailClick(email)}>
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsList;
