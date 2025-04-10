import "./SearchBar.scss";

const SearchBar = ({
  name,
  setSearchResults,
  input,
  setInput,
  selectedEmails,
}) => {
  const fetchUsers = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.email &&
            user.email.toLowerCase().includes(value)
          );
        });

        //remove already selected emails from the list
        const filteredResults = [...results];
        selectedEmails.forEach((email) => {
          const index = filteredResults.findIndex(
            (person) => person.email === email
          );
          filteredResults.splice(index, 1);
        });

        setSearchResults(filteredResults);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchUsers(value);
  };
  return (
    <div className="form-input">
      <input
        id={name}
        name={name}
        className="search-input"
        placeholder="Type to search people..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
