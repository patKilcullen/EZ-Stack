import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleProject: {},
};

export const fetchSingleRatingAsync = createAsyncThunk(
  "singleProject",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const editSingleProject = createAsyncThunk(
//   "editProduct",
//   async (project) => {
//     try {
//       const { data } = await axios.put(`/api/projects/${project.id}`, project);
//       console.log("THUNK: ", data)
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// export const editAssignFreelancer = createAsyncThunk(
//   "editAssignFreelancer",
//   async (project) => {
//     try {
//       const { data } = await axios.put(`/api/projects/${project.projectId}`, project);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );





const singleRatingSlice = createSlice({
  name: "singleRating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleRatingAsync.fulfilled, (state, action) => {
      state.singleProject = action.payload;
    });

  },
});

export const selectSingleRating = (state) => {
  return state.singleRating;
};

export default singleRatingSlice.reducer;
