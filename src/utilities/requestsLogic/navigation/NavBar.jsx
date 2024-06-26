import { Link } from "react-router-dom";
import "./NavBar.scss";
import FilterIcon from "./../../../assets/icons/filter.svg";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul className="tabs">
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
        <li>
          <button>Canceled</button>
        </li>
      </ul>
      <ul className="actions">
        <li className="filter">
          <button>
            <img src={FilterIcon} alt="filter icon" className="filter-icon" />
          </button>
        </li>
        <li className="search">
          <input type="text" placeholder="Search" />
        </li>
        <li className="create-request">
          <Link to="/courserequest">
            <button className="create-request-button">Create Request</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
