import "./ISDFlowPageContainer.scss";
import RequestStatus from "../../../requestStatus/RequestStatus";
import StepsMenu from "../stepsMenu/StepsMenu";
import ProjectInfo from "../projectInfo/ProjectInfo";
import {
  NeedsAnalysisForm,
  ObjectiveForm,
  FinalAssessmentStrategyForm,
  CourseStructureForm,
  CourseStrategyDocumentForm,
} from "../isdFlowForms";
import { useNavigate } from "react-router-dom";
import { useISDFlowRequest } from "../../isdFlowContext/IsdFlowContext";
import { STEPS } from "../../../steps";
import BackButton from "../../../reusableComponents/BackButton/BackButton";

const getCurrentStepForm = (currentStep) => {
  switch (currentStep) {
    case STEPS.NEEDS_ANALYSIS:
      return <NeedsAnalysisForm />;
    case STEPS.OBJECTIVE:
      return <ObjectiveForm />;
    case STEPS.FINAL_ASSESSMENT_STRATEGY:
      return <FinalAssessmentStrategyForm />;
    case STEPS.COURSE_STRUCTURE:
      return <CourseStructureForm />;
    case STEPS.COURSE_STRATEGY_DOCUMENT:
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
      case STEPS.NEEDS_ANALYSIS:
        navigate("/requests");
        break;
      case STEPS.OBJECTIVE:
        navigate("/isdflow/needs_analysis");
        break;
      case STEPS.FINAL_ASSESSMENT_STRATEGY:
        navigate("/isdflow/objective");
        break;
      case STEPS.COURSE_STRUCTURE:
        navigate("/isdflow/final_assessment_strategy");
        break;
      case STEPS.COURSE_STRATEGY_DOCUMENT:
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
        <BackButton handleBackButtonClick={handleBackButtonClick} />
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
