import "./NeedsAnalysisForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyInput, MyTextArea } from "../../../../utilities/utils";
import ShowMore from "../../showMore/showMore";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import { getStepName } from "./../../../steps";
import { useNavigate } from "react-router-dom";

const currentStep = "needsAnalysis";

const errorSchema = yup.object({}).required();

const NeedsAnalysisForm = ({ info }) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const navigate = useNavigate();

  const submitNeedsAnalysisForm = async (data) => {
    console.log(data);
    navigate("/isdflow/objective");
  };

  return (
    <form
      className="isd-flow-form"
      onSubmit={handleSubmit(submitNeedsAnalysisForm)}
    >
      <h3 className="form-title">{getStepName(currentStep)}</h3>
      <fieldset>
        <div className="field-title">Purpose</div>
        <div className="field-text">
          This document supports academic needs analysis (reduced) as well as
          organizational (expanded). You must understand the problem this course
          addresses. Organizational learning analysis are more involved
          <ShowMore
            text={[
              "because we have responsibility for return on investment (e.g., it increases revenue or reduces costs). We can know our audience in organizational learning because it addresses a finite audience. Academic learning, with some exceptions, is open to the universe of learners. If academic learning, the program is responsible for ensuring a reasonable basis for consumption, in organizational learning, the ISD must assess this. Either form of delivery can be affected by change issues.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="field-title">Quality Criteria</div>
        <div className="field-text">
          1. The problem is clearly stated and fully understood by the design
          team.
          <br />
          2. We have credible data confirming the extent of the problem (applies
          primarily to organizational).
          <ShowMore
            text={[
              "3. We have a reasonable basis to support potential for ROI in terms of consumption (numbers per - job description required to attend).",
              "4. We have a clear and measurable success statement.",
              "5. We document all issues uncovered relevant to potential for or risk to change.",
              "6. We document the stakeholder’s valuation of a 10% problem metric change.",
              "7. Our Go/no-go is justified by documented findings.",
            ]}
          />
        </div>
      </fieldset>
      <fieldset>
        {/* This input will be shown to the user. Since it's disabled, it's value won't be submitted */}
        <MyInput
          name="stakeholder"
          type="input"
          label="Stakeholder"
          defaultValue={info.stakeholder}
          disabled
        />
        {/* This input will be hidden from the user, but it's value will be submitted with the correct value. */}
        <input
          name="stakeholder"
          type="hidden"
          defaultValue={info.stakeholder}
          {...register("stakeholder")}
        />
      </fieldset>
      <fieldset>
        {/* This input will be shown to the user. Since it's disabled, it's value won't be submitted */}
        <MyInput
          name="problem_statement"
          type="input"
          label="Problem Statement"
          defaultValue={info.problemStatement}
          disabled
        />
        {/* This input will be hidden from the user, but it's value will be submitted with the correct value. */}
        <input
          name="problem_statement"
          type="hidden"
          defaultValue={info.problemStatement}
          {...register("problem_statement")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="problem_data"
          type="text"
          label="Problem Data"
          defaultValue={info.steps.needsAnalysis.problemData}
          {...register("problem_data")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="success_statement"
          type="input"
          label="Success Statement"
          defaultValue={info.steps.needsAnalysis.successStatement}
          {...register("success_statement")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_definition"
          label="Audience Definition"
          rows="4"
          placeholder="Enter audience definition..."
          defaultValue={info.steps.needsAnalysis.audienceDefinition}
          {...register("audience_definition")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_benefit"
          label="Audience Benefit"
          rows="4"
          placeholder="Enter audience benefit..."
          defaultValue={info.steps.needsAnalysis.audienceBenefit}
          {...register("audience_benefit")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_needs"
          label="Audience Needs"
          rows="4"
          placeholder="Enter audience needs..."
          defaultValue={info.steps.needsAnalysis.audienceNeeds}
          {...register("audience_needs")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="change_issues"
          type="input"
          label="Change Issues"
          defaultValue={info.steps.needsAnalysis.changeIssues}
          {...register("change_issues")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="technology_issues"
          type="input"
          label="Technology Issuess"
          defaultValue={info.steps.needsAnalysis.technologyIssues}
          {...register("technology_issues")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="proof_of_consumption"
          type="input"
          label="Proof of Consumption"
          defaultValue={info.steps.needsAnalysis.proofOfConsumption}
          {...register("proof_of_consumption")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="potential_for_change"
          type="input"
          label="Potential for Change"
          defaultValue={info.steps.needsAnalysis.potentialForChange}
          {...register("potential_for_change")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="delivery_strategy"
          type="input"
          label="Delivery Strategy"
          defaultValue={info.steps.needsAnalysis.deliveryStrategy}
          {...register("delivery_strategy")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="project_risks"
          type="input"
          label="Project Risks"
          defaultValue={info.steps.needsAnalysis.projectRisks}
          {...register("project_risks")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="recommendation"
          type="input"
          label="Recommendation"
          placeholder="Inventory management workflow breaking issue"
          defaultValue={info.steps.needsAnalysis.recommendation}
          {...register("recommendation")}
        />
      </fieldset>
      <SaveNextButtons />
    </form>
  );
};
export default NeedsAnalysisForm;
