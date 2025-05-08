import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	role: localStorage.getItem('currentUserRole') || null,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUserRole: (state, action) => {
			const currentUserRole = action.payload.role;
			localStorage.setItem('currentUserRole', currentUserRole);
			state.role = currentUserRole;
		},
		removeCurrentUserRole: (state) => {
			localStorage.removeItem('currentUserRole');
			state.role = null;
		},
	},
});

export const { setCurrentUserRole, removeCurrentUserRole} = currentUserSlice.actions;

export const selectCurrentUserRole = state => state.currentUser.role;

export default currentUserSlice.reducer;
