import "./ISDFlowPage.scss";
import StepsMenu from "../stepsMenu/StepsMenu";
import ProjectInfo from "../projectInfo/ProjectInfo";

const ISDFlowPage = ({ currentStep, children }) => {
  //TODO: need to retrieve course name from backend side
  const courseName = "Reducing issues in manufacturing workflow";

  return (
    <div className="isd-flow-wrapper">
      <div className="isd-flow-container">
        <h3 className="isd-flow-title">Course name: {courseName}</h3>
        <div className="isd-flow-content">
          <StepsMenu currentStep={currentStep} />
          <div className="isd-flow-form-container">{children}</div>
          <ProjectInfo />
        </div>
      </div>
    </div>
  );
};

export default ISDFlowPage;
