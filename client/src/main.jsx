import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css';
import { BrowserRouter } from 'react-router-dom';

// import redux store
import { store } from "./state/store";
import { Provider } from "react-redux";

// import context provider
import { SocketProvider } from "./contexts/SocketProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  // </React.StrictMode>
  ,
);
