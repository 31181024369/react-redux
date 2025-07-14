// store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter.slice' // Correctly import the default export (the reducer)
import userReducer from './user/user.slice';

export const store = configureStore({
  reducer: {
    count: counterReducer, // Use the actual reducer function here
    user:userReducer
  },
})

// Infer the `RootState`, `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch