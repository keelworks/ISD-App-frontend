import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const usersApi = createApi({
	reducerPath: 'usersApi',
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
		getUserDetails: builder.query({
			query: () => ({
				url: '/api/users',
				method: 'GET',
			}),
		}),
	}),
});

// Standard naming convention rtk
export const { useLazyGetUserDetailsQuery } = usersApi;
