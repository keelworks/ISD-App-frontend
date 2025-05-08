export const STATUSES = {
    IN_PROGRESS: "In Progress",
    UPDATING: "Updating",
    QA_REVIEW: "QA Review",
    SUPERVISOR_REVIEW: "Supervisor Review",
    STAKEHOLDER_REVIEW: "Stakeholder Review",
    CANCELED: "Canceled", //request can be cancelled during any stage
    COMPLETED: "Completed", //temporary state, a new way to mark request completed will be provided later
  };
  
export const STATUS_COLORS = {
    IN_PROGRESS: "green",
    UPDATING: "green",
    QA_REVIEW: "orange",
    SUPERVISOR_REVIEW: "orange",
    STAKEHOLDER_REVIEW: "orange",
    CANCELED: "grey",
    COMPLETED: "green",
  };

  export const convertStatusStringToLiteral = statusString => statusString.split(" ").join("_").toUpperCase();