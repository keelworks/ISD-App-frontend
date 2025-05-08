import "./CourseStrategyDocumentForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { STEPS } from "../../../../steps";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import ShowMore from "../../showMore/showMore";
import { useNavigate } from "react-router-dom";
import { useISDFlowRequest } from "../../../isdFlowContext/IsdFlowContext";
import TitlePopup from "../../popups/titlePopup/TitlePopup";
import LessonPopup from "../../popups/lessonPopup/LessonPopup";

const currentStep = STEPS.COURSE_STRATEGY_DOCUMENT;

const errorSchema = yup.object({}).required();

// how the info will look like for course strategy document:
// item = {
//   type: "title",
//   moduleNumber: 1,
//   moduleTitle: "some title",
//   description: "my description",
//   elements: [],
//   lessons: [
//     {
//       type: "lesson",
//       moduleNumber: 1,
//       lessonName: "my lesson name",
//       header: "some lesson header",
//       desiredOutcome: "some lesson outcome",
//       elements: [],
//     },
//     {
//       type: "lesson",
//       moduleNumber: 1,
//       lessonName: "second lesson name",
// .     lessonNumber: 1,
//       header: "second lesson header",
//       desiredOutcome: "second lesson outcome",
//       elements: [],
//     },
//   ],
// };

