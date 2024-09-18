import "./ISDFlowPageContainer.scss";
import RequestStatus from "../../../requestStatus/RequestStatus";
import StepsMenu from "../stepsMenu/StepsMenu";
import ProjectInfo from "../projectInfo/ProjectInfo";
import LessThanIcon from "../../../../assets/icons/less-than.svg";
import {
  NeedsAnalysisForm,
  ObjectiveForm,
  FinalAssessmentStrategyForm,
  CourseStructureForm,
  CourseStrategyDocumentForm,
} from "../isdFlowForms";
import { useNavigate } from "react-router-dom";
import { useISDFlowRequest } from "../../isdFlowContext/IsdFlowContext";

const getCurrentStepForm = (currentStep) => {
  switch (currentStep) {
    case "needsAnalysis":
      return <NeedsAnalysisForm />;
    case "objective":
      return <ObjectiveForm />;
    case "finalAssessmentStrategy":
      return <FinalAssessmentStrategyForm />;
    case "courseStructure":
      return <CourseStructureForm />;
    case "courseStrategyDocument":
      return <CourseStrategyDocumentForm />;
    default:
      console.log(
        "Unknown step. Cannot display the correct form for ISDFlowPage"
      );
  }
};

const ISDFlowPageContainer = ({ currentStep }) => {
  const navigate = useNavigate();
  const request = useISDFlowRequest();

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
      case "courseStrategyDocument":
        navigate("/isdflow/course_structure");
        break;
      default:
        console.log(
          "Unknown step. Cannot display the correct page when clicking Back button"
        );
    }
  };
  return (
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
          <h3 className="isd-flow-title">{request.courseName}</h3>
          <div className="isd-flow-status">
            <RequestStatus status={request.status} />
          </div>
        </div>

        <div className="isd-flow-content">
          <StepsMenu currentStep={currentStep} />
          <div className="isd-flow-form-container">
            {getCurrentStepForm(currentStep)}
          </div>
          <ProjectInfo />
        </div>
      </div>
    </div>
  );
};

export default ISDFlowPageContainer;
