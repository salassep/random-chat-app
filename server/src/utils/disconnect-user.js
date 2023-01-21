export function disconnectUser(users, userId) {
  console.log(`${userId} disconnected`);
  return users.filter((user) => user.userId !== userId);
}