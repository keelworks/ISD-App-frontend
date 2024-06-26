import './NamePassword.scss';
import { useForm } from 'react-hook-form';
import { MyInput } from '../../../utilities/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/slices/companyCreateSlice';

const errorSchema = yup
	.object({
		name: yup
			.string()
			.matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, 'Enter both first and last name')
			.required('Enter your first and last name.'),
		password: yup
			.string()
			.required('No password provided.')
			.matches(
				/[A-Za-z0-9]/,
				'Password can only contain Latin Letters and numbers.',
			)
			.min(8, 'Password is too short - should be at least 8 chracters.'),
	})
	.required();

const NamePassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(errorSchema) });
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitNameAndPassword = data => {
		dispatch(setUserData(data));
		navigate('/accountsetup/company_name');
	};

	return (
		<div className='form-container account-setup'>
			<form
				className='form'
				onSubmit={handleSubmit(submitNameAndPassword)}>
				<h3 className='form-title'>Welcome to Keelworks</h3>
				<h4 className='form-subtitle'>To get started please signin</h4>
				<fieldset>
					<MyInput
						name='name'
						type='input'
						label='Full Name'
						placeholder='Varun Dinesh'
						{...register('name')}
					/>
					<p>{errors.name?.message}</p>
				</fieldset>
				<fieldset>
					<MyInput
						name='password'
						type='password'
						label='Password'
						placeholder='*****'
						{...register('password')}
					/>
					<p>{errors.password?.message}</p>
				</fieldset>
				<div className='button-container'>
					<button className='button signup'>Next</button>
				</div>
			</form>
		</div>
	);
};

export default NamePassword;
