import { createContext, useReducer, useContext } from "react";

const ISDFlowContext = createContext(null);
const ISDFlowDispatchContext = createContext(null);

export const ISDFlowRequestProvider = ({ children }) => {
  const [request, dispatch] = useReducer(
    isdFlowRequestsReducer,
    initialIsdFlowRequest
  );

  return (
    <ISDFlowContext.Provider value={request}>
      <ISDFlowDispatchContext.Provider value={dispatch}>
        {children}
      </ISDFlowDispatchContext.Provider>
    </ISDFlowContext.Provider>
  );
};

export const useISDFlowRequest = () => {
  return useContext(ISDFlowContext);
};

export const useISDFlowDispatch = () => {
  return useContext(ISDFlowDispatchContext);
};

const isdFlowRequestsReducer = (request, action) => {
  const step = action.step;
  switch (action.type) {
    case "next_step":
    case "saved_step": {
      const updatedSteps = { ...request.steps };
      Object.entries(action.data).forEach(([key, value]) => {
        updatedSteps[step][key] = value;
      });
      return { ...request, steps: updatedSteps };
    }
    case "next_fas_step":
    case "saved_fas_step": {
      const updatedSteps = { ...request.steps };
      updatedSteps.finalAssessmentStrategy = {};

      Object.entries(action.data).forEach(([index, objective]) => {
        updatedSteps.objective.enablingObjectives[index] = objective.value;
        updatedSteps.finalAssessmentStrategy[objective.value] = {
          measurementStrategy: objective.measurementStrategy,
          successCriteria: objective.successCriteria,
        };

        return { ...request, steps: updatedSteps };
      });
    }
    case "next_cs_step": {
      const updatedSteps = request.steps;
      updatedSteps.courseStructure = {};
      return Object.entries(action.data).forEach(([index, module]) => {
        return {
          title: module.title,
          lessons: module.lessons,
        };
      });
    }
  }
};

const initialIsdFlowRequest = {
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
    needsAnalysis: {},
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
    courseStrategyDocument: [],
  },
};
