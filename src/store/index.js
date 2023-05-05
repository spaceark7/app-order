import { authApi } from 'api/loginApi'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '@app/Auth/AuthSlice'
import NotificationReducer from '@app/Home/NotificationSlice'
import { notificationApi } from 'api/notificationApi'
import { sectionApi } from 'api/sectionApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import ModalReducer from '@app/Home/ModalSlice'
import { setUser } from '@app/Auth/AuthSlice'
import { menuApi } from 'api/menuAPi'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    notification: NotificationReducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    modal: ModalReducer,
  },

  devTools: composeWithDevTools(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    [setUser]
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      notificationApi.middleware,
      sectionApi.middleware,
      menuApi.middleware
    ),
})

setupListeners(store.dispatch)

export default store
