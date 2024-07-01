import "./RequestStatus.scss";
import { statuses, statusColors } from "./statuses";

const RequestStatus = ({ status }) => {
  const classes = `request-status ${statusColors[status]}`;
  return <span className={classes}>{statuses[status]}</span>;
};

export default RequestStatus;
