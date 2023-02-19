const http = require('http')
const express = require('express');
const socket = require('./socket/index');

const app = express();
const server = http.createServer(app);
socket(server); // Initialize socket

const port = process.env.PORT || 3200;


server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})