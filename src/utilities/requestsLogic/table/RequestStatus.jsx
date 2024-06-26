import "./RequestStatus.scss";

const statuses = {
  status: "Status",
  inProgress: "In Progress",
  updating: "Updating",
  qaReview: "QA Review",
  supervisorReview: "Supervisor Review",
  stakeholderReview: "Stakeholder Review",
};

const statusColors = {
  status: "grey",
  inProgress: "green",
  updating: "green",
  qaReview: "orange",
  supervisorReview: "orange",
  stakeholderReview: "orange",
};

const RequestStatus = ({ status }) => {
  const classes = `request-status ${statusColors[status]}`;
  return <span className={classes}>{statuses[status]}</span>;
};

export default RequestStatus;
