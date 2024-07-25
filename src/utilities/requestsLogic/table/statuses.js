export const statuses = {
    inProgress: "In Progress",
    updating: "Updating",
    qaReview: "QA Review",
    supervisorReview: "Supervisor Review",
    stakeholderReview: "Stakeholder Review",
    canceled: "Canceled", //request can be cancelled during any stage
    completed: "Completed", //temporary state, a new way to mark request completed will be provided later
  };
  
export const statusColors = {
    inProgress: "green",
    updating: "green",
    qaReview: "orange",
    supervisorReview: "orange",
    stakeholderReview: "orange",
    canceled: "grey",
    completed: "green",
  };