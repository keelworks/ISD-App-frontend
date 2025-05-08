import { Link } from "react-router-dom";
import "./NavBar.scss";
import FilterIcon from "./../../../assets/icons/filter.svg";
import { useSelector } from "react-redux";
import { selectCurrentUserRole } from "../../../redux/slices/currentUserSlice";
import ROLES from "../../roles";

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
  const currentUserRole = useSelector(selectCurrentUserRole);
  console.log(currentUserRole);

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
        {currentUserRole === ROLES.STAKEHOLDER && (
          <li className="create-request">
            <Link to="/course_request">
              <button className="create-request-button">Create Request</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
