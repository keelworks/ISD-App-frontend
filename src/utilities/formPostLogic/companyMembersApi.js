// useAuthApi.js
import { useUpdateMembersMutation } from '../../redux/RTKQueries/membersCompanyQuery';

const useCompanyMembersApi = () => {
	const [updateMembers] = useUpdateMembersMutation();
	const abortController = new AbortController();

	const submitForm = async formData => {
		if (updateMembers) {
			const { data, error } = await updateMembers(formData, {
				signal: abortController.signal,
			});

			if (error) {
				throw error;
			}

			return data;
		}
		abortController.abort();
	};

	return { submitForm };
};

export default useCompanyMembersApi;
