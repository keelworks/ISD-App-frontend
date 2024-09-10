import "./PageWrapper.scss";
import CircleUser from "./../../assets/icons/circle-user.svg";

const PageWrapper = ({ page }) => {
  return (
    <main className="requests-wrapper">
      <div className="isd-dashboard-wrapper">
        <div className="isd-dashboard">
          <h1>ISD Dashboard</h1>
          <img src={CircleUser} alt="User" className="circle-user-icon" />
        </div>
      </div>
      {page}
    </main>
  );
};

export default PageWrapper;
