import "./RequestsTable.scss";
import RequestRow from "./RequestRow";
import RequestRowSmallScreen from "./RequestRowSmallScreen";
import { useState, useEffect } from "react";
import { statuses } from "../../statuses";

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
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Fri Apr 13 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
    stage: "needsAnalysis",
    status: "canceled",
  },
  {
    requestName: "Reducing issues in manufacturing workflow",
    assignedTo: "John Doe",
    lastUpdated: "Fri Apr 09 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
    stage: "Storyboard",
    status: "completed",
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

// The states are: active, canceled, completed.
// Request is in active state if its status is not completed or canceled.
const filterRequestsByState = (requests, state) => {
  return requests.filter((r) => {
    if (state === "active") {
      if (
        r.status === "inProgress" ||
        r.status === "updating" ||
        r.status === "qaReview" ||
        r.status === "supervisorReview" ||
        r.status === "stakeholderReview"
      ) {
        return r;
      }
    }
    if (r.status === state) {
      return r;
    }
  });
};

const RequestsTable = ({ tab }) => {
  const [width, setWidth] = useState(window.innerWidth);
  console.log("tab!!! " + tab);
  const needReviewRequestsByState = filterRequestsByState(
    needReviewRequests,
    tab
  );
  const noReviewRequestsByState = filterRequestsByState(noReviewRequests, tab);

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
        {needReviewRequestsByState.length > 0 && (
          <section className="requests-table-small need-review">
            {needReviewRequestsByState.map((request, index) => (
              <RequestRowSmallScreen key={index} request={request} />
            ))}
          </section>
        )}
        {noReviewRequestsByState.length > 0 && (
          <section className="requests-table-small">
            {noReviewRequestsByState.map((request, index) => (
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
      {needReviewRequestsByState.length > 0 && (
        <tbody className="need-review">
          {needReviewRequestsByState.map((request, index) => (
            <RequestRow key={index} request={request} />
          ))}
          <tr className="table-gap">
            <td colSpan={6}></td>
          </tr>
        </tbody>
      )}
      <tbody>
        {noReviewRequestsByState.map((request, index) => (
          <RequestRow key={index} request={request} />
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
