export function findChannel(channels, userId) {
  for (const [index, channel] of channels.entries()) {
    if (channel.length < 2 && !channel.includes(userId)) {
      channel.push(userId);
      return index + 1;
    }
  }
};

export function isFriendReady(channels, channelId) {
  return channels[channelId-1].length === 2; 
}