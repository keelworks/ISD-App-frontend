import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import companyReducer from './redux/slices/companyCreateSlice';
import requestsReducer from './redux/slices/requestsSlice';
import currentRequestReducer from './redux/slices/currentRequestSlice';
import currentUserReducer from './redux/slices/currentUserSlice';
import { authApi } from './redux/RTKQueries/authQuery';

import { setupListeners } from '@reduxjs/toolkit/query';
import { requestsApi } from './redux/RTKQueries/requestsQuery';
import { usersApi } from './redux/RTKQueries/usersQuery';
import { companyApi } from './redux/RTKQueries/companyQuery';
import { membersApi } from './redux/RTKQueries/membersQuery';
import authInterceptor from './redux/middleware/authInterceptor';

const store = configureStore({
	reducer: {
		auth: authReducer,
		companyReducer,
		requests: requestsReducer,
		currentRequest: currentRequestReducer,
		currentUser: currentUserReducer,
		[authApi.reducerPath]: authApi.reducer,
		[requestsApi.reducerPath]: requestsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[companyApi.reducerPath]: companyApi.reducer,
		[membersApi.reducerPath]: membersApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			requestsApi.middleware,
			usersApi.middleware,
			companyApi.middleware,
			membersApi.middleware,
			authInterceptor,
		),
});

setupListeners(store.dispatch);

export default store;
