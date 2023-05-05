const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { clearUser, setUser } from 'app/Auth/AuthSlice'

// const LoginApi = async (auth) => {
//   try {
//     const { data } = await api.post('/auth/login', {
//       username: 'kminchelle',
//       password: '0lelpl',
//     })
//     console.log('data:', data)
//     return data
//   } catch (error) {
//     console.log('error:', error)
//     return error
//   }

// }

// export { LoginApi }

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['authApi'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `${base_url}/login`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ['authApi'],

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
