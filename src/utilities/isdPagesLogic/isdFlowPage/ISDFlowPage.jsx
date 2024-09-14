import "./ISDFlowPage.scss";
import StepsMenu from "../stepsMenu/StepsMenu";
import ProjectInfo from "../projectInfo/ProjectInfo";
import PageWrapper from "../../../utilities/pageWrapper/PageWrapper";
import NeedsAnalysisForm from "../isdFlowForms/needsAnalysisForm/NeedsAnalysisForm";
import ObjectiveForm from "../isdFlowForms/objectiveForm/ObjectiveForm";
import FinalAssessmentStrategyForm from "../isdFlowForms/finalAssessmentStrategyForm/FinalAssessmentStrategyForm";
import CourseStructureForm from "../isdFlowForms/courseStructureForm/courseStructureForm";
import LessThanIcon from "../../../assets/icons/less-than.svg";
import { useNavigate } from "react-router-dom";
import RequestStatus from "../../requestStatus/RequestStatus";

// TODO: need to retrieve info from backend
const info = {
  courseName: "Reducing issues in manufacturing workflow",
  status: "inProgress",
  projectId: "ID13405GE3045",
  deliveryDate: "Thu Feb 01 2024 00:00:00 GMT-0800 (Pacific Standard Time)",
  lastUpdated: "Fri Apr 12 2024 00:00:00 GMT-0700 (Pacific Daylight Time)",
  stakeholder: "Thomas Garrod",
  sme: "Gagan Gundyadka",
  isd: "Irina Lavrova",
  qa: "Lei Lei",
  problemStatement: "Inventory management workflow breaking issue",
  steps: {
    needsAnalysis: {
      problemData: "Inventory management workflow breaking issue",
      successStatement: "",
      audienceDefinition: "",
      audienceBenefit: "",
      audienceNeeds: "",
      changeIssues: "",
      technologyIssues: "",
      proofOfConsumption: "",
      potentialForChange: "",
      deliveryStrategy: "",
      projectRisks: "",
      recommendation: "",
    },
    objective: {
      terminalObjective: "terminal objective",
      enablingObjectives: ["my first Enabling objective", "second", "third"],
    },
    finalAssessmentStrategy: [
      {
        measurementStrategy: "some measurement startegy",
        successCriteria: "some success criteria",
      },
    ],
  },
};

const getCurrentStepForm = (currentStep, info) => {
  switch (currentStep) {
    case "needsAnalysis":
      return <NeedsAnalysisForm info={info} />;
    case "objective":
      return <ObjectiveForm info={info} />;
    case "finalAssessmentStrategy":
      return <FinalAssessmentStrategyForm info={info} />;
    case "courseStructure":
      return <CourseStructureForm info={info} />;
    default:
      console.log(
        "Unknown step. Cannot display the correct form for ISDFlowPage"
      );
  }
};

const ISDFlowPage = ({ currentStep }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    switch (currentStep) {
      case "needsAnalysis":
        navigate("/requests");
        break;
      case "objective":
        navigate("/isdflow/needs_analysis");
        break;
      case "finalAssessmentStrategy":
        navigate("/isdflow/objective");
        break;
      case "courseStructure":
        navigate("/isdflow/final_assessment_strategy");
        break;
      default:
        console.log(
          "Unknown step. Cannot display the correct page when clicking Back button"
        );
    }
  };

  const page = (
    <div className="isd-flow-wrapper">
      <div className="isd-flow-container">
        <div className="isd-flow-back-button-container">
          <button
            type="button"
            className="isd-flow-back-button"
            onClick={handleBackButtonClick}
          >
            <img
              src={LessThanIcon}
              alt="Back Button Sign"
              className="back-button-icon"
            />
            &nbsp;Back
          </button>
        </div>

        <div className="isd-flow-title-container">
          <h3 className="isd-flow-title">{info.courseName}</h3>
          <div className="isd-flow-status">
            <RequestStatus status={info.status} />
          </div>
        </div>

        <div className="isd-flow-content">
          <StepsMenu currentStep={currentStep} />
          <div className="isd-flow-form-container">
            {getCurrentStepForm(currentStep, info)}
          </div>
          <ProjectInfo info={info} />
        </div>
      </div>
    </div>
  );

  return <PageWrapper page={page} />;
};

export default ISDFlowPage;
