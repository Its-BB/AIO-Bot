const { log } = require('../utils/logger');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const prefix = client.configs.get(message.guild.id)?.prefix || client.config.prefix;
        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.find(cmd => cmd.aliases?.includes(commandName));
            if (!command) return;

            try {
                await command.execute(message, args, client);
            } catch (error) {
                log(`Error executing prefix command ${commandName}: ${error}`, 'error');
                message.reply('There was an error executing this command!');
            }
        }

        // Leveling system
        const user = await client.db.get('SELECT * FROM users WHERE user_id = ? AND guild_id = ?', [message.author.id, message.guild.id]);
        if (!user) {
            await client.db.run('INSERT INTO users (user_id, guild_id, xp, level) VALUES (?, ?, ?, ?)', [message.author.id, message.guild.id, 10, 1]);
        } else {
            const newXp = user.xp + 10;
            const level = Math.floor(0.1 * Math.sqrt(newXp));
            if (level > user.level) {
                const channel = message.guild.channels.cache.find(ch => ch.name === client.config.levelUpChannel) || message.channel;
                channel.send(`${message.author} leveled up to level ${level}!`);
                await client.db.run('UPDATE users SET xp = ?, level = ? WHERE user_id = ? AND guild_id = ?', [newXp, level, message.author.id, message.guild.id]);
            } else {
                await client.db.run('UPDATE users SET xp = ? WHERE user_id = ? AND guild_id = ?', [newXp, message.author.id, message.guild.id]);
            }
        }
    },
};