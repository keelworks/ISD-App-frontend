import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const requestsApi = createApi({
	reducerPath: 'requestsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		prepareHeaders(headers) {
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		createRequest: builder.mutation({
			query: newRequest => ({
				url: '/api/requests',
				method: 'POST',
				body: newRequest,
			}),
			invalidatesTags: ['Request']
		}),
		getRequests: builder.query({
			query: () => ({
				url: '/api/requests',
				method: 'GET',
			}),
			providesTags: (result=[], error, arg) => [
				'Request',
				...result.map(({id}) => ({type: 'Request', id}))
			]
		}),
	}),
});

// Standard naming convention rtk
export const { useCreateRequestMutation, useGetRequestsQuery } = requestsApi;
