import "./PageWrapper.scss";
import CircleUser from "./../../assets/icons/circle-user.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../redux/slices/authSlice";
import {
  removeCurrentCompanyId,
  removeCurrentUserRoles,
  selectCurrentUserRoles,
} from "../../redux/slices/currentUserSlice";
import { doesTheCurrentUserHaveThisRole } from "../utils";
import ROLES from "../roles";
import { useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const currentRoles = useSelector(selectCurrentUserRoles);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    dispatch(removeCurrentUserRoles());
    dispatch(removeCurrentCompanyId());
  };

  const handleTeamButtonClick = () => {
    navigate("/members");
  };
  return (
    <main className="requests-wrapper">
      <div className="isd-dashboard-wrapper">
        <div className="isd-dashboard">
          <h1>ISD Dashboard</h1>
          <img src={CircleUser} alt="User" className="circle-user-icon" />
          {doesTheCurrentUserHaveThisRole(currentRoles, ROLES.ADMIN) && (
            <button className="team-button" onClick={handleTeamButtonClick}>
              Team
            </button>
          )}
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
      {children}
    </main>
  );
};

export default PageWrapper;
