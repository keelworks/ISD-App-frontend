import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { MyInput } from "./../../../utils";
import { getStepName } from "./../../../steps";
import { Navigate, useNavigate } from "react-router-dom";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";

const currentStep = "finalAssessmentStrategy";

const errorSchema = yup.object({}).required();

const FinalAssessmentStrategyForm = ({ info }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(errorSchema),
  });

  const [objectives, setObjectives] = useState([
    { objective: "objective#1", value: "" },
  ]);

  const navigate = useNavigate();

  const addObjectives = () => {
    let newObject = "objective" + "#" + (objectives.length + 1);
    setObjectives([...objectives, { objective: newObject, value: "" }]);
  };

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
          This document supports academic needs analysis (reduced) as well as
          organizational (expanded). You must understand the problem this course
          addresses. Organizational learning analysis are more involved{" "}
          <span>show more</span>.
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. The problem is clearly stated and fully understood by the design
          team.
          <br />
          2. We have credible data confirming the extent of the problem (applies
          primarily to organizational) <span>show more</span>.
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
      <SaveNextButtons />
    </form>
  );
};

export default FinalAssessmentStrategyForm;
