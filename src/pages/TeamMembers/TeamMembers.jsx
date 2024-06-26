import { useState } from 'react';
import useUserAuthApi from '../../utilities/formPostLogic/userAuthApi';
import './TeamMembers.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Table from '../../utilities/tableCreator/teammates/Table';
import { useEffect } from 'react';

const TeamMembers = () => {
	const navigate = useNavigate();

	//Make api call here and set to setMembers instead of using dummy data.

	const [members, setMembers] = useState([
		{
			id: 1,
			name: 'Jake Jill',
			status: true,
			role: 'Stakeholder',
			email: 'da@da.com',
		},
		{
			id: 2,
			name: 'Justin Trudeau',
			status: true,
			role: 'Stakeholder',
			email: 'da33@d33a.com',
		},
		{
			id: 3,
			name: 'Bill Hader',
			status: false,
			role: 'Product Manager',
			email: 'Bill@Bill.com',
		},
		{
			id: 4,
			name: 'Sammy Sosa',
			status: true,
			role: 'ISD',
			email: 'Sammy@Sammy.com',
		},
		{
			id: 5,
			name: 'Steve Irwin',
			status: false,
			role: 'Product Manager',
			email: 'Steve@Steve.com',
		},
	]);

	useEffect(() => {
		console.log(members);
	}, [members]);

	return (
		<main className='table-main'>
			<div className='table-container'>
				<div className='members'>
					<div className='table-header-container'>
						<div>Team members</div>
						<div className='user-count'>{members.length} users</div>
					</div>
					{members && (
						<Table tableData={members} setMembers={setMembers} />
					)}
				</div>
			</div>
		</main>
	);
};

export default TeamMembers;
