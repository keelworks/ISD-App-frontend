import "./CompanyName.scss";
import { useForm } from "react-hook-form";
import { MyInput } from "../../../utilities/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useCreateCompanyApi from "../../../utilities/formPostLogic/createCompanyApi";
import { useState } from "react";
import { useLazyGetUserDetailsQuery } from "../../../redux/RTKQueries/usersQuery";
import { useDispatch } from "react-redux";
import {
  setCurrentCompanyId,
  setCurrentUserRoles,
} from "../../../redux/slices/currentUserSlice";
import { useLazyGetCompaniesTheUserIsAdminOfQuery } from "../../../redux/RTKQueries/companyQuery";

const errorSchema = yup
  .object({
    name: yup.string().required("Enter your company name."),
  })
  .required();

const userIsAnAdmin = (userInfo) => userInfo.data.Organizations.length > 0;

const CompanyName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(errorSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { submitForm } = useCreateCompanyApi();
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const [fetchUserInfo] = useLazyGetUserDetailsQuery();
  const [fetchCompanyId] = useLazyGetCompaniesTheUserIsAdminOfQuery();
  const submitCompanyName = async (data) => {
    try {
      const userInfo = await fetchUserInfo();
      if (userIsAnAdmin(userInfo)) {
        throw new Error(
          "One user cannot be the admin of multiple organizations!"
        );
      }

      const result = await submitForm(data);

      // Current user is an admin now
      dispatch(setCurrentUserRoles({ roles: ["Admin"] }));

      // Save current company id
      const companyInfo = await fetchCompanyId();
      dispatch(
        setCurrentCompanyId({ companyId: companyInfo.data.organization_id })
      );

      navigate("/accountsetup/users");
    } catch (error) {
      let errorMessage =
        error?.data?.message || error?.data?.error || error?.message || "";
      setShowErrorMessage(errorMessage);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="form-container account-setup">
      <form className="form" onSubmit={handleSubmit(submitCompanyName)}>
        <h3 className="form-title">Welcome to Keelworks</h3>
        <h4 className="form-subtitle">Let’s set up your ISD workspace</h4>
        <fieldset>
          <MyInput
            name="company_name"
            type="input"
            label="Company Name"
            placeholder="Company Name"
            {...register("name")}
          />
          <p>{errors.company_name?.message}</p>
        </fieldset>
        {showErrorMessage && (
          <p className="error-message">
            The company wasn't created: {showErrorMessage}
          </p>
        )}
        <div className="button-container">
          <button className="button signup">Next</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyName;
