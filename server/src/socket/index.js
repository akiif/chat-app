const socket_io = require('socket.io');

// import config
const urlConfig = require('../config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// import socket emit functions
const { sendMessageToUser } = require('./emit');

// import socket event functions
const { joinRoom, sendMessageFromClient, sendLocationFromClient, getActiveRoomsRequest, userDisconnect } = require('./events');

const initSocket = (server) => {
  const io = socket_io(server, {
    cors: {
      origin: `${CLIENT_URL}`,
      credentials: true  // allow session cookie from browser to pass through
    }
  });

  io.on('connection', (socket) => {
    console.log("New WebSocket connection");

    getActiveRoomsRequest(socket, io);
  
    joinRoom(socket, io);
    
    sendMessageFromClient(socket, io);

    sendLocationFromClient(socket, io);

    userDisconnect(socket, io);
  })
}

module.exports = initSocket;
