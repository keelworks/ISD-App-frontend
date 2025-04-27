import "./PageWrapper.scss";
import CircleUser from "./../../assets/icons/circle-user.svg";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../redux/slices/authSlice";

const PageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLoggedOut());
  };
  return (
    <main className="requests-wrapper">
      <div className="isd-dashboard-wrapper">
        <div className="isd-dashboard">
          <h1>ISD Dashboard</h1>
          <img src={CircleUser} alt="User" className="circle-user-icon" />
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
      {children}
    </main>
  );
};

export default PageWrapper;
