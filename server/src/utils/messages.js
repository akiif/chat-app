const generateMessage = (username, room, text) => {
  return {
    content: text,
    username: username,
    room: room,
    type: 'text',
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (username, room, coords) => {
  return {
    content: 'My Location',
    url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    username: username,
    room: room,
    type: 'url',
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}