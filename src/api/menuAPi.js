const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const menuApi = createApi({
  reducerPath: 'menuApi',
  tagTypes: ['menuApi'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 1,
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: `${base_url}/menus`,
        method: 'GET',
      }),
      keepUnusedDataFor: 10,
      invalidatesTags: ['menuApi'],
      providesTags: ['menuApi'],
      transformResponse: (response) => {
        return response.list_menu
      },
    }),
  }),
})

export const { useGetMenuQuery } = menuApi
