import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	fullname: '',
	password: null,
	companyName: null,
	users: [],
};

const companyCreateSlice = createSlice({
	name: 'companyCreateSlice',
	initialState,
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setName: (state, action) => {
			state.fullname = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setUserData: (state, action) => {
			const { name, password } = action.payload;
			state.fullname = name;
			state.password = password;
		},
		setCompanyName: (state, action) => {
			state.companyName = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		clearStatus: () => {
			return initialState;
		},
	},
});

export const {
	setEmail,
	setName,
	setPassword,
	setCompanyName,
	setUsers,
	setUserData,
} = companyCreateSlice.actions;

export default companyCreateSlice.reducer;
