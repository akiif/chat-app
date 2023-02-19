let users = [];

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.username === username && user.room === room
  });

  // Validate username
  if (existingUser) {
    return {
      error: "The Username is already in use in the given room!"
    }
  } 

  // Store user
  const user = {
    username: username,
    room: room,
    id: id
  }
  users.push(user);
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
}

const getActiveRooms = () => {
  let activeRooms = [];
  users.forEach((user) => {
    if (!activeRooms.includes(user.room)) {
      activeRooms.push(user.room);
    }
  });
  return activeRooms;
}


module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getActiveRooms
}