import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchClientRequests = createAsyncThunk('fetchClientRequests',async(id)=>{
    try{
    const {data} = await axios.get(`/api/requests/product/${id}`)
    return data
    }catch(error) {
        console.log("Error in fetchClient requests")
    }
})


// export const editAssignFreelancer = createAsyncThunk(
//     "editAssignFreelancer",
//     async (project) => {
//       try {
//         const { data } = await axios.put(`/api/projects/${project.projectId}`, project);
//         return data;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   );

  export const editAcceptRequest = createAsyncThunk(
    "editAcceptRequest",
    async (project) => {
      console.log("PROJECTTT", project)
      try {
        const { data } = await axios.put(`/api/requests/${project.projectId}`, project);
        console.log("DATAAAA: ", data)
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );


const clientRequestsSlice = createSlice({
    name: 'clientRequests',
    initialState: [],
    reducer: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchClientRequests.fulfilled, (state, action)=>{
            return action.payload
        })
      //   builder.addCase(editAcceptRequest.fulfilled, (state, action)=>{
      //     state.ClientRequests = action.payload
      // })
    }
})



export const selectClientRequests = (state)=>{
    return state.clientRequests
}
export default clientRequestsSlice.reducer