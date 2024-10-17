export const TimeAgo = (timestamp) => {
const time = [60, 3600, 86400, 604800, 2592000, 31536000];
const date = ['minute', 'hour', 'day', 'week', 'month', 'year'];
const now = new Date();
const postDate = new Date(timestamp);
const seconds = Math.floor((now - postDate) / 1000);
for (let i = time.length - 1; i >= 0; i--) { 
    const interval = Math.floor(seconds / time[i]);
    if (interval >= 1) {
        return(`${interval} ${date[i]}${interval === 1 ? '' : 's'} ago`);
        break;
    }
}
};

