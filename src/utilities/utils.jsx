import React from "react";
import PropTypes from "prop-types";

export const MyInput = React.forwardRef(
  ({ name, id, type, label, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name}>{label}</label>
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
  ({ name, id, label, rows, ...rest }, ref) => {
    return (
      <div className="form-input">
        <label htmlFor={id ?? name}>{label}</label>
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
