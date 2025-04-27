import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		prepareHeaders(headers) {
			addAuthTokenToHeader(headers);
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		signup: builder.mutation({
			query: userInfo => ({
				url: '/api/auth/register',
				method: 'POST',
				body: userInfo,
			}),
		}),
		signin: builder.mutation({
			query: userInfo => ({
				url: '/api/auth/login',
				method: 'POST',
				body: userInfo,
			}),
		}),
		// signout: builder.query({
		// 	query: () => ({
		// 		url: '/signout',
		// 		method: 'GET',
		// 	}),
		// }),
	}),
});

// Standard naming convention rtk
export const {
	useSignupMutation,
	useSigninMutation,
	// useSignoutQuery,
} = authApi;
