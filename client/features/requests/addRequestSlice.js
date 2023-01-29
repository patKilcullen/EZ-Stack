import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



// export const editAssignFreelancer = createAsyncThunk(
//     "editAssignFreelancer",
//     async (project) => {
//         console.log("PROJECT IN THUNK: ", project.projectId)
//       try {
//         const { data } = await axios.put(`/api/projects/${project.projectId}`, project);
//         return data;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   );

//   export const editAcceptRequest = createAsyncThunk(
//     "editAcceptRequest",
//     async (project) => {
//       try {
//         const { data } = await axios.put(`/api/requests/${project.projectId}`, project);
//         return data;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   );

export const postRequestAsync = createAsyncThunk("postRequest", async(request)=>{
    console.log("REQUEST IN THUNKJ: ", request)
    try{
        const {data} = await axios.post(`/api/requests/`, request)
        console.log("DATAAA: ", data)
        return data
    }catch(error){
        console.log("Error in post request thunk: ", error)
    }
    
})

const addRequestSlice = createSlice({
    name: 'addRequest',
    initialState: [],
    reducer: {},
    extraReducers: (builder) =>{
        builder.addCase(postRequestAsync.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})



export const selectPostRequest = (state)=>{
    return state.addRequest
}
export default addRequestSlice.reducer