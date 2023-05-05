const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const sectionApi = createApi({
  reducerPath: 'sectionApi',
  tagTypes: ['sectionApi'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 1,
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getSection: builder.query({
      query: () => ({
        url: `${base_url}/section`,
        method: 'GET',
      }),
      keepUnusedDataFor: 10,
      invalidatesTags: ['sectionApi'],
      providesTags: ['sectionApi'],
      transformResponse: (response) => {
        return response.sections
      },
    }),
  }),
})

export const { useGetSectionQuery } = sectionApi
