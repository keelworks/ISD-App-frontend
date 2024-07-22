import "./Requests.scss";
import CircleUser from "./../../assets/icons/circle-user.svg";
import RequestsTable from "./../../utilities/requestsLogic/table/RequestsTable";
import NavBar from "./../../utilities/requestsLogic/navigation/NavBar";
import { useState } from "react";

const Requests = () => {
  const [tab, setTab] = useState("active");
  return (
    <main className="requests-wrapper">
      <div className="isd-dashboard-wrapper">
        <div className="isd-dashboard">
          <h1>ISD Dashboard</h1>
          <img src={CircleUser} alt="User" className="circle-user-icon" />
        </div>
      </div>
      <div className="requests-container">
        <h1 className="title requests-title">Requests</h1>
        <NavBar
          onTabClicked={(tabName) => {
            setTab(tabName);
          }}
        />
        <RequestsTable tab={tab} />
      </div>
    </main>
  );
};

export default Requests;
