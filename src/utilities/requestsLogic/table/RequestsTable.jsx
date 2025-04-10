import "./RequestsTable.scss";
import RequestRow from "./RequestRow";
import RequestRowSmallScreen from "./RequestRowSmallScreen";
import { useState, useEffect } from "react";
import { statuses } from "../../statuses";
import { useSelector } from "react-redux";
import { selectAllRequests } from "../../../redux/slices/requestsSlice";
import { useGetRequestsQuery } from "../../../redux/RTKQueries/requestsQuery";

// let info = [
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Thu Feb 01 2024 00:00:00 GMT-0800 (Pacific Standard Time)",
//     stage: "storyboard",
//     status: "stakeholderReview",
//   },
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Tue Nov 07 2023 00:00:00 GMT-0800 (Pacific Standard Time)",
//     stage: "needsAnalysis",
//     status: "qaReview",
//   },
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Thu Jun 13 2024 13:29:28 GMT-0700 (Pacific Daylight Time)",
//     stage: "objectives",
//     status: "status",
//   },
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Fri Apr 12 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     stage: "courseStructure",
//     status: "inProgress",
//   },
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Fri Apr 13 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     stage: "needsAnalysis",
//     status: "canceled",
//   },
//   {
//     requestName: "Reducing issues in manufacturing workflow",
//     assignedTo: "John Doe",
//     lastUpdated: "Fri Apr 09 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     stage: "Storyboard",
//     status: "completed",
//   },
// ];

const sortRequests = (requests) =>
  requests.toSorted((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const splitToNeedReviewAndNoNeedReviewRequests = (requests) => {
  const noReviewRequests = [];
  const needReviewRequests = requests.filter((r) => {
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
  return [noReviewRequests, needReviewRequests];
};
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

const generateTableHeader = (content) => {
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
      {content}
    </table>
  );
};

const generateInfoMessageRow = (message) => {
  return (
    <tbody>
      <tr className="request-row">
        <td colSpan="6" className="info-message">
          {message}
        </td>
      </tr>
    </tbody>
  );
};

const generateSmallScreenInfoMessage = (message) => {
  return (
    <section className="requests-table-small">
      <div className="info-message-small-screen">{message}</div>
    </section>
  );
};

const displayInfoMessage = (width, message) => {
  if (width < 1000) {
    return generateSmallScreenInfoMessage(message);
  }
  return generateTableHeader(generateInfoMessageRow(message));
};

const RequestsTable = ({ tab }) => {
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

  const {
    data: requests,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRequestsQuery();

  if (isLoading) {
    return displayInfoMessage(width, "Loading...");
  } else if (isSuccess) {
    // return if there are no requests
    if (requests.length === 0) {
      return displayInfoMessage(width, "New requests will appear here");
    }
    //sort info by lastUpdated date:
    const sortedRequests = sortRequests(requests);

    //find requests that need review:
    const [noReviewRequests, needReviewRequests] =
      splitToNeedReviewAndNoNeedReviewRequests(sortedRequests);

    const needReviewRequestsByState = filterRequestsByState(
      needReviewRequests,
      tab
    );
    const noReviewRequestsByState = filterRequestsByState(
      noReviewRequests,
      tab
    );

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
    } else {
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
    }
  } else if (isError) {
    console.log(error);
    return displayInfoMessage(width, "Sorry, something went wrong :(");
  }
};

export default RequestsTable;
