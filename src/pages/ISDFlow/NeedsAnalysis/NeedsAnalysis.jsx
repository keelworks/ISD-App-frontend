import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import { STEPS } from "../../../utilities/steps";

const currentStep = STEPS.NEEDS_ANALYSIS;

const NeedsAnalysis = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default NeedsAnalysis;
