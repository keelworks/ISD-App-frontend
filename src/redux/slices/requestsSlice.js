import { createSlice } from '@reduxjs/toolkit';
import { STAGES } from '../../utilities/stages';
import { STATUSES } from '../../utilities/statuses';

const newRequest = {
	requestName: '',
	status: STATUSES.SUPERVISOR_REVIEW,
	stage: STAGES.NEW_COURSE_REQUEST,
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
	},
});

export const {
	requestCreated,
} = requestsSlice.actions;

export default requestsSlice.reducer;

export const selectAllRequests = (state) => state.requests;
export const selectRequestById = (state, requestId) => state.requests.find(request => request.requestId === requestId);
