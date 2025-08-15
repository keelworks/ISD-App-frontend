import React from "react";
import PropTypes from "prop-types";
import { setCurrentUserRoles } from "../redux/slices/currentUserSlice";

export const MyInput = React.forwardRef(
  ({ name, id, type, label, classNameForLabel, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name} className={classNameForLabel}>
          {label}
        </label>
        <input type={type} id={id ?? name} name={name} {...rest} ref={ref} />
      </div>
    );
  }
);

MyInput.displayName = "MyInput";

MyInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const MyInputWithDeleteIcon = React.forwardRef(
  ({ name, id, type, label, onClick, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name}>{label}</label>
        <input type={type} id={id ?? name} name={name} {...rest} ref={ref} />
        <button type="button" onClick={onClick}></button>
      </div>
    );
  }
);

export const MySelect = React.forwardRef(
  ({ name, id, label, options, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name}>{label}</label>
        <select
          className="role-selector"
          defaultValue={options[0].label}
          id={id ?? name}
          name={name}
          {...rest}
          ref={ref}
        >
          {options.map((option, index) => (
            <option
              key={option.value}
              value={option.label}
              disabled={index === 0 || option.value === "Select role"}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

MySelect.displayName = "MySelect";

MySelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const MyTextArea = React.forwardRef(
  ({ name, id, label, rows, labelClass, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name} className={labelClass}>
          {label}
        </label>
        <textarea id={id ?? name} name={name} rows={rows} {...rest} ref={ref} />
      </div>
    );
  }
);

MyTextArea.displayName = "MyTextArea";

MyTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const getObjectiveHeader = (length) => {
  return "# " + (length + 1) + " Enabling Objective";
};

export const addAuthTokenToHeader = (headers) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return headers.set("authorization", token);
  }
};

export const retrieveRoleFromGetUserInfoResponse = (response) => {
  const roles = [];
  const data = response.data;
  if (!data) {
    throw new Error("No such user.");
  }

  // Is the user a member of organization with a role?
  const role = data.Members?.[0]?.role;
  role && roles.push(role);

  // Is the user an admin of an organization?
  const adminRole = data.Organizations?.[0];
  adminRole && roles.push("Admin");

  return roles;
};

export const retrieveCompanyIfUserIsAdmin = (response) => {
  return response.data.Organizations[0].organization_id;
};

export const retrieveCompanyIdIfUserIsNotAdmin = (response) => {
  return response.data.Members[0].Organization.organization_id;
};

export const doesTheCurrentUserHaveThisRole = (roles, role) => {
  return roles?.includes(role);
};

// Used in TeamMembers functionality
export const transformMembersData = (members) => {
  return members.map((member) => ({
    id: member.member_id,
    name: member.User.name,
    status: false,
    role: member.role,
    email: member.User.email,
    userId: member.user_id,
  }));
};

// stop async functions for ms milliseconds
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// to mame sure the admin roles are up-to-date, retrieve them from backend and save in the store
export const retrieveAndSaveAdminRoles = async (fetchUserInfo, dispatch) => {
  const userInfo = await fetchUserInfo();
  const roles = retrieveRoleFromGetUserInfoResponse(userInfo);
  dispatch(setCurrentUserRoles({ roles: roles }));
};
