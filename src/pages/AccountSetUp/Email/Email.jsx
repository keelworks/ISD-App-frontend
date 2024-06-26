import './Email.scss';
import { useForm } from 'react-hook-form';
import { MyInput } from '../../../utilities/utils';
import GoogleIcon from '../../../assets/icons/google.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../../redux/slices/companyCreateSlice';

const errorSchema = yup
	.object({
		email: yup.string().email().required('Enter email.'),
	})
	.required();

const Email = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(errorSchema) });

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitEmail = data => {
		console.log(data);
		dispatch(setEmail(data.email));
		navigate('/accountsetup/name_password');
	};

	return (
		<div className='form-container account-setup'>
			<form className='form' onSubmit={handleSubmit(submitEmail)}>
				<h3 className='form-title'>Welcome to Keelworks</h3>
				<h4 className='form-subtitle'>To get started please signin</h4>
				<fieldset>
					<MyInput
						name='email'
						type='input'
						label='Email'
						placeholder='name@company.com'
						{...register('email')}
					/>
					<p>{errors.email?.message}</p>
				</fieldset>
				<div className='button-container'>
					<button className='button signup'>Continue</button>
					<span>or</span>
					{/* backend for google auth needs to be implemented on the backend later */}
					<a href='/backend-route' className='button google-login'>
						<div>
							<img
								src={GoogleIcon}
								alt='Google Login'
								className='google-icon'
							/>
							<span>Sign in with Google</span>
						</div>
					</a>
				</div>
			</form>
		</div>
	);
};

export default Email;
