import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	roles: localStorage.getItem('currentUserRoles') || null,
	currentCompanyId: localStorage.getItem('currentCompanyId') || null,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUserRoles: (state, action) => {
			const currentUserRoles = action.payload.roles;
			localStorage.setItem('currentUserRoles', currentUserRoles);
			state.roles = currentUserRoles;
		},
		removeCurrentUserRoles: (state) => {
			localStorage.removeItem('currentUserRoles');
			state.roles = null;
		},
		setCurrentCompanyId: (state, action) => {
			const companyId = action.payload.companyId;
			localStorage.setItem('currentCompanyId', companyId);
			state.currentCompanyId = companyId;
		},
		removeCurrentCompanyId: (state) => {
			localStorage.removeItem('currentCompanyId');
			state.currentCompanyId = null;
		}
	},
});

export const { setCurrentUserRoles, removeCurrentUserRoles, setCurrentCompanyId, removeCurrentCompanyId} = currentUserSlice.actions;

export const selectCurrentUserRoles = state => state.currentUser.roles;
export const selectCurrentCompanyId = state => state.currentUser.currentCompanyId;

export default currentUserSlice.reducer;
