import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import * as PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyInput, MyTextArea } from "../../../utilities/utils.jsx";
import React, { useState } from "react";
import * as yup from "yup";
import ShowMore from "../../../utilities/showMore/showMore";

const errorSchema = yup.object({}).required();

const submitObjectiveForm = async (data) => {
  console.log(data);
};

const ObjectiveForm = ({ currentStep }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const [objectives, setObjectives] = useState([
    { objective: "objective#1", value: "" },
  ]);
  const addObjectives = () => {
    let newObject = "objective" + "#" + (objectives.length + 1);
    setObjectives([...objectives, { objective: newObject, value: "" }]);
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
          {...register("terminal_objective")}
        />
      </fieldset>
      {objectives.map((item, index) => (
        <fieldset>
          <MyInput
            name={item.objective}
            type="input"
            value={item.value}
            label={item.objective}
            {...register(item.objective)}
          />
        </fieldset>
      ))}
      <label
        onClick={addObjectives}
        style={{
          cursor: "pointer",
          color: "#0774c3",
        }}
      >
        + Add Enabling Objective
      </label>
      <div className="button-container">
        <button className="button next">Next</button>
        <button className="button back">Back</button>
      </div>
    </form>
  );
};

ObjectiveForm.propTypes = { currentStep: PropTypes.string };
const Objective = () => {
  const currentStep = "Objective";

  return (
    <ISDFlowPage currentStep={currentStep}>
      <ObjectiveForm currentStep={currentStep} />
    </ISDFlowPage>
  );
};
export default Objective;
