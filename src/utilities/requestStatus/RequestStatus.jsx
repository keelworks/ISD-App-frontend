import "./RequestStatus.scss";
import { convertStatusStringToLiteral, STATUS_COLORS } from "../statuses";

const RequestStatus = ({ status }) => {
  const classes = `request-status ${
    STATUS_COLORS[convertStatusStringToLiteral(status)]
  }`;
  const nbspStatus = status.split(" ").join("\u00A0");
  return <span className={classes}>{nbspStatus}</span>;
};

export default RequestStatus;
