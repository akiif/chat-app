import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: '',
  users: []
}

const roomDataSlice = createSlice({
  name: 'roomData',
  initialState,
  reducers: {
    updateRoomData: (state, { payload }) => {
      state.room = payload.room;
      state.users = payload.users;
    },
    clearRoomData: (state) => {
      state.room = '';
      state.users = [];
    }
  }
});

export const { updateRoomData, clearRoomData } = roomDataSlice.actions;

export default roomDataSlice.reducer;