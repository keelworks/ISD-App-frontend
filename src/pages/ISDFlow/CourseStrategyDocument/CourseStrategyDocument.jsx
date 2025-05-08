import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import { STEPS } from "../../../utilities/steps";

const currentStep = STEPS.COURSE_STRATEGY_DOCUMENT;

const CourseStrategyDocument = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default CourseStrategyDocument;
