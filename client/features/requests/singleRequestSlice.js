import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// export const fetchSingleRequest = createAsyncThunk('fetchSingleRequest',async(request)=>{

//     try{
//      const {data} = await axios.get(`/api/requests/${request.projectId}/${request.freelancerId}`)
//     return data
//     }catch(error) {
//         console.log("Error in fetch Single request")
//     }
// })




export const fetchSingleRequestAsync = createAsyncThunk(
    "singleRequest",
    async (id) => {
        console.log("RIGHT THUNK")
      try {
        const { data } = await axios.get(`/api/requests/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const fetchSingleFreelancerRequest = createAsyncThunk('fetchRequest', async(info)=>{
    console.log("INFO: ", info)
    try{
        const { data } = await axios.get(`/api/requests/${info.projectId}/${info.freelancerId}`)
        console.log("DATA FROM THUNK: ", data)
      return data[0]
    }catch(error){
        console.log("Error in select request thunk: ", error)
    }
})

  export const editAcceptRequest = createAsyncThunk(
    "editAcceptRequest",
    async (project) => {
      try {
        const { data } = await axios.put(`/api/requests/${project.projectId}`, project);
        console.log("DATAAAA: ", data)
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  // export const editAcceptRequest = createAsyncThunk(
  //   "editAcceptRequest",
  //   async (project) => {
  //     try {
  //       const { data } = await axios.put(`/api/requests/${project.projectId}`, project);
  //       console.log("DATAAAA: ", data)
  //       return data;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // );


const singleRequestSlice = createSlice({
    name: 'singleRequest',
    initialState: {},
    reducer: {},
    extraReducers: (builder) =>{
        // builder.addCase(fetchSingleRequestAsync.fulfilled, (state, action)=>{
        //     console.log("FETCH SINGEL REQUEST ACTION PAYLOAD: ", action.payload)
        //      return action.payload
        // })
        builder.addCase(fetchSingleFreelancerRequest.fulfilled, (state, action)=>{
            console.log("FETCH SINGEL REQUEST ACTION PAYLOAD: ", action.payload)
             state.singleRequest = action.payload
        })
  
    }
})



export const selectSingleRequest = (state)=>{
    return state.clientRequests
}
export default singleRequestSlice.reducer