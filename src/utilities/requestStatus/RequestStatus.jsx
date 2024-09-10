import "./RequestStatus.scss";
import { statuses, statusColors } from "../statuses";

const RequestStatus = ({ status }) => {
  const classes = `request-status ${statusColors[status]}`;
  const nbspStatus = statuses[status].split(" ").join("\u00A0");
  return <span className={classes}>{nbspStatus}</span>;
};

export default RequestStatus;
