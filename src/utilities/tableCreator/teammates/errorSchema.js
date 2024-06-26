import * as yup from 'yup';

const errorSchema = yup
	.object({
		name: yup
			.string()
			.required('Enter your first and last name.')
			.matches(
				/^[a-zA-Z]+\s[a-zA-Z]+$/,
				'Enter both first and last name',
			),
		email: yup.string().email().required('Enter email.'),
		status: yup.string().status().required('Enter status.'),
		role: yup.string().role().required('Enter role.'),
	})
	.required();

export default errorSchema;
