// import socket emit functions
const { 
  sendMessageToUser, sendNewUserJoinedMessage, 
  sendMessageToAllUsers, sendLocationToAllUsers, 
  sendRoomData, sendActiveRooms 
} = require('./emit');

// import user functions
const { getUser, addUser, removeUser } = require('../utils/users');

const joinRoom = (socket, io) => {
  socket.on('SEND_JOIN_REQUEST', (options, callback) => {
    const { username, room } = options;
    const { error, user } = addUser({
      id: socket.id, 
      username: username, 
      room: room
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    sendMessageToUser(socket, { 
      username: 'Admin', 
      room: room, 
      message: `Welcome to the ${room} chat room!` 
    });

    sendNewUserJoinedMessage(socket, { username, room });

    sendActiveRooms(io);
    sendRoomData(io, room);

    callback(null, "Joined success!");
  })
}

const sendMessageFromClient = (socket, io) => {
  socket.on('sendMessage', (receivedMessage, callback) => {
    
    const user = getUser(socket.id);

    if (!user) {
      return callback('No user found!');
    }
    
    sendMessageToAllUsers(io, { 
      username: user.username, 
      room: user.room, 
      message: receivedMessage 
    });

    callback(null, "Message sent successfully!");
  })
}

const sendLocationFromClient = (socket, io) => {
  socket.on('sendLocation', (location, callback) => {

    const user = getUser(socket.id);

    if (!user) {
      return callback('No user present!');
    }

    sendLocationToAllUsers(io, { 
      username: user.username, 
      room: user.room, 
      coords: location 
    })
    callback(null, 'Location sent!');
  })
}

const userDisconnect = (socket, io) => {

  socket.on('disconnect', () => {
    const user  = removeUser(socket.id);

    if (user) {
      sendMessageToAllUsers(io, {
        username: 'Admin',
        room: user.room,
        message: `${user.username} has left the chat!`
      });

      sendActiveRooms(io);
      sendRoomData(io, user.room);
    }
  })
}

const getActiveRoomsRequest = (socket, io) => {
  socket.on('GET_ACTIVE_ROOMS', () => {
    sendActiveRooms(io);
  }); 
}

module.exports = {
  joinRoom,
  sendMessageFromClient,
  sendLocationFromClient,
  userDisconnect,
  getActiveRoomsRequest
}