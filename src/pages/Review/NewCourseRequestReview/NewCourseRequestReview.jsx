import "./NewCourseRequestReview.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageWrapper from "../../../utilities/pageWrapper/PageWrapper";
import BackButton from "../../../utilities/reusableComponents/BackButton/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectCurrentUserRoles } from "../../../redux/slices/currentUserSlice";
import { useSelector } from "react-redux";
import ROLES from "../../../utilities/roles";
import NewCourseRequestFields from "../../../utilities/reusableComponents/NewCourseRequestFields/NewCourseRequestFields";
import RequestStatus from "../../../utilities/requestStatus/RequestStatus";
import DateFormatter from "../../../utilities/DateFormatter";
import SearchPeopleField from "../../../utilities/searchField/searchPeopleField/SearchPeopleField";
import {
  doesTheCurrentUserHaveThisRole,
  MyInput,
} from "../../../utilities/utils";
import { STATUSES } from "../../../utilities/statuses";
import { STAGES } from "../../../utilities/stages";
import { useGetRequestByIdQuery } from "../../../redux/RTKQueries/requestsQuery";
import useUpdateRequestByIdApi from "../../../utilities/formPostLogic/updateRequestByIdApi";

const errorSchema = yup
  .object({
    assignTo: yup.array().min(1, "Select one email"),
  })
  .required();

const NewCourseRequestReview = () => {
  const currentUserRoles = useSelector(selectCurrentUserRoles);
  const navigate = useNavigate();
  const { currentRequestId } = useParams();
  const { submitUpdatedRequest } = useUpdateRequestByIdApi();

  const {
    data: currentRequest,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRequestByIdQuery(currentRequestId);

  const {
    handleSubmit,
    getValues,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, submitCount },
  } = useForm({
    resolver: yupResolver(errorSchema),
  });

  if (!doesTheCurrentUserHaveThisRole(currentUserRoles, ROLES.ISD_SUPERVISOR)) {
    return (
      <PageWrapper>
        <div className="access-error-message">
          You are not allowed to perform this action!
        </div>
      </PageWrapper>
    );
  }

  const handleBackButtonClick = () => {
    navigate("/requests");
  };

  const handleCommentsOnInput = (e) => {
    if (e.target.value === "") {
      setError("comments", {
        type: "custom",
        message: "A comment is required",
      });
    } else {
      clearErrors("comments");
    }
  };

  const onRejectSubmit = async () => {
    try {
      const data = getValues();
      clearErrors("assignTo");

      // validate comments
      if (data.comments === "") {
        setError("comments", {
          type: "custom",
          message: "You should reject with a comment.",
        });
      } else {
        clearErrors("comments");
      }

      const updatedRequest = {
        ...currentRequest,
        status: STATUSES.STAKEHOLDER_REVIEW,
        updatedAt: new Date().toISOString(),
        comments: data.comments,
      };

      console.log(updatedRequest);

      const res = await submitUpdatedRequest(updatedRequest);
      navigate("/requests");
    } catch (error) {
      console.log(error);
    }
  };

  const onAssignSubmit = async (data) => {
    try {
      const updatedRequest = {
        ...currentRequest,
        status: STATUSES.IN_PROGRESS,
        stage: STAGES.NEEDS_ANALYSIS,
        updatedAt: new Date().toISOString(),
        assignedTo: data.assignTo[0],
      };

      console.log(updatedRequest);

      const res = await submitUpdatedRequest(updatedRequest);
      navigate("/requests");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    // return displayInfoMessage(width, "Loading...");
  } else if (isSuccess) {
    console.log(currentRequest);
    return (
      <PageWrapper>
        <div className="new-course-request-review-wrapper">
          <div className="new-course-request-review-container">
            <BackButton handleBackButtonClick={handleBackButtonClick} />
            <div className="title-status-container">
              <div className="title-container">
                <h1 className="title">{currentRequest.requestName}</h1>
                <div className="date-created-container">
                  <div className="date-created-header">Date created</div>
                  <div className="date-created">
                    {DateFormatter(currentRequest.createdAt)}
                  </div>
                </div>
              </div>
              <div className="new-course-request-review-status">
                <RequestStatus status={currentRequest.status} />
              </div>
            </div>
            <main className="new-request-container">
              <form
                className="new-request-form new-request-form-review"
                onSubmit={handleSubmit(onAssignSubmit)}
              >
                <div className="new-request-form-container new-request-form-review-fields">
                  <NewCourseRequestFields
                    title="Course Request Details"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    submitCount={submitCount}
                    disabled={true}
                    fieldValues={currentRequest}
                    review={true}
                  />
                  <fieldset>
                    <MyInput
                      name="comments"
                      type="input"
                      label="Comments"
                      disabled={false}
                      defaultValue={currentRequest.comments}
                      onInput={(e) => {
                        handleCommentsOnInput(e);
                      }}
                      {...register("comments")}
                    />
                    <p className="error">{errors.comments?.message}</p>
                  </fieldset>
                  <div className="button-container">
                    <button
                      className="button reject"
                      type="button"
                      onClick={onRejectSubmit}
                    >
                      Reject
                    </button>
                    <button className="button assign" type="submit">
                      Assign
                    </button>
                  </div>
                </div>

                <div className="assign-to-form">
                  <div className="new-request-form-container">
                    <header>
                      <h3 className="title">Assign to</h3>
                    </header>
                    <fieldset>
                      <SearchPeopleField
                        name="assign_to"
                        register={register}
                        setValue={setValue}
                        setError={setError}
                        clearErrors={clearErrors}
                        submitCount={submitCount}
                        allowOnlyOneToSelect={true}
                        // onChange={(e) => handleAssignToOnInput(e)}
                      />
                      <p className="error">{errors.assignTo?.message}</p>
                    </fieldset>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </PageWrapper>
    );
  }
};

export default NewCourseRequestReview;
