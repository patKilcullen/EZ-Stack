import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL Freelancers
export const fetchAllFreelancers = createAsyncThunk(
  "allFreelancers",
  async () => {
    try {
      const { data } = await axios.get("/api/freelancers");
      return data;
    } catch (error) {
      console.log("ERROR IN FETCHALLFRELANCERS THUNK: ", error);
    }
  }
);

// GET freelancers by CATEGORY
export const fetchFreelancersByCategoryAsync = createAsyncThunk(
  "allFreelancersByCategory",
  async (category) => {
    const { data } = await axios.get(`/api/freelancers/cat/${category}`);
    return data;
  }
);


const allFreelancersSlice = createSlice({
  name: "allFreelancers",
  initialState: {
    freelancers: [],
    freelancersByReviews: [],
    freelancersByCategory: [],
    freelancersBySpecialties: [],
  },

  reducers: {
    // sort freelancers be reviews - reducer
    sortByReviews(state, action) {
      state.freelancersByReviews = state.freelancers.sort((a, b) => {
        const A = a.ratings.length;
        const B = b.ratings.length;
        if (A < B) {
          return 1;
        }
        if (A > B) {
          return -1;
        }
        return 0;
      });
    },
    // sort freelancers be Category - reducer
    sortByCategory(state, action) {
      state.freelancersByCategory = state.freelancers.filter(
        (freelancer) => freelancer.category === action.payload
      );
    },
    // sort freelancers be Specialty - reducer
    sortBySpecialties(state, action) {
      state.freelancersBySpecialties = state.freelancers.filter(
        (freelancer) => freelancer.specialties === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Fetches all freelancers then sorts them by rating before sending to store
    builder.addCase(fetchAllFreelancers.fulfilled, (state, action) => {
      state.freelancers = action.payload.sort((a, b) => {
        return b.ratingAvg - a.ratingAvg;
      });
    });
    builder.addCase(
      fetchFreelancersByCategoryAsync.fulfilled,
      (state, action) => {
        return action.payload;
      }
    );
  },
});


/*
  ACTIONS
*/
export const { sortByReviews, sortByCategory, sortBySpecialties } =
  allFreelancersSlice.actions;

export const selectAllFreelancers = (state) => {
  return state.allFreelancers.freelancers;
};
export const selectAllFreelancersByReviews = (state) => {
  return state.allFreelancers.freelancersByReviews;
};
export const selectAllFreelancersByCategory = (state) => {
  return state.allFreelancers.freelancersByCategory;
};
export const selectAllFreelancersBySpecialties = (state) => {
  return state.allFreelancers.freelancersBySpecialties;
};


/*
  REDUCER
*/
export default allFreelancersSlice.reducer;
