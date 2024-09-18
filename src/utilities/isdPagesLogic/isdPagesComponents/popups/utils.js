export const generateRegisterName = (element, parent, index) => {
    if (parent.type === "title") {
      return `${parent.moduleNumber}.elements.${index}.${element.type}`;
    }
    if (parent.type === "lesson") {
      return `${parent.moduleNumber}.lessons.${parent.lessonNumber}.elements.${index}.${element.type}`;
    }
  };