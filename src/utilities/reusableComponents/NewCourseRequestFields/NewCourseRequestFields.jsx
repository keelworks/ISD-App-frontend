import "./NewCourseRequestFields.scss";
import SearchPeopleField from "../../searchField/searchPeopleField/SearchPeopleField";
import { MyInput } from "../../utils";

const NewCourseRequestFields = ({
  title,
  register,
  errors,
  setValue,
  setError,
  clearErrors,
  submitCount,
  disabled,
  fieldValues = {},
  review = false,
}) => {
  return (
    <>
      <header>
        <h3 className="title">{title}</h3>
        <p className="description">
          This document supports academic needs analysis(reduced) as well as
          organizational (expanded). You must understand the problem this course
          addresses. Organizational learning analysis are more involved.
        </p>
      </header>

      <fieldset disabled={disabled}>
        <MyInput
          name="request_name"
          type="input"
          label="Request Name"
          defaultValue={fieldValues.requestName}
          {...register("requestName")}
        />
        <p className="error">{errors.requestName?.message}</p>
      </fieldset>

      <fieldset disabled={disabled}>
        <MyInput
          name="stakeholder"
          type="input"
          label="Stakeholder"
          placeholder="Email address"
          defaultValue={fieldValues.stakeholderEmail}
          {...register("stakeholderEmail")}
        />
        <p className="error">{errors.stakeholderEmail?.message}</p>
      </fieldset>

      <fieldset disabled={disabled}>
        <MyInput
          name="sme"
          type="input"
          label="SME"
          placeholder="Email address"
          defaultValue={fieldValues.sme}
          {...register("sme")}
        />
        <p className="error">{errors.sme?.message}</p>
      </fieldset>

      <fieldset disabled={disabled}>
        <MyInput
          name="problem_statement"
          type="input"
          label="Problem Statement"
          defaultValue={fieldValues.problemStatement}
          {...register("problemStatement")}
        />
        <p className="error">{errors.problemStatement?.message}</p>
      </fieldset>

      <fieldset disabled={disabled}>
        <MyInput
          name="problem_data"
          type="input"
          label="Problem Data"
          defaultValue={fieldValues.problemData}
          {...register("problemData")}
        />
        <p className="error">{errors.problemData?.message}</p>
      </fieldset>

      <fieldset disabled={disabled}>
        <MyInput
          name="value_of_change"
          type="input"
          label="Value Of Change ?"
          defaultValue={fieldValues.valueOfChange}
          {...register("valueOfChange")}
        />
        <p className="error">{errors.valueOfChange?.message}</p>
      </fieldset>

      {review ? (
        <fieldset disabled>
          <MyInput
            name="people_required_to_attend"
            type="input"
            label="People required to attend"
            defaultValue={fieldValues.peopleRequiredToAttend.join(", ")}
            {...register("peopleRequiredToAttend")}
          />
        </fieldset>
      ) : (
        <fieldset>
          <SearchPeopleField
            name="people_required_to_attend"
            label="People required to attend"
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            submitCount={submitCount}
            peopleRequiredToAttend={fieldValues.peopleRequiredToAttend}
          />
          <p className="error">{errors.peopleRequiredToAttend?.message}</p>
        </fieldset>
      )}

      <fieldset disabled={disabled}>
        <MyInput
          name="priority_urgency"
          type="input"
          label="Priority / Urgency"
          defaultValue={fieldValues.priority}
          {...register("priority")}
        />
        <p className="error">{errors.priority?.message}</p>
      </fieldset>
    </>
  );
};

export default NewCourseRequestFields;
