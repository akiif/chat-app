// import message formatters
const { generateMessage, generateLocationMessage } = require('../utils/messages');

// import user functions
const { getUsersInRoom, getActiveRooms } = require('../utils/users');


const sendMessageToUser = (socket, { username, room, message }) => {
  const generatedMessage = generateMessage(username, room, message);
  socket.emit('message', generatedMessage);
}

const sendMessageToAllUsers = (io, { username, room, message }) => {
  io.to(room).emit('message', generateMessage(username, room, message));
}

const sendLocationToAllUsers = (io, { username, room, coords }) => {
  io.to(room).emit('message', generateLocationMessage(username, room, coords));
} 

const sendNewUserJoinedMessage = (socket, { username, room }) => {
  socket.broadcast.to(room).emit('message', generateMessage(`Admin`, room, `${username} has joined!`));
}

const sendRoomData = (io, room) => {
  const roomData = getUsersInRoom(room);
  io.to(room).emit('roomData', {
    room: room,
    users: roomData
  })
}

const sendActiveRooms = (io) => {
  const activeRooms = getActiveRooms();
  io.emit('activeRooms', activeRooms);
}


module.exports = {
  sendMessageToUser,
  sendNewUserJoinedMessage,
  sendMessageToAllUsers,
  sendLocationToAllUsers,
  sendRoomData,
  sendActiveRooms
}