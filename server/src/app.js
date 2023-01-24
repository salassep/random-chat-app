import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

// import { connectUser, disconnectUser, findUserDetails } from './utils/users.js';
// import { findChannel, isFriendReady, leaveChannel } from './utils/channels.js';

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

let chats = [];

io.on('connection', (socket) => {
  const findFriend = () => {
    let channelIdIndex = chats.findIndex((channel) => !channel.isReadyToChat);
  
    if (channelIdIndex < 0) {
      const channelId = nanoid();
      const isReadyToChat = false;
  
      chats.push({
        channelId,
        isReadyToChat,
        users: [socket.id],
        messages: []
      });
  
      socket.join(channelId);
    
      socket.emit('find_friend', {
        channelId,
        isReadyToChat,
      });
  
    } else {
      chats[channelIdIndex].isReadyToChat = true;
      chats[channelIdIndex].users.push(socket.id);
  
      const {channelId, isReadyToChat} = chats[channelIdIndex];
  
      socket.join(channelId);

      socket.to(channelId).emit('find_friend', {
        channelId,
        isReadyToChat,
      });
    
      socket.emit('find_friend', {
        channelId,
        isReadyToChat,
      });

      setTimeout(() => {
        io.in(channelId).emit('receive_message', {
          isSender: false,
          message:"Hi, there!",
          createdTime: Date.now(),
        });
        io.in(channelId).emit('receive_message', {
          isSender: false,
          message:"Hi, there!",
          createdTime: Date.now(),
        });
      }, 3000);
    }
  };

  findFriend();

  socket.on('refind_friend', () => {
    findFriend();
  });

  socket.on('send_message', (data) => {
    const { message, channelId, createdTime } = data;

    const channelIndex = chats.findIndex((chat) => chat.channelId === channelId);

    chats[channelIndex].messages.push({
      sender: socket.id,
      message,
      createdTime,
    });

    console.log(chats);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected")
    chats = chats.map((chat) => {
      if (!chat.users.includes(socket.id)) {
        return chat;
      }

      socket.to(chat.channelId).emit('receive_message', {
        isSender: false,
        message:"I am leaving!",
        createdTime: Date.now(),
      });

      setTimeout(() => {
        socket.to(chat.channelId).emit("skipped");
        socket.leave(chat.channelId);
      }, 3000)

    }).filter((chat) => chat);
  });
});


server.listen(4000, () => {
  console.log("Server running on port 4000");
});
