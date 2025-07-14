import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchListUsers = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
        const res=await fetch("http://localhost:8000/users");
        const data=await res.json();
        return data;
  },
)

// Define the initial state using that type
interface IUser{
    id:number,
    name:string,
    email:string
}
const initialState:{
    listUsers:IUser[]
} = {
  listUsers: [],
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUsers=action.payload;
    })
  },
})

export const {  } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer


