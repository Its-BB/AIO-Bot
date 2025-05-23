const { PermissionsBitField } = require('discord.js');

function checkPermissions(interaction, permission) {
    if (!interaction.member.permissions.has(permission)) {
        interaction.reply({ content: 'You lack the required permissions!', ephemeral: true });
        return false;
    }
    return true;
}

module.exports = { checkPermissions };