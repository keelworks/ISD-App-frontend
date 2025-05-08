import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./CourseRequest.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestCreated } from "../../redux/slices/requestsSlice";
import PageWrapper from "../../utilities/pageWrapper/PageWrapper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateRequestApi from "../../utilities/formPostLogic/createRequestApi";
import SearchPeopleField from "../../utilities/searchField/searchPeopleField/SearchPeopleField";
import CancelConfirmationPopup from "../../utilities/isdPagesLogic/isdPagesComponents/popups/cancelConfirmationPopup/CancelConfirmationPopup";
import NewCourseRequestFields from "../../utilities/reusableComponents/NewCourseRequestFields/NewCourseRequestFields";
import { useLazyGetUserDetailsQuery } from "../../redux/RTKQueries/usersQuery";

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
  const [fetchOrganizationId] = useLazyGetUserDetailsQuery();

  const onSubmit = async (data) => {
    try {
      const response = await fetchOrganizationId();
      const organizationId =
        response.data[0].Members[0].Organization.organization_id;
      const dataToSubmit = { organizationId: organizationId, ...data };
      dispatch(requestCreated(dataToSubmit));
      const res = await submitForm(dataToSubmit);

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
            <NewCourseRequestFields
              title="New Course Request Form"
              register={register}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              submitCount={submitCount}
              disabled={false}
            />
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
