import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { disconnectUser } from './utils/disconnect-user.js';
import { connectUser } from './utils/connect-user.js';
import { findChannel, isFriendReady } from './utils/match-user.js';

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
const channels = Array.from({length: 10}, (_, i) => i = []);

io.on('connection', (socket) => {
  
  connectUser(onlineUsers, socket.id);

  const channel = findChannel(channels, socket.id);

  if (!channel) {
    console.log("Server at capacity!");
    return;
  }

  socket.join(channel);

  socket.to(channel).emit('find_friend', {
    channelId: channel,
    isFriendReady: isFriendReady(channels, channel),
  });

  socket.emit('find_friend', {
    channelId: channel,
    isFriendReady: isFriendReady(channels, channel),
  });

  console.log(channels);

  socket.on("disconnect", () => {
    disconnectUser(onlineUsers, socket.id);
  });
});


server.listen(4000, () => {
  console.log("Server running on port 4000");
});
