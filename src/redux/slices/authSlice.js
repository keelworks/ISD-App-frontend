import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem('access_token') || null ,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			const token = action.payload.token;
			localStorage.setItem('access_token', token);
			state.token  = token;
		},
		userLoggedOut: (state) => {
			state.token = null;
			localStorage.removeItem('access_token');
		}
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectCurrentToken = state => state.auth.token;

export default authSlice.reducer;
