import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import { STEPS } from "../../../utilities/steps";

const currentStep = STEPS.COURSE_STRUCTURE;

const CourseStructure = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default CourseStructure;
