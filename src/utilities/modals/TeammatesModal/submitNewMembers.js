import { delay, retrieveAndSaveAdminRoles } from "../../utils";

const submitNewMembers = async (dataToSubmit, inviteMember, setSuccessMessages, setErrorMessages, fetchUserInfo, dispatch) => {
    // Submit each member
    const promises = dataToSubmit.map(
        async (member) => await inviteMember(member)
      );
      const results = await Promise.allSettled(promises);

      // Set info and error messages
      const successMsgs = [];
      const errorMsgs = [];
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          successMsgs.push(result.value.message);
        }
        if (result.status === "rejected") {
          errorMsgs.push(result.reason.data.error);
        }
      });
      setSuccessMessages(successMsgs);
      setErrorMessages(errorMsgs);

      // Update roles for Admin
      await retrieveAndSaveAdminRoles(fetchUserInfo, dispatch);

      await delay(3000);

}

export default submitNewMembers;