import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  room: '',
  id: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.username = action.payload.username.toLowerCase();
      state.room = action.payload.room.toLowerCase();
    },
    setId: (state, action) => {
      state.id = action.payload.id
    },
    clearUserDetails: (state) => {
      state.username = '';
      state.room = '';
    },
  }
});

export const { setUserDetails, setId, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;