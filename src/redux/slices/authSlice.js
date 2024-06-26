import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	auth: false,
};

//Boolean state for auth, set by backend response to verifying JWT.

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logOut: state => {
			state.auth = null;
		},
		logIn: state => {
			state.auth = true;
		},
	},
});

export const { logOut, logIn } = authSlice.actions;

export default authSlice.reducer;
