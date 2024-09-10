import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";

const currentStep = "needsAnalysis";

const NeedsAnalysis = () => {
  return <ISDFlowPage currentStep={currentStep}></ISDFlowPage>;
};

export default NeedsAnalysis;
