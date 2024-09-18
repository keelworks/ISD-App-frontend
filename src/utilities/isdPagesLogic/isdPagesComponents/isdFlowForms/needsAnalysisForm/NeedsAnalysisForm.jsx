import "./NeedsAnalysisForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyInput, MyTextArea } from "../../../../../utilities/utils";
import ShowMore from "../../showMore/showMore";
import SaveNextButtons from "../../saveNextButtons/SaveNextButtons";
import { getStepName } from "./../../../../steps";
import { useNavigate } from "react-router-dom";
import {
  useISDFlowDispatch,
  useISDFlowRequest,
} from "../../../isdFlowContext/IsdFlowContext";

const currentStep = "needsAnalysis";

const errorSchema = yup.object({}).required();

const NeedsAnalysisForm = () => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const navigate = useNavigate();
  const request = useISDFlowRequest();
  const dispatch = useISDFlowDispatch();

  const submitNeedsAnalysisForm = (data) => {
    dispatch({ type: "next_step", step: currentStep, data: data });
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
        <MyInput
          name="stakeholder"
          type="input"
          label="Stakeholder"
          defaultValue={request.stakeholder}
          disabled
        />
      </fieldset>
      <fieldset disabled>
        <MyInput
          name="problem_statement"
          type="input"
          label="Problem Statement"
          defaultValue={request.problemStatement}
          disabled
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="problem_data"
          type="text"
          label="Problem Data"
          defaultValue={request.steps.needsAnalysis.problemData ?? ""}
          {...register("problemData")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="success_statement"
          type="input"
          label="Success Statement"
          defaultValue={request.steps.needsAnalysis.successStatement ?? ""}
          {...register("successStatement")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_definition"
          label="Audience Definition"
          rows="4"
          placeholder="Enter audience definition..."
          defaultValue={request.steps.needsAnalysis.audienceDefinition ?? ""}
          {...register("audienceDefinition")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_benefit"
          label="Audience Benefit"
          rows="4"
          placeholder="Enter audience benefit..."
          defaultValue={request.steps.needsAnalysis.audienceBenefit ?? ""}
          {...register("audienceBenefit")}
        />
      </fieldset>
      <fieldset>
        <MyTextArea
          name="audience_needs"
          label="Audience Needs"
          rows="4"
          placeholder="Enter audience needs..."
          defaultValue={request.steps.needsAnalysis.audienceNeeds ?? ""}
          {...register("audienceNeeds")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="change_issues"
          type="input"
          label="Change Issues"
          defaultValue={request.steps.needsAnalysis.changeIssues ?? ""}
          {...register("changeIssues")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="technology_issues"
          type="input"
          label="Technology Issuess"
          defaultValue={request.steps.needsAnalysis.technologyIssues ?? ""}
          {...register("technologyIssues")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="proof_of_consumption"
          type="input"
          label="Proof of Consumption"
          defaultValue={request.steps.needsAnalysis.proofOfConsumption ?? ""}
          {...register("proofOfConsumption")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="potential_for_change"
          type="input"
          label="Potential for Change"
          defaultValue={request.steps.needsAnalysis.potentialForChange ?? ""}
          {...register("potentialForChange")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="delivery_strategy"
          type="input"
          label="Delivery Strategy"
          defaultValue={request.steps.needsAnalysis.deliveryStrategy ?? ""}
          {...register("deliveryStrategy")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="project_risks"
          type="input"
          label="Project Risks"
          defaultValue={request.steps.needsAnalysis.projectRisks ?? ""}
          {...register("projectRisks")}
        />
      </fieldset>
      <fieldset>
        <MyInput
          name="recommendation"
          type="input"
          label="Recommendation"
          placeholder="Inventory management workflow breaking issue"
          defaultValue={request.steps.needsAnalysis.recommendation ?? ""}
          {...register("recommendation")}
        />
      </fieldset>
      <SaveNextButtons />
    </form>
  );
};
export default NeedsAnalysisForm;