const CourseStrategyDocumentForm = () => {
  const { register, unregister, getValues, handleSubmit } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const request = useISDFlowRequest();

  const prevStepModules = request.steps.courseStructure; //info from prev steps
  const csd = request.steps.courseStrategyDocument; // previously saved course Strtegy Document data
  /* construct the data to display: we need to merge the data from
   previously saved courseStratedyDocument with any changes that were 
   made to the modules/lessons on previous steps */
  const mergedModules = prevStepModules.map((module, index) => {
    const csdModule = csd === undefined ? undefined : csd[index];
    const lessons = module.lessons.map((lesson, i) => {
      // header, desiredOutcome, elements are taken from strategy
      // document if the lesson name is the same. Otherwise, these
      // values become default values.
      let header = "";
      let desiredOutcome = "";
      let elements = [];
      if (
        csd !== undefined &&
        csdModule !== undefined &&
        csdModule.lessons !== undefined &&
        csdModule.lessons[i] !== undefined &&
        module.title === csdModule.moduleTitle &&
        lesson === csdModule.lessons[i].lessonName
      ) {
        if (csdModule.lessons[i].header !== undefined) {
          header = csdModule.lessons[i].header;
        }
        if (csdModule.lessons[i].desiredOutcome !== undefined) {
          desiredOutcome = csdModule.lessons[i].desiredOutcome;
        }
        if (csdModule.lessons[i].elements !== undefined) {
          elements = csdModule.lessons[i].elements;
        }
      }
      return {
        type: "lesson",
        lessonName: lesson,
        lessonNumber: i,
        header: header,
        desiredOutcome: desiredOutcome,
        elements: elements,
      };
    });
    // If the module has a new title, it will be considered as a new module.
    // All the added elements will be set to default.
    let moduleTitle = module.title;
    let moduleDescription = "";
    let moduleElements = [];
    if (
      csd !== undefined &&
      csdModule !== undefined &&
      module.title === csdModule.moduleTitle
    ) {
      if (csdModule.description !== undefined) {
        moduleDescription = csdModule.description;
      }
      if (csdModule.elements !== undefined) {
        moduleElements = csdModule.elements;
      }
    }

    return {
      type: "title",
      moduleTitle: moduleTitle,
      description: moduleDescription,
      elements: moduleElements,
      lessons: lessons,
    };
  });

  const [modules, setModules] = useState(mergedModules);
  const [itemForPopup, setItemForPopup] = useState(null);

  //   const navigate = useNavigate();
  const submitCourseStrategyDocumentForm = async (data) => {
    console.log(data);
    // navigate("/isdflow/course_strategy_document");
  };

  const onPlusButtonClick = (module, type, moduleNumber, lessonNumber) => {
    setItemForPopup({
      module: module,
      type: type,
      moduleNumber: moduleNumber,
      lessonNumber: lessonNumber,
    });
  };

  return (
    <form
      className="isd-flow-form"
      onSubmit={handleSubmit(submitCourseStrategyDocumentForm)}
    >
      <h3 className="form-title">{currentStep}</h3>
      <fieldset>
        <div className="field-title">Purpose</div>
        <div className="field-text">
          This process step helps designers remain consistent with an overall
          course vision. It is the only place in the process where you will
          define your desired outcome (not just knowledge). Strategy for each
          <ShowMore
            text={[
              "lesson begins with an aha: the desired outcome in the learner for this lesson (change requires more than new facts). For each lesson you will identify the components needed to reach the desired outcome (aha!). For each lesson component, you will define what that item needs to do to support the aha. You will offer attributes that the design might feature such as intellectual engagement or images that truly support the concepts). You will also point out what can go wrong (e.g., exceed specified scope). This document provides guidance to the designer (even if that designer is you), because we tend to lose the big picture vision when we are designing “in the weeds.” We do not specify actual content, but rather limit this information to parameters. We note where one concept needs to reiterate a prior concept. We remind about relevant quality criteria, especially where an aspect is critical to the aha.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. Each lesson begins with a clear and complete statement envisioning
          the desired outcome in learners (knowledge, ability, AND frame of
          mind).
          <br />
          2. Reminds storyboarder of concept scope limits.
          <br />
          3. Reminds storyboarder of consistency requirements (e.g., similar
          tasks, such as definitions should be designed similarly).
          <ShowMore
            text={[
              "4. Informs storyboarder on the role that each component plays in “aha” achievement.",
              "5. Explains how one component interacts with another component within the lesson.",
              "6. Is clear enough to support a single interpretation (no room for debate on meaning).",
              "7. Does not specify script or teaching wording (or even summarize teaching), scenario story or technology, images, videos, or the method applied to meet the learning challenge.",
              "8. Adequately prepares the storyboarder for effective lesson/course design.",
            ]}
          />
        </div>
      </fieldset>
      {modules.map((module, index) => (
        <section className="csd-section" key={`module#${index}`}>
          <h2 className="form-title">
            {`Module ${index + 1} : ${module.moduleTitle}`}
          </h2>
          <fieldset className="module-item">
            {`Title: ${module.moduleTitle}`}
            <button
              type="button"
              onClick={() => onPlusButtonClick(module, "title", index)}
            ></button>
          </fieldset>
          {module.lessons.map((lesson, i) => (
            <fieldset className="module-item" key={`lesson#${i}`}>
              {`Lesson ${i + 1}: ${lesson.lessonName}`}
              <button
                type="button"
                onClick={() => onPlusButtonClick(module, "lesson", index, i)}
              ></button>
            </fieldset>
          ))}
        </section>
      ))}
      {itemForPopup !== null && itemForPopup.type === "title" && (
        <TitlePopup
          item={itemForPopup}
          onAdd={() => {
            const updatedModules = modules.map((item, index) => {
              const updatedItem = { ...item };
              updatedItem.description = getValues(`${index}.description`)
                ? getValues(`${index}.description`)
                : "";

              updatedItem.elements = getValues(`${index}.elements`)
                ? getValues(`${index}.elements`).map((element) => {
                    const key = Object.keys(element)[0];
                    return {
                      type: key,
                      guidance: element[key],
                    };
                  })
                : [];
              return updatedItem;
            });
            setModules(updatedModules);
            setItemForPopup(null);
          }}
          onDiscard={() => {
            setItemForPopup(null);
          }}
          register={register}
          unregister={unregister}
        />
      )}
      {itemForPopup !== null && itemForPopup.type === "lesson" && (
        <LessonPopup
          item={itemForPopup}
          onAdd={() => {
            const updatedModules = modules.map((module, index) => {
              if (index === itemForPopup.moduleNumber) {
                const updatedModule = { ...module };
                let updatedLesson =
                  updatedModule.lessons[itemForPopup.lessonNumber];
                const header = getValues(
                  `${index}.lessons.${itemForPopup.lessonNumber}.header`
                );
                const desiredOutcome = getValues(
                  `${index}.lessons.${itemForPopup.lessonNumber}.desiredOutcome`
                );
                const elements = getValues(
                  `${index}.lessons.${itemForPopup.lessonNumber}.elements`
                );
                updatedLesson.header = header ? header : "";
                updatedLesson.desiredOutcome = desiredOutcome
                  ? desiredOutcome
                  : "";
                updatedLesson.elements = elements
                  ? elements.map((element) => {
                      const key = Object.keys(element)[0];
                      return {
                        type: key,
                        guidance: element[key],
                      };
                    })
                  : [];
                return updatedModule;
              } else {
                return module;
              }
            });
            setModules(updatedModules);
            setItemForPopup(null);
          }}
          onDiscard={() => {
            setItemForPopup(null);
          }}
          register={register}
          unregister={unregister}
        />
      )}
      <SaveNextButtons />
    </form>
  );
};
export default CourseStrategyDocumentForm;
