import React from "react";
import PropTypes from "prop-types";

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
