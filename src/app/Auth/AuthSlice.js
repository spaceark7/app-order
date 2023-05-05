import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }) => {
//     const response = await authApi.endpoints.login({ email, password }).unwrap()
//     return response.data
//   }
// )

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    clearUser: (state) => {
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
