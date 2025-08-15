import "./Users.scss";
import React, { useState } from "react";
import { Flex, Form, Input, Select } from "antd";
import ROLES from "../../../utilities/roles";
import useAddMemberApi from "../../../utilities/formPostLogic/addMemberApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCompanyId } from "../../../redux/slices/currentUserSlice";
import { useLazyGetUserDetailsQuery } from "../../../redux/RTKQueries/usersQuery";
import submitNewMembers from "../../../utilities/modals/TeammatesModal/submitNewMembers";

const AccountSetUpUsers = () => {
  const options = [
    { value: ROLES.ISD_SUPERVISOR, label: ROLES.ISD_SUPERVISOR },
    { value: ROLES.PROJECT_MANAGER, label: ROLES.PROJECT_MANAGER },
    { value: ROLES.STAKEHOLDER, label: ROLES.STAKEHOLDER },
    { value: ROLES.SME, label: ROLES.SME },
    { value: ROLES.ISD, label: ROLES.ISD },
    { value: ROLES.QA, label: ROLES.QA },
    { value: ROLES.SUPPORT_STAFF, label: ROLES.SUPPORT_STAFF },
  ];
  const { inviteMember } = useAddMemberApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const organizationId = useSelector(selectCurrentCompanyId);
  const [fetchUserInfo] = useLazyGetUserDetailsQuery();
  const [successMessages, setSuccessMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendInvitations = async (data) => {
    setIsSubmitting(true);

    // Add organizationId to our data
    const dataToSubmit = data.map((member) => ({
      organizationId: organizationId,
      ...member,
    }));

    try {
      await submitNewMembers(
        dataToSubmit,
        inviteMember,
        setSuccessMessages,
        setErrorMessages,
        fetchUserInfo,
        dispatch
      );
      // // Submit each member
      // const promises = dataToSubmit.map(
      //   async (member) => await inviteMember(member)
      // );
      // const results = await Promise.allSettled(promises);

      // // Set info and error messages
      // const successMsgs = [];
      // const errorMsgs = [];
      // results.forEach((result) => {
      //   if (result.status === "fulfilled") {
      //     successMsgs.push(result.value.message);
      //   }
      //   if (result.status === "rejected") {
      //     errorMsgs.push(result.reason.data.error);
      //   }
      // });
      // setSuccessMessages(successMsgs);
      // setErrorMessages(errorMsgs);

      // // Update roles for Admin
      // const userInfo = await fetchUserInfo();
      // const roles = retrieveRoleFromGetUserInfoResponse(userInfo);
      // dispatch(setCurrentUserRoles({ roles: roles }));

      // await delay(4000);

      navigate("/members");
    } catch (error) {
      setErrorMessages([...errorMessages, error.data.error]);
    }
    setIsSubmitting(false);
  };

  const [invitations, setInvitations] = useState([
    { newMemberEmail: "", role: "" },
  ]);

  const handleInputChange = (value, index, field) => {
    const newInvitations = [...invitations];
    newInvitations[index][field] = value;
    setInvitations(newInvitations);
  };

  const addTeammates = () => {
    setInvitations([...invitations, { newMemberEmail: "", role: "" }]);
  };
  const removeTeammates = () => {
    if (invitations.length > 1) {
      setInvitations([...invitations.slice(0, invitations.length - 1)]);
    }
  };
  const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <div className="form-container account-setup">
      <Form
        className={"form invitation-input"}
        layout="vertical"
        onFinish={() => sendInvitations(invitations)}
        size={"large"}
        name={"invitationsList"}
      >
        <h3 className="form-title">Instructional Design Workspace</h3>
        <h4 className="form-subtitle">
          Let’s invite the users and assign roles
        </h4>
        {invitations.map((item, index) => (
          <Flex key={index} gap={"middle"}>
            <div className="email-role-container">
              <Form.Item
                label="Email"
                name={`newMemberEmail${index}`}
                rules={[
                  {
                    required: true,
                    message: "Please input email",
                  },
                  {
                    validator(rule, value) {
                      return new Promise((resolve, reject) => {
                        if (
                          value === undefined ||
                          value.length === 0 ||
                          email.test(value)
                        ) {
                          resolve();
                        } else {
                          reject("Input should be a valid email");
                        }
                      });
                    },
                  },
                ]}
              >
                <Input
                  placeholder="input email"
                  value={item.email}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "newMemberEmail")
                  }
                />
              </Form.Item>
              <Form.Item
                label="Role"
                name={`role${index}`}
                rules={[
                  {
                    required: true,
                    message: "Please select a role",
                  },
                ]}
              >
                <Select
                  className="select"
                  options={options}
                  placeholder={"Select Role"}
                  value={item.role}
                  onChange={(value) => handleInputChange(value, index, "role")}
                />
              </Form.Item>
            </div>
          </Flex>
        ))}
        <Flex
          style={{ width: "100%" }}
          align={"center"}
          justify={"space-between"}
        >
          <button
            className="add-teammates-button"
            onClick={addTeammates}
            disabled={isSubmitting}
            type="button"
          >
            + Add teammates
          </button>
          <button
            className="remove-teammates-button"
            onClick={removeTeammates}
            style={{
              cursor: invitations.length > 1 ? "pointer" : "not-allowed",
              color: invitations.length > 1 ? "red" : "gray",
            }}
            disabled={isSubmitting}
            type="button"
          >
            -Remove teammates
          </button>
        </Flex>
        {successMessages && (
          <div className="success-message-teammates">
            {successMessages.map((message, i) => (
              <div key={i}>{message}</div>
            ))}
          </div>
        )}
        {errorMessages && (
          <div className="error-message-teammates">
            {errorMessages.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
        <div className="button-container">
          <button
            type="submit"
            className="button signup"
            disabled={isSubmitting}
          >
            Invite all
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AccountSetUpUsers;
