import { configureStore } from "@reduxjs/toolkit";

// import redux reducers
import userReducer from './features/user/userSlice';
import messagesReducer from "./features/messages/messagesSlice";
import roomDataReducer from "./features/roomData/roomDataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    roomData: roomDataReducer
  },
});