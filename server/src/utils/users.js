export function connectUser(users, userId, channelId) {
  console.log(`User connected ${userId}`);

  users.push({
    userId,
    channelId: channelId,
  });
}

export function findUserDetails(users, userId) {
  const userDetails = users.map((user, index) => {
    if (user.userId === userId) {
      return {
        userIndex: index,
        userId: user.userId,
        channel: user.channelId,
      }
    }
  }).filter((user) => user);

  if (!userDetails.length) {
    return;
  }

  return userDetails[0];
}

export function disconnectUser(users, userIndex) {
  console.log(`${users[userIndex].userId} disconnected`);
  users.splice(userIndex, 1);
}
