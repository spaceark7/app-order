const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getAuthToken } from 'app/Auth/AuthSlice'

export const sectionApi = createApi({
  reducerPath: 'sectionApi',
  tagTypes: ['sectionApi'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 1,
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      console.log('the token:', token)
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getSection: builder.query({
      query: () => ({
        url: `${base_url}/backoffice/master/table-sections`,
        method: 'GET',
      }),
      keepUnusedDataFor: 10,
      providesTags: ['sectionApi'],

      transformResponse: (response) => {
        return response.group_tables
      },
      transformErrorResponse: (error) => {
        console.log('error response:', error)
        return error
      },
    }),
  }),
})

export const { useGetSectionQuery } = sectionApi
