import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const membersApi = createApi({
	reducerPath: 'membersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api/members',
		prepareHeaders(headers) {
			addAuthTokenToHeader(headers);
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	tagTypes: ['Members', 'Member'],
	endpoints: builder => ({
		addMember: builder.mutation({
			query: memberData => ({
				url: '/addMember',
				method: 'POST',
				body: memberData,
			}),
			invalidatesTags: ['Members']
		}),
		getMembersByOrganizationId: builder.query({
			query: organizationId => ({
				url: `/getMembers/${organizationId}`,
				method: 'GET',
			}),
			providesTags: (result=[], error, arg) => [
				'Members',
				...result.map(({id}) => ({type: 'Member', id})),
			]
			
		}),
		removeMember: builder.mutation({
			query: memberData => ({
				url: '/removeMember',
				method: 'DELETE',
				body: memberData,
			}),
			invalidatesTags: (result, error, id) => [{type: 'Member', id}],
		}),
		updateRole: builder.mutation({
			query: memberData => ({
				url: 'updateRole',
				method: 'POST',
				body: memberData,
			}),
		}),
	}),
});

// Standard naming convention rtk
export const { useAddMemberMutation, useGetMembersByOrganizationIdQuery, useLazyGetMembersByOrganizationIdQuery, useRemoveMemberMutation, useUpdateRoleMutation } = membersApi;
