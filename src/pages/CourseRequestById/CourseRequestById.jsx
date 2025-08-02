import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageWrapper from "../../utilities/pageWrapper/PageWrapper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NewCourseRequestFields from "../../utilities/reusableComponents/NewCourseRequestFields/NewCourseRequestFields";
import ROLES from "../../utilities/roles";
import { selectCurrentUserRoles } from "../../redux/slices/currentUserSlice";
import { doesTheCurrentUserHaveThisRole, MyInput } from "../../utilities/utils";
import { useGetRequestByIdQuery } from "../../redux/RTKQueries/requestsQuery";
import useUpdateRequestByIdApi from "../../utilities/formPostLogic/updateRequestByIdApi";
import { STATUSES } from "../../utilities/statuses";

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
const CourseRequestById = () => {
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
  const navigate = useNavigate();
  const currentUserRoles = useSelector(selectCurrentUserRoles);
  const { currentRequestId } = useParams();
  const {
    data: currentRequest,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRequestByIdQuery(currentRequestId);
  console.log(currentRequest);

  const { submitUpdatedRequest } = useUpdateRequestByIdApi();

  const onSubmit = async (data) => {
    try {
      const updatedRequest = {
        ...currentRequest,
        ...data,
        status: STATUSES.SUPERVISOR_REVIEW,
        updatedAt: new Date().toISOString(),
      };
      console.log(updatedRequest);
      const res = await submitUpdatedRequest(updatedRequest);

      navigate("/requests");
    } catch (error) {
      console.log(error);
    }
  };
  if (!doesTheCurrentUserHaveThisRole(currentUserRoles, ROLES.STAKEHOLDER)) {
    return (
      <PageWrapper>
        <div className="access-error-message">
          You are not allowed to perform this action!
        </div>
      </PageWrapper>
    );
  }

  if (isSuccess) {
    return (
      <PageWrapper>
        <main className="new-request-container">
          <div className="new-request-form-container">
            <form
              className="new-request-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <NewCourseRequestFields
                title="New Course Request Form (The request was rejected by ISD Supervisor with a comment)"
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                submitCount={submitCount}
                disabled={false}
                fieldValues={currentRequest}
              />
              <fieldset>
                <MyInput
                  name="comments"
                  type="input"
                  label="Comments"
                  disabled={false}
                  defaultValue={currentRequest.comments}
                  {...register("comments")}
                />
                <p className="error">{errors.comments?.message}</p>
              </fieldset>
              <div className="button-container new-request-button-container">
                <button className="button create-request" type="submit">
                  Update request
                </button>
                <Link to="/requests">
                  <button className="button cancel" type="button">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </PageWrapper>
    );
  }
};

export default CourseRequestById;
