import "./Requests.scss";
import RequestsTable from "./../../utilities/requestsLogic/table/RequestsTable";
import NavBar from "./../../utilities/requestsLogic/navigation/NavBar";
import PageWrapper from "../../utilities/pageWrapper/PageWrapper";
import { useState } from "react";

const Requests = () => {
  const [tab, setTab] = useState("active");

  const requestsContainer = (
    <div className="requests-container">
      <h1 className="title requests-title">Requests</h1>
      <NavBar
        onTabClicked={(tabName) => {
          setTab(tabName);
        }}
      />
      <RequestsTable tab={tab} />
    </div>
  );
  return <PageWrapper page={requestsContainer} />;
};

export default Requests;
