import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config.json";

const BASE_URL = apiUrl + '/customers';  // "http://localhost:5000/api/customers"



export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response?.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.log("Error creating customer: ", error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting customer:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
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
      console.error("Error updating customer:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const customerDetailSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    count: 0,
    searchData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    searchCustomer: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllCustomers
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        const { customers } = action.payload;
        state.isLoading = false;
        state.customers = customers;
        state.count = customers.length;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // createCustomer
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // updateCustomer
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // deleteCustomer
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.payload;
        if (_id) {
          state.customers = state.customers.filter((customer) => customer._id !== _id);
          state.count = state.customers.length;
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { searchCustomer } = customerDetailSlice.actions;
export default customerDetailSlice.reducer;