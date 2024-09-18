import "./CourseStructureForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { MyInput, MyInputWithDeleteIcon } from "../../../utils";
import { Input } from "antd";
import { getStepName } from "../../../steps";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import ShowMore from "../../showMore/showMore";

const currentStep = "courseStructure";

const errorSchema = yup.object({}).required();

const submitCourseStructureForm = async (data) => {
  console.log(data);
};

const CourseStructureForm = ({ info }) => {
  const { register, unregister, handleSubmit } = useForm({
    resolver: yupResolver(errorSchema),
  });

  const [modules, setModules] = useState(info.steps.courseStructure);

  const addModule = () => {
    setModules([
      ...modules,
      { moduleNumber: modules.length + 1, title: "", lessons: [] },
    ]);
  };

  const addLesson = (index) => {
    const updatedModules = [...modules];
    updatedModules[index].lessons = [...updatedModules[index].lessons, ""];
    setModules(updatedModules);
  };

  const removeLastLesson = (index) => {
    const currentModule = modules[index];
    unregister(
      `${currentModule.moduleNumber}.lessons.${
        currentModule.lessons.length - 1
      }`
    );
    const updatedModules = [...modules];
    updatedModules[index].lessons = [
      ...updatedModules[index].lessons.slice(
        0,
        updatedModules[index].lessons.length - 1
      ),
    ];
    setModules(updatedModules);
  };

  const removeLastModule = () => {
    if (modules.length > 0) {
      const lastModule = modules[modules.length - 1];
      unregister(`${lastModule.moduleNumber}.title`);
      lastModule.lessons.forEach((lesson, i) => {
        unregister(`${lastModule.moduleNumber}.lessons.${i}`);
      });
      setModules([...modules.slice(0, modules.length - 1)]);
    }
  };

  return (
    <form
      className="isd-flow-form"
      onSubmit={handleSubmit(submitCourseStructureForm)}
    >
      <h3 className="form-title">{getStepName(currentStep)}</h3>
      <fieldset>
        <div className="field-title">Purpose</div>
        <div className="field-text">
          At this milestone, you’ll determine module focus and list lessons to
          be addressed under each. You will also see a table for listing types
          of concepts and for identifying opportunity to link between concepts.
          <ShowMore
            text={[
              "Contrary to a common misconception, modules do not automatically map to objectives. Sometimes one module will serve two objectives. Sometimes one objective will be addressed at every module, for example, a safety objective for a course on how to operate a lawn mower is addressed at modules for fueling, starting, clearing clippings, and maintenance.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. The structure supports enabling objectives.
          <br />
          2. Detail is preceded by larger concepts.
          <br />
          3. Concept chunking supports optimal cognitive load.
          <ShowMore
            text={[
              "4. No more than seven concepts to module.",
              "5.  No more than five modules in a course.",
              "6. Focus is retained.",
              "7. Course title supports the terminal objective.",
              "8. Modules support to course title.",
              "9. Concepts support to module title (or focus).",
              "10. Structure serves an order consistent with efficient learning (e.g., introduct shoe before addressing laces).",
              "11. The document does not address content or learning strategy.",
              "12. Like concepts are identified and Like Concepts table.",
              "13. Concept linking opportunity is identified by module/lesson in the Linking Table.",
            ]}
          />
        </div>
      </fieldset>
      {modules.map((module, index) => (
        <section className="module" key={`module#${index}`}>
          <h3 className="form-title add-extra-margin">
            {"Module " + module.moduleNumber}
          </h3>
          <fieldset className="add-extra-margin">
            <MyInput
              name={`${module.moduleNumber}.title`}
              type="input"
              defaultValue={module.title}
              label={"Title"}
              {...register(`${module.moduleNumber}.title`)}
            />
          </fieldset>
          {module.lessons.map((lesson, i) => (
            <fieldset className="add-extra-margin" key={`lesson#${i}`}>
              {i < module.lessons.length - 1 && (
                <MyInput
                  name={`${module.moduleNumber}.lessons.${i}`}
                  type="input"
                  defaultValue={lesson}
                  label={"Lesson " + (i + 1)}
                  {...register(`${module.moduleNumber}.lessons.${i}`)}
                />
              )}
              {i === module.lessons.length - 1 && (
                <MyInputWithDeleteIcon
                  name={`${module.moduleNumber}.lessons.${i}`}
                  type="input"
                  defaultValue={lesson}
                  label={"Lesson " + (i + 1)}
                  onClick={() => removeLastLesson(index)}
                  {...register(`${module.moduleNumber}.lessons.${i}`)}
                />
              )}
            </fieldset>
          ))}

          <fieldset>
            <button
              type="button"
              onClick={() => addLesson(index)}
              className="add-button add-lesson"
            >
              + Add Lesson
            </button>
          </fieldset>
        </section>
      ))}
      <fieldset>
        <button
          type="button"
          onClick={addModule}
          className="add-button add-module"
        >
          + Add Module
        </button>
        {modules.length > 0 && (
          <button
            type="button"
            onClick={removeLastModule}
            className="add-button remove-module"
          >
            - Remove Last Module
          </button>
        )}
      </fieldset>

      <SaveNextButtons />
    </form>
  );
};
export default CourseStructureForm;
