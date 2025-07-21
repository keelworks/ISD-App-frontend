// useAuthApi.js
import { useCreateCompanyMutation } from '../../redux/RTKQueries/companyQuery';

const useCreateCompanyApi = () => {
	const [createCompany] = useCreateCompanyMutation();
	const abortController = new AbortController();

	const submitForm = async formData => {
		try {
			const { data, error } = await createCompany(formData, {
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

export default useCreateCompanyApi;
