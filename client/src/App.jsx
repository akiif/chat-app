import React from "react";
import { Routes, Route } from "react-router-dom";

// import Pages
import JoinPage from './pages/JoinPage/JoinPage';
import ChatPage from './pages/ChatPage/ChatPage';
import NotFound from './pages/NotFound/NotFound';

// import components
import ToastWrapper from "./components/ToastWrapper";

function App() {
  return (
    <div className="App">
      <ToastWrapper />
      <Routes>
        <Route element={<JoinPage />} path='/' />
        <Route element={<ChatPage />} path='/chat' />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
