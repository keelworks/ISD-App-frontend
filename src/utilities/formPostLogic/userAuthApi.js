// useAuthApi.js
import {
	useSignupMutation,
	useSigninMutation,
} from '../../redux/RTKQueries/authQuery';

const useUserAuthApi = () => {
	const [signup] = useSignupMutation();
	const [signin] = useSigninMutation();
	const abortController = new AbortController();

	const submitForm = async (formType, formData) => {
		const api = formType === 'register' ? signup : signin;

		if (api) {
			const { data, error } = await api(formData, {
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

export default useUserAuthApi;
