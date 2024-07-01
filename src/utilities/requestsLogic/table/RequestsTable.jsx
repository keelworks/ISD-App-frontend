import "./RequestsTable.scss";
import RequestRow from "./RequestRow";
import RequestRowSmallScreen from "./RequestRowSmallScreen";
import { useState, useEffect } from "react";
import { statuses } from "./statuses";

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

//find requests that need review:
const noReviewRequests = [];
const needReviewRequests = sortedInfo.filter((r) => {
  if (
    r.status == "qaReview" ||
    r.status == "supervisorReview" ||
    r.status == "stakeholderReview"
  ) {
    return r;
  } else {
    noReviewRequests.push(r);
  }
});

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
      <>
        {needReviewRequests.length > 0 && (
          <section className="requests-table-small need-review">
            {needReviewRequests.map((request, index) => (
              <RequestRowSmallScreen key={index} request={request} />
            ))}
          </section>
        )}
        {noReviewRequests.length > 0 && (
          <section className="requests-table-small">
            {noReviewRequests.map((request, index) => (
              <RequestRowSmallScreen key={index} request={request} />
            ))}
          </section>
        )}
      </>
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
      {needReviewRequests.length > 0 && (
        <tbody className="need-review">
          {needReviewRequests.map((request, index) => (
            <RequestRow key={index} request={request} />
          ))}
          <tr className="table-gap">
            <td colSpan={6}></td>
          </tr>
        </tbody>
      )}
      <tbody>
        {noReviewRequests.map((request, index) => (
          <RequestRow key={index} request={request} />
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
