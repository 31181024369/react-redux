import { createSlice } from '@reduxjs/toolkit'

const initialState:  {
  mode: string
}={
    mode:"light"
}

export const appSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode(state,action) {
      state.mode=action.payload;
    },
   
  }
})

export const { changeMode } = appSlice.actions
export default appSlice.reducer


