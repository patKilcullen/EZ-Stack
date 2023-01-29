import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchFreelancerRequests = createAsyncThunk('fetchfreelancerRequests',async(id)=>{
    try{
    const {data} = await axios.get(`/api/requests/freelancer/${id}`)
    console.log("DATA: ", data)
    return data
    }catch(error) {
        console.log("Error in fetchFreelancer requests")
    }
})


export const deleteRequestAsync = createAsyncThunk('deleteRequest', async(info)=>{
    console.log("HIT DELETE REQUEST THUNK: ", info.projectId)
    console.log("HIT DELETE REQUEST THU: ", info.freelancerId)
    try{
      await axios.delete(`/api/requests/${info.projectId}/${info.freelancerId}`)
    }catch(error){
        console.log("Error in delete request thunk: ", error)
    }
})
// export const postRequestAsync = createAsyncThunk("postRequest", async(request)=>{
//     try{
//         const {data} = await axios.post(`/api/requests/`, request)
//         return data
//     }catch(error){
//         console.log("Error in post request thunk: ", error)
//     }
    
// })



const freelancerRequestsSlice = createSlice({
    name: 'freelancerRequests',
    initialState: [],
    reducer: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchFreelancerRequests.fulfilled, (state, action)=>{
            console.log("AXION LOADL ")
            return action.payload
        })
        // builder.addCase(postRequestAsync.fulfilled, (state, action)=>{
        //     console.log("AX PYLOAD: ", action.payload)
        //     state.push(action.payload)
        // } )
    }
})



export const selectFreelancerRequests = (state)=>{
    return state.freelancerRequests
}
export default freelancerRequestsSlice.reducer