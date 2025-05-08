import RequestStatus from "../../requestStatus/RequestStatus";
import "./RequestRowSmallScreen.scss";
import DateFormatter from "./../../DateFormatter";
import { convertStageStringToLiteral, STAGES } from "../../stages";

const RequestRowSmallScreen = ({ request, onShowRequest }) => {
  return (
    <div className="request-row-small" onClick={onShowRequest}>
      <div className="request-name">{request.requestName}</div>
      <div className="status">
        <RequestStatus status={request.status} />
      </div>
      <div className="assigned-to-header">Assigned to</div>
      <div className="assigned-to">{request.assignedTo}</div>
      <div className="stage-header">Stage</div>
      <div className="stage">
        {STAGES[convertStageStringToLiteral(request.stage)]}
      </div>
      <div className="last-updated-header">Last updated</div>
      <div className="last-updated">{DateFormatter(request.updatedAt)}</div>
    </div>
  );
};

export default RequestRowSmallScreen;
