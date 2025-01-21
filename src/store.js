import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import companyReducer from './redux/slices/companyCreateSlice';
import requestsReducer from './redux/slices/requestsSlice';
import { authApi } from './redux/RTKQueries/authQuery';
import { createCompanyApi } from './redux/RTKQueries/createCompanyQuery';

import { setupListeners } from '@reduxjs/toolkit/query';
import { membersCompanyApi } from './redux/RTKQueries/membersCompanyQuery';

const store = configureStore({
	reducer: {
		authReducer,
		companyReducer,
		requests: requestsReducer,
		[authApi.reducerPath]: authApi.reducer,
		[createCompanyApi.reducerPath]: createCompanyApi.reducer,
		[membersCompanyApi.reducerPath]: membersCompanyApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			createCompanyApi.middleware,
			membersCompanyApi.middleware,
		),
});

setupListeners(store.dispatch);

export default store;
