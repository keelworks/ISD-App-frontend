import { logOut } from '../../redux/slices/authSlice';
import './CancelButton.scss';
import { useDispatch } from 'react-redux';

const CancelButton = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logOut());
	};

	return (
		<>
			<button onClick={handleLogout} className='btn-blue'>
				Sign Out
			</button>
		</>
	);
};

export default CancelButton;
