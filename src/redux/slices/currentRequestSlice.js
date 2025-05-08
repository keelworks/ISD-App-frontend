import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const currentRequestSlice = createSlice({
	name: 'currentRequestSlice',
	initialState,
	reducers: {
        requestClicked: (state, action) => {
            state.request = action.payload;
        }
	},
});

export const {
	requestClicked,
} = currentRequestSlice.actions;

export default currentRequestSlice.reducer;

export const selectCurrentRequest = (state) => state.currentRequest.request;
// export const selectAllRequests = (state) => state.requests;
// export const selectRequestById = (state, requestId) => state.requests.find(request => request.requestId === requestId);
