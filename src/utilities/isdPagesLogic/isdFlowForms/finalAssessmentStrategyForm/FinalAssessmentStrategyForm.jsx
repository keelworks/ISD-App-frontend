import "./FinalAssessmentStrategyForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { MyInput, getObjectiveHeader } from "./../../../utils";
import { getStepName } from "./../../../steps";
import { Navigate, useNavigate } from "react-router-dom";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import ShowMore from "../../showMore/showMore";

const currentStep = "finalAssessmentStrategy";

const errorSchema = yup.object({}).required();

const FinalAssessmentStrategyForm = ({ info }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(errorSchema),
  });

  const objectives = info.steps.objective.enablingObjectives.map(
    (objective, index) => {
      const fas = info.steps.finalAssessmentStrategy[index];
      if (fas === undefined) {
        return {
          value: objective,
          measurementStrategy: "",
          successCriteria: "",
        };
      }

      let measurementStrategy = fas.measurementStrategy
        ? fas.measurementStrategy
        : "";
      let successCriteria = fas.successCriteria ? fas.successCriteria : "";
      return {
        value: objective,
        measurementStrategy: measurementStrategy,
        successCriteria: successCriteria,
      };
    }
  );

  const navigate = useNavigate();

  const submitFinalAssessmentStrategyForm = async (data) => {
    console.log(data);
    navigate("/isdflow/course_structure");
  };

  return (
    <form
      className="isd-flow-form"
      onSubmit={handleSubmit(submitFinalAssessmentStrategyForm)}
    >
      <h3 className="form-title">{getStepName(currentStep)}</h3>
      <fieldset>
        <div className="field-title">Purpose</div>
        <div className="field-text">
          1. Assess objectives for measurability and clarity.
          <br />
          2. Clarify what needs to be address to meet these objectives.
          <br />
          3. Confirm that with these objectives, the terminal objective will be
          met.
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. The test strategy will confirm the enabling objective.
          <br />
          2. The test strategy can be implemented within our learning model.
          <br />
          3. The success criteria is measurable.
          <ShowMore
            text={[
              "4. The performance criteria enables objective, rather than subjective measurement.",
              "5. The performance criteria confirms the enabling objective.",
              "6. The assessment is intellectually engaging.",
              "7. The assessment successfully measures depth of understanding.",
              "8. The assessment tests the learner’s ability to perform.",
              "9. The assessment focuses on fact retention only when such fact retention is essential.",
            ]}
          />
        </div>
      </fieldset>
      {objectives.map((objective, index) => (
        <section className="enabling_objective">
          <fieldset className="add-extra-margin">
            <MyInput
              name={(index + 1).toString()}
              type="input"
              defaultValue={objective.value}
              label={getObjectiveHeader(index)}
              classNameForLabel="title"
              {...register((index + 1).toString())}
            />
          </fieldset>
          <fieldset className="add-extra-margin">
            <MyInput
              name="measurementStrategy"
              type="input"
              defaultValue={objective.measurementStrategy}
              label="Measurement strategy"
              {...register(`measurement_strategy_${index + 1}`)}
            />
          </fieldset>
          <fieldset>
            <MyInput
              name="successCriteria"
              type="input"
              defaultValue={objective.successCriteria}
              label="Success criteria"
              {...register(`success_criteria_${index + 1}`)}
            />
          </fieldset>
        </section>
      ))}
      <section></section>

      <SaveNextButtons />
    </form>
  );
};

export default FinalAssessmentStrategyForm;
