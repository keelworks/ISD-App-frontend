import "./RequestsTable.scss";
import RequestRow from "./RequestRow";
import RequestRowSmallScreen from "./RequestRowSmallScreen";
import { useState, useEffect } from "react";

let info = [
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Thu Feb 01 2024 00:00:00 GMT-0800 (Pacific Standard Time)",
    stage: "storyboard",
    status: "stakeholderReview",
  },
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Tue Nov 07 2023 00:00:00 GMT-0800 (Pacific Standard Time)",
    stage: "needsAnalysis",
    status: "qaReview",
  },
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Thu Jun 13 2024 13:29:28 GMT-0700 (Pacific Daylight Time)",
    stage: "objectives",
    status: "status",
  },
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Fri Apr 12 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
    stage: "courseStructure",
    status: "inProgress",
  },
];

//sort info by lastUpdated date:
const sortedInfo = info.sort(
  (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
);

const RequestsTable = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width < 1000) {
    return (
      <section className="requests-table-small">
        {sortedInfo.map((request, index) => (
          <RequestRowSmallScreen key={index} request={request} />
        ))}
      </section>
    );
  }
  return (
    <table className="requests-table">
      <thead className="requests-table-header">
        <tr>
          <th className="request-name-header">Request name</th>
          <th className="assigned-to-header">Assigned To</th>
          <th className="last-updated-header">Last Updated</th>
          <th className="stage-header">Stage</th>
          <th className="status-header">Status</th>
          <th className="actions-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedInfo.map((request, index) => (
          <RequestRow key={index} request={request} />
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
