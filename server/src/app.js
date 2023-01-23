import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { connectUser, disconnectUser, findUserDetails } from './utils/users.js';
import { findChannel, isFriendReady, leaveChannel } from './utils/channels.js';

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

let onlineUsers = [];
const channels = Array.from({length: 10}, (_, i) => i = []);

io.on('connection', (socket) => {
  
  const channel = findChannel(channels, socket.id);
  
  if (!channel) {
    console.log("Server at capacity!");
    return;
  }

  connectUser(onlineUsers, socket.id, channel);

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
    const userDetails = findUserDetails(onlineUsers, socket.id);
    disconnectUser(onlineUsers, userDetails.userIndex);
    leaveChannel(channels, channel, socket.id);

    socket.to(channel).emit('find_friend', {
      channelId: channel,
      isFriendReady: isFriendReady(channels, channel),
    });
  });
});


server.listen(4000, () => {
  console.log("Server running on port 4000");
});
