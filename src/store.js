import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import companyReducer from './redux/slices/companyCreateSlice';
import requestsReducer from './redux/slices/requestsSlice';
import { authApi } from './redux/RTKQueries/authQuery';
import { createCompanyApi } from './redux/RTKQueries/createCompanyQuery';

import { setupListeners } from '@reduxjs/toolkit/query';
import { membersCompanyApi } from './redux/RTKQueries/membersCompanyQuery';
import { requestsApi } from './redux/RTKQueries/requestsQuery';

const store = configureStore({
	reducer: {
		auth: authReducer,
		companyReducer,
		requests: requestsReducer,
		[authApi.reducerPath]: authApi.reducer,
		[createCompanyApi.reducerPath]: createCompanyApi.reducer,
		[membersCompanyApi.reducerPath]: membersCompanyApi.reducer,
		[requestsApi.reducerPath]: requestsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			createCompanyApi.middleware,
			membersCompanyApi.middleware,
			requestsApi.middleware,
		),
});

setupListeners(store.dispatch);

export default store;
