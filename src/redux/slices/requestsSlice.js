import { createSlice, prepareAutoBatched } from '@reduxjs/toolkit';

const newRequest = {
	requestName: '',
	status: 'supervisorReview',
	stage: 'newCourseRequest',
	assignedTo: 'John Doe',
	stakeholder: '',
	sme: '',
	problemStatement: '',
	problemData: '',
	valueOfChange: '',
	peopleRequiredToAttend: '',
	priorityUrgency: '',
}

const initialState = [];

//Boolean state for auth, set by backend response to verifying JWT.

const requestsSlice = createSlice({
	name: 'requestsSlice',
	initialState,
	reducers: {
		requestCreated: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(payload) {
				return {
					payload: {requestId: Date.now(), lastUpdated: Date.now(), ...newRequest, ...payload}
				}
			}
		},
		// logOut: state => {
		// 	state.auth = null;
		// },
		// logIn: state => {
		// 	state.auth = true;
		// },
	},
});

// export const { logOut, logIn } = authSlice.actions;

export const {
	requestCreated,
} = requestsSlice.actions;

export default requestsSlice.reducer;

export const selectAllRequests = (state) => state.requests;
export const selectRequestById = (state, requestId) => state.requests.find(request => request.requestId === requestId);
