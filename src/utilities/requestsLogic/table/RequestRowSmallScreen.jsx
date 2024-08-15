import RequestStatus from "../../requestStatus/RequestStatus";
import stages from "../../stages";
import "./RequestRowSmallScreen.scss";
import DateFormatter from "./../../DateFormatter";

const RequestRowSmallScreen = ({ request }) => {
  return (
    <div className="request-row-small">
      <div className="request-name">{request.requestName}</div>
      <div className="status">
        <RequestStatus status={request.status} />
      </div>
      <div className="assigned-to-header">Assigned to</div>
      <div className="assigned-to">{request.assignedTo}</div>
      <div className="stage-header">Stage</div>
      <div className="stage">{stages[request.stage]}</div>
      <div className="last-updated-header">Last updated</div>
      <div className="last-updated">{DateFormatter(request.lastUpdated)}</div>
    </div>
  );
};

export default RequestRowSmallScreen;
