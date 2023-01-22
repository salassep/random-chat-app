export function disconnectUser(users, userId) {
  console.log(`${userId} disconnected`);

  const userIndex = users.findIndex((user) => user.userId === userId);

  if (userIndex) {
    users.splice(userIndex, 1);
  }

  // if (chatWithIndex) {
  //   users[chatWithIndex].chatWith = null;
  // }
}