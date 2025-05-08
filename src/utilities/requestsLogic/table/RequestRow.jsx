import "./RequestRow.scss";
import RequestStatus from "../../requestStatus/RequestStatus";
import DateFormatter from "./../../DateFormatter";
import { STAGES, convertStageStringToLiteral } from "../../stages";

const RequestRow = ({ request, onShowRequest }) => {
  return (
    <tr className="request-row" onClick={onShowRequest}>
      <td className="request-name">{request.requestName}</td>
      <td className="assigned-to">{request.assignedTo}</td>
      <td className="last-updated">{DateFormatter(request.updatedAt)}</td>
      <td className="stage">
        {STAGES[convertStageStringToLiteral(request.stage)]}
      </td>
      <td className="status">
        <RequestStatus status={request.status} />
      </td>
      <td className="actions">
        <div className="action-dots"></div>
      </td>
    </tr>
  );
};

export default RequestRow;
