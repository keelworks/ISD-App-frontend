import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import { STEPS } from "../../../utilities/steps";

const currentStep = STEPS.OBJECTIVE;

const Objective = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default Objective;
