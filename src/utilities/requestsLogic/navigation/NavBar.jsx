import { Link } from "react-router-dom";
import "./NavBar.scss";
import FilterIcon from "./../../../assets/icons/filter.svg";

let activeClasses = "clicked";
let completedClasses = "";
let canceledClasses = "";

const handleTabClick = (onTabClicked, tab) => {
  onTabClicked(tab);
  activeClasses = "";
  completedClasses = "";
  canceledClasses = "";
  switch (tab) {
    case "active":
      activeClasses = "clicked";
      break;
    case "completed":
      completedClasses = "clicked";
      break;
    case "canceled":
      canceledClasses = "clicked";
      break;
  }
};

const NavBar = ({ onTabClicked }) => {
  return (
    <div className="nav-bar">
      <ul className="tabs">
        <li>
          <button
            className={activeClasses}
            onClick={() => handleTabClick(onTabClicked, "active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={completedClasses}
            onClick={() => handleTabClick(onTabClicked, "completed")}
          >
            Completed
          </button>
        </li>
        <li>
          <button
            className={canceledClasses}
            onClick={() => handleTabClick(onTabClicked, "canceled")}
          >
            Canceled
          </button>
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
