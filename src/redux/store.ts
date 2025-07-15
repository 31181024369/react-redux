// store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter.slice'
import userReducer from './user/user.slice';
import appReducer from './app/app.slice';

export const store = configureStore({
  reducer: {
    count: counterReducer,
    user:userReducer,
    app:appReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch