import "./PageWrapper.scss";
import CircleUser from "./../../assets/icons/circle-user.svg";

const PageWrapper = ({ children }) => {
  return (
    <main className="requests-wrapper">
      <div className="isd-dashboard-wrapper">
        <div className="isd-dashboard">
          <h1>ISD Dashboard</h1>
          <img src={CircleUser} alt="User" className="circle-user-icon" />
        </div>
      </div>
      {children}
    </main>
  );
};

export default PageWrapper;
