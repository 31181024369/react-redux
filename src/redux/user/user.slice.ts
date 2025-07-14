import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchListUsers = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
        const res=await fetch("http://localhost:8000/users");
        const data=await res.json();
        return data;
  },
)

interface IUserPayload{
    email:string,
    name:string
}
export const createNewUser=createAsyncThunk(
    'users/createNewUser',
    async (payload:IUserPayload, thunkAPI) => {
        const res=await fetch("http://localhost:8000/users",{
            method:"POST",
            body:JSON.stringify({
                email:payload.email,
                name:payload.name
            }),
            headers:{
                "Content-Type":" application/json"
            }
        });
        const data=await res.json();
        if(data && data.id){
            thunkAPI.dispatch(fetchListUsers());
        }
        console.log("check data :",data);
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
    listUsers:IUser[],
    isCreateSuccess:boolean
} = {
  listUsers: [],
  isCreateSuccess:false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetCreate(state){
        state.isCreateSuccess=false;
    }
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUsers=action.payload;
    }),
     builder.addCase(createNewUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isCreateSuccess=true;
    })
  },
})

export const { resetCreate } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer


