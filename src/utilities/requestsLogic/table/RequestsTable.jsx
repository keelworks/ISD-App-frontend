import "./RequestsTable.scss";
import RequestRow from "./RequestRow";
import RequestRowSmallScreen from "./RequestRowSmallScreen";
import { useState, useEffect } from "react";
import { useGetRequestsQuery } from "../../../redux/RTKQueries/requestsQuery";
import { STATUSES } from "../../statuses";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserRole } from "../../../redux/slices/currentUserSlice";
import ROLES from "../../roles";
import { STAGES } from "../../stages";
import { useNavigate } from "react-router-dom";
import { requestClicked } from "../../../redux/slices/currentRequestSlice";

const sortRequests = (requests) =>
  requests.toSorted((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const splitToNeedReviewAndNoNeedReviewRequests = (requests) => {
  const noReviewRequests = [];
  const needReviewRequests = requests.filter((r) => {
    if (
      r.status == STATUSES.QA_REVIEW ||
      r.status == STATUSES.SUPERVISOR_REVIEW ||
      r.status == STATUSES.STAKEHOLDER_REVIEW
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
        r.status === STATUSES.IN_PROGRESS ||
        r.status === STATUSES.UPDATING ||
        r.status === STATUSES.QA_REVIEW ||
        r.status === STATUSES.SUPERVISOR_REVIEW ||
        r.status === STATUSES.STAKEHOLDER_REVIEW
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
  const currentUserRole = useSelector(selectCurrentUserRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    const showClickedRequest = (clickedRequest) => {
      console.log(currentUserRole);
      console.log(clickedRequest);
      switch (currentUserRole) {
        case ROLES.STAKEHOLDER:
          if (
            clickedRequest.stage === STAGES.NEW_COURSE_REQUEST &&
            clickedRequest.status === STATUSES.STAKEHOLDER_REVIEW
          ) {
            dispatch(requestClicked(clickedRequest));
            // dispatch the action. Something like review
            console.log(clickedRequest);
            navigate(`/course_request/${clickedRequest.request_id}`);
          }
          break;
          break;
        case ROLES.ISD_SUPERVISOR:
          if (
            clickedRequest.stage === STAGES.NEW_COURSE_REQUEST &&
            clickedRequest.status === STATUSES.SUPERVISOR_REVIEW
          ) {
            dispatch(requestClicked(clickedRequest));
            // dispatch the action. Something like review
            console.log(clickedRequest);
            navigate(`/review/new_course_request/${clickedRequest.request_id}`);
          }
          break;
        default:
          console.log("Unknown role!");
      }
      // if stage = new course request && status = supervisor review && userRole = isd supervisor -> show new course request review for isd supervisor
      // if stage = new course request && status = stakeholder review && userRole = stakeholder -> show new course request with comments
    };

    if (width < 1000) {
      return (
        <>
          {needReviewRequestsByState.length > 0 && (
            <section className="requests-table-small need-review">
              {needReviewRequestsByState.map((request, index) => (
                <RequestRowSmallScreen
                  key={index}
                  request={request}
                  onShowRequest={() => showClickedRequest(request)}
                />
              ))}
            </section>
          )}
          {noReviewRequestsByState.length > 0 && (
            <section className="requests-table-small">
              {noReviewRequestsByState.map((request, index) => (
                <RequestRowSmallScreen
                  key={index}
                  request={request}
                  onShowRequest={() => showClickedRequest(request)}
                />
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
                <RequestRow
                  key={index}
                  request={request}
                  onShowRequest={() => showClickedRequest(request)}
                />
              ))}
              <tr className="table-gap">
                <td colSpan={6}></td>
              </tr>
            </tbody>
          )}
          <tbody>
            {noReviewRequestsByState.map((request, index) => (
              <RequestRow
                key={index}
                request={request}
                onShowRequest={() => showClickedRequest(request)}
              />
            ))}
          </tbody>
        </table>
      );
    }
  } else if (isError) {
    //need to select one of two options:
    console.log(JSON.stringify(error));
    return displayInfoMessage(width, "Sorry, something went wrong :(");
    // return displayInfoMessage(
    //   width,
    //   `Sorry, something went wrong: ${error.error}`
    // );
  }
};

export default RequestsTable;
