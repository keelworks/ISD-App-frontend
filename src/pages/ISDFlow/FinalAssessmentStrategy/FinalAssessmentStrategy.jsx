import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import { STEPS } from "../../../utilities/steps";

const currentStep = STEPS.FINAL_ASSESSMENT_STRATEGY;

const FinalAssessmentStrategy = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default FinalAssessmentStrategy;
