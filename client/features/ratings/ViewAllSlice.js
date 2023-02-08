import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchRatingsAsync = createAsyncThunk("allRatings", async () => {
      const { data } = await axios.get(`/api/ratings`);
      return data;
    });

    export const fetchRatingsByFreelancerAsync = createAsyncThunk("allProjectsByCategory", async (id) => {
      const { data } = await axios.get(`/api/ratings/${id}`);
      console.log("DATER: ", data)
      return data;
    });

    

    
    export const addRatingAsync = createAsyncThunk("addProject", async ({ freelancerId, rating, review, projectId }) => {
      const { data } = await axios.post(`/api/ratings`, {freelancerId, rating, review, projectId});
        return data;
      });

    export const deleteSingleRatingAsync = createAsyncThunk("deleteSingleRating", async (id) => {
        await axios.delete(`/api/ratings/${id}`);
      return id;
    })


  const ratingsSlice = createSlice({
    name: "ratings",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRatingsAsync.fulfilled, (state, action) => {
        return action.payload;
        
      });
      builder.addCase(fetchRatingsByFreelancerAsync.fulfilled, (state, action) => {
        return action.payload;
        
      });
      builder.addCase(addRatingAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      builder.addCase(deleteSingleRatingAsync.fulfilled, (state, action) => {
        state = state.filter(rating =>{
          return rating.id !== action.payload
        });
      });
  

    },
  });

  export const selectRatings = (state) => {

    return state.allRatings
}

  export default ratingsSlice.reducer