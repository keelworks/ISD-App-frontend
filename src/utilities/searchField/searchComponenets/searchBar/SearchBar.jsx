import "./SearchBar.scss";

const SearchBar = ({ setSearchResults, input, setInput, selectedEmails }) => {
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
        console.log(results);

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
        className="search-input"
        placeholder="Type to search people..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      {/* <icon></icon> */}
      {/* <label htmlFor={id ?? name}>{label}</label> */}
      {/* <input type={type} id={id ?? name} name={name} {...rest} ref={ref} /> */}
      {/* <button type="button" onClick={onClick}></button> */}
    </div>
  );
};

export default SearchBar;
