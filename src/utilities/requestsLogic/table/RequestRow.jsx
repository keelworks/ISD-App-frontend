import "./RequestRow.scss";
import RequestStatus from "./RequestStatus";
import stages from "./stages";
import DateFormatter from "./DateFormatter.js";

const RequestRow = ({ request }) => {
  return (
    <tr className="request-row">
      <td className="request-name">{request.requestName}</td>
      <td className="assigned-to">{request.assignedTo}</td>
      <td className="last-updated">{DateFormatter(request.lastUpdated)}</td>
      <td className="stage">{stages[request.stage]}</td>
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
