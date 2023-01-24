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

let chats = [
  // {
  //   channelId: 2222,
  //   isReadyToChat: false,
  //   messages: [],
  // },
  // {
  //   channelId: 1111,
  //   isReadyToChat: true,
  //   messages: [],
  // },
];

// {
//   channelId = 123412,
//   isReadyToChat = false
//   messages = [{
//     sender: 123123,
//     message: "blablablba",
//   }];
// }

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
  
    }
  };

  findFriend();

  socket.on('refind_friend', () => {
    findFriend();
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected")
    chats = chats.map((chat) => {
      if (!chat.users.includes(socket.id)) {
        return chat;
      }
      socket.to(chat.channelId).emit("skipped");
      socket.leave(chat.channelId);
    }).filter((chat) => chat);
  });
});


server.listen(4000, () => {
  console.log("Server running on port 4000");
});
