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




const freelancerRequestsSlice = createSlice({
    name: 'freelancerRequests',
    initialState: [],
    reducer: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchFreelancerRequests.fulfilled, (state, action)=>{
            console.log("AXION LOADL ")
            return action.payload
        })
    }
})



export const selectFreelancerRequests = (state)=>{
    return state.freelancerRequests
}
export default freelancerRequestsSlice.reducer