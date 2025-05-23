const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your economy balance')
        .addUserOption(option => option.setName('user').setDescription('Check another user\'s balance')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const data = await client.db.get('SELECT balance, bank FROM users WHERE user_id = ? AND guild_id = ?', [user.id, interaction.guild.id]);

        if (!data) {
            await client.db.run('INSERT INTO users (user_id, guild_id, balance, bank) VALUES (?, ?, ?, ?)', [user.id, interaction.guild.id, 0, 0]);
            return interaction.reply(`${user.username} has 0 ${client.config.economy.currency} in wallet and 0 in bank.`);
        }

        interaction.reply(`${user.username} has ${data.balance} ${client.config.economy.currency} in wallet and ${data.bank} in bank.`);
    },
};