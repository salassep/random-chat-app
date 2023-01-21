export function connectUser(users, userId) {
  console.log(`User connected ${userId}`);
  users.push({
    userId,
    chatWith: null,
  });

  return users;
}
