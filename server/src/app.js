import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { disconnectUser } from './utils/disconnect-user.js';
import { connectUser } from './utils/connect-user.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let userCount = 0;
let onlineUsers = [];

io.on('connection', (socket) => {
  
  connectUser(onlineUsers, socket.id);
  console.log(onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = disconnectUser(onlineUsers, socket.id);
    console.log(onlineUsers);
  });
});


server.listen(4000, () => {
  console.log("Server running on port 4000");
});
