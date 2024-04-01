import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get all users
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (args, { rejectWithValue }) => {
    const response = await fetch("http://localhost:5000/api/customers");
    try {
      return await response.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// create User
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      return await response.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// update User
export const updateUser = createAsyncThunk(
  "updateUser",
  async (updatedData, { rejectWithValue }) => {
    const { _id, __v, ...body } = updatedData;
    const response = await fetch(
      `http://localhost:5000/api/customers/${updatedData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    try {
      console.log("updated data: ", updatedData);
      return await response.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
      method: "DELETE",
    });
    try {
      return await response.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    count: 0,
    searchData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllUsers
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { customers } = action.payload;
        state.isLoading = false;
        state.users = customers;
        state.count = customers.length;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.payload;
        if (_id) {
          state.users = state.users.filter((user) => user._id !== _id);
          state.count = state.users.length;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { searchUser } = userDetailSlice.actions;
export default userDetailSlice.reducer;
