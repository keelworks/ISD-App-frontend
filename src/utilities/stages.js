export const STAGES = {
    NEW_COURSE_REQUEST: "New Course Request",
    NEEDS_ANALYSIS: "Needs Analysis",
    OBJECTIVE: "Objective",
    FINAL_ASSESSMENT_STRATEGY: "Final Assessment Strategy",
    COURSE_STRUCTURE: "Course Structure",
    COURSE_STRATEGY: "Course Strategy",
    STORYBOARD: "Storyboard",
};

export const convertStageStringToLiteral = stage => stage.split(" ").join("_").toUpperCase();