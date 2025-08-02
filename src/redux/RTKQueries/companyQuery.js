import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const companyApi = createApi({
	reducerPath: 'companyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api/organizations',
		prepareHeaders(headers) {
			addAuthTokenToHeader(headers);
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		createCompany: builder.mutation({
			query: companyName => ({
				url: '/createOrg',
				method: 'POST',
				body: companyName,
			}),
		}),
		getCompaniesTheUserIsAdminOf: builder.query({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
			transformResponse: (response, meta, arg) => response[0],
		}),
	}),
});

// Standard naming convention rtk
export const { useCreateCompanyMutation, useGetCompaniesTheUserIsAdminOfQuery, useLazyGetCompaniesTheUserIsAdminOfQuery } = companyApi;
