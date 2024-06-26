import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const createCompanyApi = createApi({
	reducerPath: 'createCompanyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3093',
		prepareHeaders(headers) {
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		create: builder.mutation({
			query: companyData => ({
				url: '/create/company',
				method: 'POST',
				body: companyData,
			}),
		}),
	}),
});

// Standard naming convention rtk
export const { useCreateMutation } = createCompanyApi;
