import PageWrapper from "../../../utilities/pageWrapper/PageWrapper";
<<<<<<< HEAD
import NeedsAnalysisForm from "../isdFlowForms/needsAnalysisForm/NeedsAnalysisForm";
import ObjectiveForm from "../isdFlowForms/objectiveForm/ObjectiveForm";
import FinalAssessmentStrategyForm from "../isdFlowForms/finalAssessmentStrategyForm/FinalAssessmentStrategyForm";
import CourseStructureForm from "../isdFlowForms/courseStructureForm/CourseStructureForm";
import LessThanIcon from "../../../assets/icons/less-than.svg";
import { useNavigate } from "react-router-dom";
import RequestStatus from "../../requestStatus/RequestStatus";
=======
import ISDFlowPageContainer from "../isdPagesComponents/isdFlowPageContainer/IsdFlowPageContainer";
import { ISDFlowRequestProvider } from "../isdFlowContext/IsdFlowContext";
>>>>>>> afe111c (Refactored / Add Course Structure Form Functionality:)

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
    finalAssessmentStrategy: {
      "my first Enabling objective": {
        measurementStrategy: "some measurement strategy",
        successCriteria: "some success criteria",
      },
    },
    courseStructure: [
      {
        title: "My first module ever",
        lessons: [],
      },
      {
        title: "My second module",
        lessons: ["lesson111", "lesson2"],
      },
    ],
    courseStrategyDocument: [
      {
        type: "title",
        moduleTitle: "My first module ever",
        description: "my description",
        elements: [],
        lessons: [],
        // elements: [
        //   { type: "image", guidance: "do something" },
        //   { type: "activity", guidance: "do something else" },
        // ],
      },
      {
        type: "title",
        moduleTitle: "My second module",
        description: "my description",
        elements: [],
        lessons: [
          {
            type: "lesson",
            lessonName: "lesson1",
            header: "some lesson header",
            desiredOutcome: "some lesson outcome",
            elements: [],
            // elements: [
            //   { type: "image", guidance: "do something" },
            //   { type: "activity", guidance: "do something else" },
            // ],
          },
          {
            type: "lesson",
            lessonName: "lesson2",
            header: "second lesson header",
            desiredOutcome: "second lesson outcome",
            elements: [],
          },
        ],
      },
    ],
    courseStructure: [
      {
        moduleNumber: "1",
        title: "My first module ever",
        lessons: [],
      },
      {
        moduleNumber: "2",
        title: "My second module",
        lessons: ["lesson1", "lesson2"],
      },
    ],
  },
};

const ISDFlowPage = ({ currentStep }) => {
  return (
    <PageWrapper>
      <ISDFlowRequestProvider>
        <ISDFlowPageContainer currentStep={currentStep}></ISDFlowPageContainer>
      </ISDFlowRequestProvider>
    </PageWrapper>
  );
};

export default ISDFlowPage;
