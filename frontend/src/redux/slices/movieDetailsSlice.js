import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config.json";

const BASE_URL = apiUrl + '/movies';  // "http://localhost:5000/api/movies"

export const getAllMovies = createAsyncThunk(
  "movie/getAllMovies",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response?.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.log("Error creating movie: ", error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response?.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (updatedData, { rejectWithValue }) => {
    const { _id, __v, ...body } = updatedData;
    try {
      const response = await axios.put(`${BASE_URL}/${_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error updating movie:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const movieDetailSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    count: 0,
    searchData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    searchMovie: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllMovies
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        const { status, data, count } = action.payload;
        state.isLoading = false;
        state.movies = data;
        state.count = count;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // createMovie
    builder
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // updateMovie
    builder
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = state.movies.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // deleteMovie
    builder
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.payload;
        if (_id) {
          state.movies = state.movies.filter((customer) => customer._id !== _id);
          state.count = state.movies.length;
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { searchMovie } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;