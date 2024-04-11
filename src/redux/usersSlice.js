import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await api.getUsers();
  return users;
});

export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const newUser = await api.createUser(userData);
  return newUser;
});

export const updateUserById = createAsyncThunk(
  'users/updateUserById',
  async ({ userId, userData }) => {
    const updatedUser = await api.updateUser(userId, userData);
    return { userId, userData: updatedUser };
  }
);

export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (userId) => {
    await api.deleteUser(userId);
    return userId;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, userData } = action.payload;
        const index = state.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...userData };
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
