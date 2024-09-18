import "./ProjectInfo.scss";
import DateFormatter from "../../../DateFormatter";
import { useISDFlowRequest } from "../../isdFlowContext/IsdFlowContext";

const ProjectInfo = ({ info }) => {
  const request = useISDFlowRequest();
  const neededFields = [
    "projectId",
    "deliveryDate",
    "stakeholder",
    "sme",
    "isd",
    "qa",
  ];

  const titles = {
    projectId: "Project ID",
    deliveryDate: "Delivery Date",
    stakeholder: "Stakeholder",
    sme: "Subject Matter Expert",
    isd: "Instructional System Designer",
    qa: "Quality Assurance",
  };

  const projectInfo = neededFields.map((field) => {
    const title = titles[field];
    let content = request[field];
    if (field === "deliveryDate") {
      content = DateFormatter(content);
    }
    return (
      <li key={title} className="info-block">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </li>
    );
  });

  return (
    <div className="isd-flow-project-info-container">
      <ul className="isd-flow-project-info">{projectInfo}</ul>
    </div>
  );
};

export default ProjectInfo;
