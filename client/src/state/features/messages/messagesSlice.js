import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { addMessage, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;