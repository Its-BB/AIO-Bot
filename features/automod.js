module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot || !message.guild) return;

        // Anti-spam
        const spamThreshold = 5;
        const spamTime = 10000;
        if (!client.spamCache) client.spamCache = new Map();
        const userSpam = client.spamCache.get(message.author.id) || { count: 0, lastMessage: 0 };
        if (Date.now() - userSpam.lastMessage < spamTime) {
            userSpam.count++;
            if (userSpam.count >= spamThreshold) {
                message.member.timeout(10 * 60 * 1000, 'Spamming');
                message.channel.send(`${message.author} has been timed out for spamming.`);
            }
        } else {
            userSpam.count = 1;
        }
        userSpam.lastMessage = Date.now();
        client.spamCache.set(message.author.id, userSpam);

        // Anti-swear (simple example)
        const badWords = ['badword1', 'badword2'];
        if (badWords.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.author.send('Please avoid using inappropriate language.');
        }
    });
};