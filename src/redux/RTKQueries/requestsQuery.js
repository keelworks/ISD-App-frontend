import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import SearchResultsList from '../../utilities/searchField/searchComponenets/searchResultsList/SearchResultsList';
import { addAuthTokenToHeader } from '../../utilities/utils';

// All api calls related to auth process params will need to be adjusted accordingly to backend specifications
export const requestsApi = createApi({
	reducerPath: 'requestsApi',
	refetchOnMountOrArgChange: true,
	tagTypes: ['Request'],
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
		createRequest: builder.mutation({
			query: newRequest => ({
				url: '/api/requests',
				method: 'POST',
				body: newRequest,
			}),
			invalidatesTags: ['Requests'],
		}),
		getRequests: builder.query({
			query: () => ({
				url: '/api/requests',
				method: 'GET',
			}),
			providesTags: (result=[], error, arg) => [
				'Requests',
				...result.map(({id}) => ({type: 'Requests', id}))
			]
		}),
		getRequestById: builder.query({
			query: (requestId) => ({
				url: `/api/requests/${requestId}`,
				method: 'GET',
			}),
			providesTags: (result = [], error, arg) => 
			{ console.log(result);
				return [
				'Request',
				({type: 'Request', id: result.request_id })
			]}
		}),
		updateRequestById: builder.mutation({
			query: updatedRequest => ({
				url: `/api/requests/updateRequest/${updatedRequest.request_id}`,
				method: 'POST',
				body: updatedRequest,
			}),
			invalidatesTags: (result=[]) => [({type: 'Request', id: result.request_id})]
		}),
	}),
});

// Standard naming convention rtk
export const { useCreateRequestMutation, useGetRequestsQuery, useGetRequestByIdQuery, useUpdateRequestByIdMutation } = requestsApi;
