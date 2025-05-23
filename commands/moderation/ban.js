const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for the ban')),
    permissions: PermissionsBitField.Flags.BanMembers,
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in the server!', ephemeral: true });
        }

        try {
            await member.ban({ reason });
            await client.db.run('INSERT INTO mod_logs (guild_id, user_id, action, reason, moderator_id) VALUES (?, ?, ?, ?, ?)', [
                interaction.guild.id,
                user.id,
                'ban',
                reason,
                interaction.user.id,
            ]);
            log(`User ${user.tag} banned from ${interaction.guild.name} by ${interaction.user.tag}`, 'moderation');
            interaction.reply({ content: `${user.tag} has been banned. Reason: ${reason}` });
        } catch (error) {
            log(`Error banning user ${user.tag}: ${error}`, 'error');
            interaction.reply({ content: 'Failed to ban the user!', ephemeral: true });
        }
    },
};