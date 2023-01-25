import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleProject: {},
};

export const fetchSingleProjectAsync = createAsyncThunk(
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

export const editSingleProject = createAsyncThunk(
  "editProduct",
  async (project) => {
    try {
      const { data } = await axios.put(`/api/products/${project.id}`, project);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleProjectSlice = createSlice({
  name: "singleProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProjectAsync.fulfilled, (state, action) => {
      state.singleProject = action.payload;
    });
    builder.addCase(editSingleProject.fulfilled, (state, action) => {
      state.singleProject = action.payload;
    });
  },
});

export const selectSingleProject = (state) => {
  return state.singleProject;
};

export default singleProjectSlice.reducer;
