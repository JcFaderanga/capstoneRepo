export const TimeAgo = (timestamp) => {
  const time = [31536000, 2592000, 604800, 86400, 3600, 60];
  const date = ['year', 'month', 'week', 'day', 'hour', 'minute'];
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);

  for (let i = 0; i < time.length; i++) {
      const interval = Math.floor(seconds / time[i]);
      if (interval >= 1) {
          return `${interval} ${date[i]}${interval === 1 ? '' : 's'} ago`;
      }
  }
  return 'just now';
};

// 1year (365 days x 24 hours x 60 minutes x 60 seconds)
// 1 month (30 days x 24 hours x 60 minutes x 60 seconds)
// 1 week (7 days x 24 hours x 60 minutes x 60 seconds)
// 1 day (24 hours x 60 minutes x 60 seconds)
// 1hour (60 minutes x 60 seconds)

