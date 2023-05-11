const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { clearUser, setUser } from 'app/Auth/AuthSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['authApi'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: `${base_url}/login`,
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
      providesTags: ['authApi'],

      onCacheEntryAdded: (data, { dispatch }, result) => {
        console.log('result on success:', result)
        console.log('data on success:', data)
        dispatch(setUser(result.data))
      },
    }),
    logout: builder.mutation({
      queryFn: (_, { dispatch }) => {
        dispatch(clearUser())
        return {
          data: 'logout',
        }
      },
      // invalidatesTags: ['authApi'],
      // onQueryStarted: (_, { dispatch }) => {
      //   dispatch(clearUser())
      // },
    }),
  }),
})

export const {
  useLoginMutation,
  endpoints,
  reducer,
  reducerPath,
  middleware,
  useLogoutMutation,
} = authApi
