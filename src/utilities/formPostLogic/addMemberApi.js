import { useAddMemberMutation } from "../../redux/RTKQueries/membersQuery";


const useAddMemberApi = () => {
	const [addMember] = useAddMemberMutation();
	const abortController = new AbortController();

	const inviteMember = async formData => {
		try {
			const { data, error } = await addMember(formData, {
				signal: abortController.signal,
			});
			if (error) {
				throw error;
			}

			if (data) {
				return data;
			}
		} finally {
			abortController.abort();
		}
	};

	return { inviteMember };
};

export default useAddMemberApi;
