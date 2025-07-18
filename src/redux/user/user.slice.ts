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
);
export const updateAUser=createAsyncThunk(
  'users/updateUser',
   async (payload:any, thunkAPI) => {
    const res=await fetch(`http://localhost:8000/users/${payload.id}`,{
      method:"PUT",
      body:JSON.stringify({
          email:payload.emailUpdate,
          name:payload.nameUpdate
        }),
      headers:{
        "Content-Type":" application/json"
      }
    });
    const data=await res.json();
    if(data && data.id){
      thunkAPI.dispatch(fetchListUsers());
    }
    console.log("check data update :",data);
    return data;
   }
)
export const deleteAUser=createAsyncThunk(
  'users/deleteUser',
   async (payload:any, thunkAPI) => {
    const res=await fetch(`http://localhost:8000/users/${payload.id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":" application/json"
      }
    });
    const data=await res.json();
    thunkAPI.dispatch(fetchListUsers());
    return data;
   }
)

// Define the initial state using that type
interface IUser{
    id:number,
    name:string,
    email:string
}
const initialState:{
    listUsers:IUser[],
    isCreateSuccess:boolean,
    isUpdateSuccess:boolean,
    isDeleteSuccess:boolean
} = {
  listUsers: [],
  isCreateSuccess:false,
  isUpdateSuccess:false,
  isDeleteSuccess:false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetCreate(state){
        state.isCreateSuccess=false;
    },
    resetUpdate(state){
        state.isUpdateSuccess=false;
    },
    resetDelete(state){
        state.isDeleteSuccess=false;
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
    }),
     builder.addCase(updateAUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isUpdateSuccess=true;
    }),
    builder.addCase(deleteAUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isDeleteSuccess=true;
    })

  },
})

export const { resetCreate,resetUpdate,resetDelete } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer


