export const stepsSequence = [
  "needsAnalysis",
  "objective",
  "finalAssessmentStrategy",
  "courseStructure",
  "courseStrategyDocument",
  "storyboard",
];

export const steps = {
  needsAnalysis: "Needs Analysis",
  objective: "Objective",
  finalAssessmentStrategy: "Final Assessment Strategy",
  courseStructure: "Course Structure",
  courseStrategyDocument: "Course Strategy Document",
  storyboard: "Storyboard",
};

export const getStepName = (currentStep) => {
  return steps[currentStep];
}