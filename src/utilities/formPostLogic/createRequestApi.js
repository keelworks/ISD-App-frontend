// useAuthApi.js
import { useCreateRequestMutation } from "../../redux/RTKQueries/requestsQuery";


const statusAndStage = {
	status: 'supervisorReview',
	stage: 'newCourseRequest',
	assignedTo: "unassigned",
}

const useCreateRequestApi = () => {
	const [createRequest] = useCreateRequestMutation();
	const abortController = new AbortController();

	const submitForm = async formData => {
		const newRequest =  {...formData, ...statusAndStage};
		try {
			const { data, error } = await createRequest(newRequest, {
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

	return { submitForm };
};

export default useCreateRequestApi;
