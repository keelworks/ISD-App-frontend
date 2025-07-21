import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./CourseRequest.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestCreated } from "../../redux/slices/requestsSlice";
import PageWrapper from "../../utilities/pageWrapper/PageWrapper";
import { MyInput } from "../../utilities/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateRequestApi from "../../utilities/formPostLogic/createRequestApi";
import SearchPeopleField from "../../utilities/searchField/searchPeopleField/SearchPeopleField";
import CancelConfirmationPopup from "../../utilities/isdPagesLogic/isdPagesComponents/popups/cancelConfirmationPopup/CancelConfirmationPopup";

const errorSchema = yup
  .object({
    requestName: yup.string().required("Enter request name."),
    stakeholderEmail: yup.string().email().required("Enter stakeholder email."),
    sme: yup.string().email().required("Enter sme email."),
    problemStatement: yup.string().required("Enter problem statement."),
    problemData: yup.string().required("Enter problem data."),
    valueOfChange: yup.string().required("Enter value of change."),
    peopleRequiredToAttend: yup.array().min(1, "Select at least one email"),
    priority: yup.string().required("Enter priority / urgency."),
  })
  .required();
const CourseRequest = () => {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, submitCount },
  } = useForm({
    resolver: yupResolver(errorSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitForm, form } = useCreateRequestApi();
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const onSubmit = async (data) => {
    try {
      dispatch(requestCreated(data));
      const res = await submitForm(data);

      navigate("/requests");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrapper>
      <main className="new-request-container">
        <div className="new-request-form-container">
          <form className="new-request-form" onSubmit={handleSubmit(onSubmit)}>
            <header>
              <h3 className="title">New Course Request Form</h3>
              <p className="description">
                This document supports academic needs analysis(reduced) as well
                as organizational (expanded). You must understand the problem
                this course addresses. Organizational learning analysis are more
                involved.
              </p>
            </header>

            <fieldset>
              <MyInput
                name="request_name"
                type="input"
                label="Request Name"
                {...register("requestName")}
              />
              <p className="error">{errors.requestName?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="stakeholder"
                type="input"
                label="Stakeholder"
                placeholder="Email address"
                {...register("stakeholderEmail")}
              />
              <p className="error">{errors.stakeholderEmail?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="sme"
                type="input"
                label="SME"
                placeholder="Email address"
                {...register("sme")}
              />
              <p className="error">{errors.sme?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="problem_statement"
                type="input"
                label="Problem Statement"
                {...register("problemStatement")}
              />
              <p className="error">{errors.problemStatement?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="problem_data"
                type="input"
                label="Problem Data"
                {...register("problemData")}
              />
              <p className="error">{errors.problemData?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="value_of_change"
                type="input"
                label="Value Of Change ?"
                {...register("valueOfChange")}
              />
              <p className="error">{errors.valueOfChange?.message}</p>
            </fieldset>

            <fieldset>
              <SearchPeopleField
                name="people_required_to_attend"
                label="People required to attend"
                register={register}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                submitCount={submitCount}
              />
              <p className="error">{errors.peopleRequiredToAttend?.message}</p>
            </fieldset>

            <fieldset>
              <MyInput
                name="priority_urgency"
                type="input"
                label="Priority / Urgency"
                {...register("priority")}
              />
              <p className="error">{errors.priority?.message}</p>
            </fieldset>

            <div className="button-container new-request-button-container">
              <button className="button create-request" type="submit">
                Create request
              </button>
              <button 
                className="button cancel" 
                type="button"
                onClick={() => setShowCancelPopup(true)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
      <CancelConfirmationPopup 
        isVisible={showCancelPopup}
        onClose={() => setShowCancelPopup(false)}
        redirectPath="/requests"
      />
    </PageWrapper>
  );
};

export default CourseRequest;
