import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());

const PORT = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: `${process.env.SOCKET_CLIENT}`,
    methods: ['GET', 'POST'],
  },
});

let chats = [];

io.on('connection', (socket) => {
  const findFriend = () => {
    let channelIdIndex = chats.reverse().findIndex((channel) => !channel.isReadyToChat);
  
    if (channelIdIndex < 0) {
      const channelId = nanoid();
      const isReadyToChat = false;
  
      chats.push({
        channelId,
        isReadyToChat,
        users: [socket.id],
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

      setTimeout(() => {
        socket.to(channelId).emit('find_friend', {
          channelId,
          isReadyToChat,
        });
  
        socket.emit('find_friend', {
          channelId,
          isReadyToChat,
        });
      }, 1000)
    
      setTimeout(() => {
        io.in(channelId).emit('receive_message', {
          isSender: false,
          isChatFinished: false,
          message:"Hi, there!",
          createdTime: Date.now(),
        });
      }, 1500);
    }
  };

  findFriend();

  socket.on('refind_friend', () => {
    findFriend();
  });

  socket.on('send_message', (data) => {
    const { message, channelId, createdTime } = data;

    socket.to(channelId).emit('receive_message', {
      isSender: false,
      isChatFinished: false,
      message,
      createdTime,
    });

    socket.emit('receive_message', {
      isSender: true,
      isChatFinished: false,
      message,
      createdTime,
    });
  });

  socket.on("skip", () => {
    let channelId;
    chats = chats.map((chat) => {
      if (!chat.users.includes(socket.id)) {
        return chat;
      }

      const users = chat.users.filter((user) => user !== socket.id);

      if (users.length > 0) {
        channelId = chat.channelId;
  
        return {
          channelId,
          isReadyToChat: false,
          users,
        }
      }
    }).filter((chat) => chat);

    socket.emit('find_friend', {
      channelId: channelId,
      isReadyToChat: false,
    });

    socket.leave(channelId);

    socket.to(channelId).emit('receive_message', {
      isSender: false,
      isChatFinished: true,
      message:"I am leaving!",
      createdTime: Date.now(),
    });

    setTimeout(() => {
      socket.to(channelId).emit('find_friend', {
        channelId: channelId,
        isReadyToChat: false,
      });
  
      findFriend();
    }, 1500)
  });

  socket.on("disconnect", () => {
    chats = chats.map((chat) => {
      if (!chat.users.includes(socket.id)) {
        return chat;
      }

      socket.to(chat.channelId).emit('receive_message', {
        isSender: false,
        isChatFinished: true,
        message:"I am leaving!",
        createdTime: Date.now(),
      });

      const delayedFunction = () => new Promise(
        resolve => setTimeout(() => {
          socket.to(chat.channelId).emit('find_friend', {
            channelId: chat.channelId,
            isReadyToChat: false,
          });
          resolve();
        }, 1500)
      );

      delayedFunction().then(() => {
        setTimeout(() => {
          socket.to(chat.channelId).emit("friend_offline");
          socket.leave(chat.channelId);
        }, 1500);
      });

    }).filter((chat) => chat);
  });
});


server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
