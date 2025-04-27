import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const membersCompanyApi = createApi({
	reducerPath: 'membersCompanyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3093',
		prepareHeaders(headers) {
			addAuthTokenToHeader(headers);
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		updateMembers: builder.mutation({
			query: membersData => ({
				url: '/company/members',
				method: 'POST',
				body: membersData,
			}),
		}),
	}),
});

// Standard naming convention rtk
export const { useUpdateMembersMutation } = membersCompanyApi;
