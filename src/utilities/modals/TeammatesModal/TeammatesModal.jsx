import Modal from "react-modal";
import "./TeammatesModal.scss";
import { useForm } from "react-hook-form";
import { MyInput, MySelect } from "../../utils";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Delete from "../../../assets/icons/trash.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import formDataFormatter from "./formDataFormatter";
import options from "../../../pages/TeamMembers/options";
import useAddMemberApi from "../../formPostLogic/addMemberApi";
import { useSelector } from "react-redux";
import { selectCurrentCompanyId } from "../../../redux/slices/currentUserSlice";

const customStyles = {
  content: {
    display: "flex",
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    background: "var(--White, #fff)",
    border: "1px solid var(--Gray-200, #eaecf0)",
    boxShadow:
      "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
    overflowY: "auto",
    overflow: "hidden",
    maxHeight: "80vh",
    width: "100%",
    margin: "6.813rem auto 0",
    maxWidth: "76rem",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.6)" },
};

Modal.setAppElement("#root");

const generateValidationSchema = (objectKeys) => {
  const objectSchema = {};
  objectKeys.forEach((key) => {
    objectSchema[`${key}_name`] = yup
      .string()
      .required("Enter your first and last name.")
      .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Enter both first and last name");
    objectSchema[`${key}_email`] = yup
      .string()
      .email("Enter a valid email address.")
      .required("Enter email.");

    objectSchema[`${key}_role`] = yup
      .mixed()
      .test(
        "is-role-selected",
        "Select role.",
        (value) => value !== "Select role"
      )
      .required("Select role.");
  });

  return yup.object(objectSchema).required();
};

const TeammatesModal = ({ isModalOpen, setIsModalOpen, setMembers, data }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [addCount, setAddCount] = useState([
    { name: "", email: "", role: "", id: uuidv4() },
  ]);
  const { inviteMember } = useAddMemberApi();
  const organizationId = useSelector(selectCurrentCompanyId);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Form helpers
  const objectKeys = addCount.map((item) => item.id);
  const errorSchema = generateValidationSchema(objectKeys);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(errorSchema) });

  const submitAddMember = async (data) => {
    const formattedData = formDataFormatter(data);
    const dataToSubmit = formattedData.map((member) => ({
      organizationId: organizationId,
      role: member.role,
      newMemberEmail: member.email,
    }));

    //! Updating local state we need to add api post call to update data later
    try {
      // Clearing success message if still shown
      setShowSuccessMessage(false);
      setSubmitError(false);

      // Submit each member
      const promises = dataToSubmit.map(
        async (member) => await inviteMember(member)
      );
      const results = await Promise.all(promises);

      setShowSuccessMessage(true);
      setIsModalOpen(false);
    } catch (error) {
      setSubmitError(true);
    }
    reset();
  };

  const addTeammates = (e) => {
    e.stopPropagation();
    setAddCount([...addCount, { email: "", role: "", id: uuidv4() }]);
  };

  const removeTeammates = (e, item) => {
    e.stopPropagation();

    const memberId = item.id;

    if (addCount.length > 1) {
      unregister([`${item.id}_name`, `${item.id}_email`, `${item.id}_role`]);

      setAddCount((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    }
  };

  useEffect(() => {
    console.log(errors, "errors");
  }, [errors]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Teammates Modal"
      >
        <div className="formBox">
          <h3 className="team-form-title">Team Members</h3>
          <h4 className="team-form-subtitle">
            Let’s add team members and assign roles
          </h4>
          <form className="team-form" onSubmit={handleSubmit(submitAddMember)}>
            {addCount.map((item, index) => {
              return (
                <div key={item.id} className="add-single-member">
                  <fieldset>
                    <MyInput
                      name={`${item.id}.name`}
                      label=""
                      type="input"
                      placeholder="Name"
                      {...register(`${item.id}_name`)}
                    />
                    <p>{errors[`${item.id}_name`]?.message}</p>
                  </fieldset>
                  <fieldset>
                    <MyInput
                      name={`${item.id}.email`}
                      label=""
                      type="input"
                      placeholder="name@company.com"
                      {...register(`${item.id}_email`)}
                    />
                    <p>{errors[`${item.id}_email`]?.message}</p>
                  </fieldset>
                  <fieldset>
                    <MySelect
                      name={`${item.id}_role`}
                      label=""
                      options={options}
                      {...register(`${item.id}_role`)}
                    />
                    <p>{errors[`${item.id}_role`]?.message}</p>
                  </fieldset>

                  <fieldset>
                    <div className="form-input remove-box">
                      <label
                        onClick={(e) => removeTeammates(e, item)}
                        className="remove-teammates"
                      >
                        <img
                          src={Delete}
                          alt="Delete"
                          style={{
                            cursor:
                              addCount.length > 1 ? "pointer" : "not-allowed",
                          }}
                        />
                      </label>
                    </div>
                  </fieldset>
                </div>
              );
            })}

            <div
              style={{ width: "100%" }}
              align={"center"}
              justify={"space-between"}
            >
              <label
                onClick={(e) => addTeammates(e)}
                style={{
                  cursor: "pointer",
                  color: "#0774c3",
                }}
              >
                + Add teammates
              </label>
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="button team-add"
                disabled={isSubmitting}
              >
                Invite all
              </button>
            </div>
          </form>
          {/* Can replace later for default loading and submission success messages */}
          {isSubmitting && <div className="loading-message">Loading...</div>}
          {submitError && (
            <p className="error-message">
              There was an error adding teammates.
            </p>
          )}
          {showSuccessMessage && (
            <p className="success-message">Teammates have been added!</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TeammatesModal;
