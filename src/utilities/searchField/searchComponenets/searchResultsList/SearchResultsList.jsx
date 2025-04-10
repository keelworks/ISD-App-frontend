import "./SearchResultsList.scss";

const SearchResultsList = ({
  searchResults,
  setSearchResults,
  selectedEmails,
  setSelectedEmails,
  setInput,
}) => {
  const handleEmailClick = (email) => {
    setSelectedEmails([...selectedEmails, email]);
    setInput("");
    setSearchResults([]);
  };
  return (
    <div className="search-results-list">
      <ul>
        {searchResults.map((person) => (
          <li key={person.email} onClick={() => handleEmailClick(person.email)}>
            {person.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsList;
