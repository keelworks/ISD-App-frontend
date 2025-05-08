import { useUpdateRequestByIdMutation } from "../../redux/RTKQueries/requestsQuery";

const useUpdateRequestByIdApi = () => {
	const [updateRequest] = useUpdateRequestByIdMutation();
	const abortController = new AbortController();

	const submitUpdatedRequest = async updatedRequest => {
		try {
			const { data, error } = await updateRequest(updatedRequest, {
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

	return { submitUpdatedRequest };
};

export default useUpdateRequestByIdApi;
