import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleFreelancer = createAsyncThunk("fetchSingleFreelancer", async(id)=>{
try{
    const {data} = await axios.get(`/api/freelancers/${id}`)
    return data

}catch(error){
    console.log("ERROR IN FETCHSINGLEFREELANCER THUNK: ", error)
}
})

export const updateFreelancerAsync = createAsyncThunk('updateFreelancer', async ({id, firstName, lastName, email, ratingAvg, description, hourlyRate, username, category, bio, specialties, imageUrl }) =>{
    try{
      const { data } = await axios.put(`/api/freelancers/${id}`, {
        firstName,
        lastName,
        email,
        ratingAvg,
        description,
        category,
        hourlyRate,
        specialties,
        bio,
        username,
        imageUrl
      })
      return data
    }catch(err){
      console.log(err)
    }
   })

const SingleFreelancer = createSlice({
    name: "singleFreelancer",
    initialState: {},
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSingleFreelancer.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})
export const selectSingleFreelancer = (state)=>{
    return state.SingleFreelancer
}

export default SingleFreelancer.reducer 
