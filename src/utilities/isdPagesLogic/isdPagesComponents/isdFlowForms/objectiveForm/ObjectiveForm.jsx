import "./ObjectiveForm.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MyInput,
  MyInputWithDeleteIcon,
  getObjectiveHeader,
} from "./../../../../utils";
import React, { useState } from "react";
import * as yup from "yup";
import ShowMore from "../../showMore/showMore";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import { useNavigate } from "react-router-dom";
import { STEPS } from "./../../../../steps";
import {
  useISDFlowDispatch,
  useISDFlowRequest,
} from "../../../isdFlowContext/IsdFlowContext";

const currentStep = STEPS.OBJECTIVE;

const errorSchema = yup.object({}).required();

const ObjectiveForm = () => {
  const { register, handleSubmit, unregister } = useForm({
    resolver: yupResolver(errorSchema),
  });

  const request = useISDFlowRequest();
  const dispatch = useISDFlowDispatch();
  const navigate = useNavigate();

  const [objectives, setObjectives] = useState(
    request.steps.objective.enablingObjectives ?? []
  );

  const submitObjectiveForm = async (data) => {
    console.log(data);
    dispatch({ type: "next_step", step: currentStep, data: data });
    navigate("/isdflow/final_assessment_strategy");
  };

  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const deleteLastObjective = () => {
    unregister(`enablingObjectives.${objectives.length - 1}`);
    setObjectives(objectives.slice(0, objectives.length - 1));
  };

  return (
    <form
      className="isd-flow-form"
      onSubmit={handleSubmit(submitObjectiveForm)}
    >
      <h3 className="form-title">{currentStep}</h3>
      <fieldset>
        <div className="field-title">Purpose</div>
        <div className="field-text">
          Objectives define the learning scope. Without these, the course has no
          focus. While some learners find objectives helpful, most simply ignore
          them. They can succeed without objectives, but designers cannot.
          <ShowMore
            text={[
              "We write objectives to support course design, not to support learning - though many organizations insist on including these for learners, some feel this inclusion only teaches learners to skim content.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. The terminal objective, if met, resolves the problem (every course
          solves a problem). <br />
          2. Enabling objectives must be measurable within the learning
          environment (e.g., don’t be too quick to discount measurability).
          <ShowMore
            text={[
              "3. Objectives are singular (e.g., assess or design, not assess and design).",
              "4. Objectives support only one difinitive interpretation - never more than one (e.g., objectives like “Do it the right way” fail this criterion)",
              "5. Enabling objectives are limited to five or fewer per course.",
              "6. Meeting the enabling objectives ensures terminal objective achievement.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        <MyInput
          name="terminal_objective"
          type="input"
          label="Terminal Objective"
          defaultValue={request.steps.objective.terminalObjective ?? ""}
          {...register("terminalObjective")}
        />
      </fieldset>
      {objectives.map((objective, index) => (
        <fieldset key={index}>
          {index < objectives.length - 1 && (
            <MyInput
              name={getObjectiveHeader(index)}
              type="input"
              defaultValue={objective}
              label={getObjectiveHeader(index)}
              {...register(`enablingObjectives.${index}`)}
            />
          )}
          {index === objectives.length - 1 && (
            <MyInputWithDeleteIcon
              name={getObjectiveHeader(index)}
              type="input"
              defaultValue={objective}
              label={getObjectiveHeader(index)}
              onClick={() => deleteLastObjective()}
              {...register(`enablingObjectives.${index}`)}
            />
          )}
        </fieldset>
      ))}
      <fieldset>
        <button type="button" onClick={addObjective} className="add-button">
          + Add Enabling Objective
        </button>
      </fieldset>
      <SaveNextButtons />
    </form>
  );
};

export default ObjectiveForm;
