const { checkPermissions } = require('../utils/permissions');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            if (command.permissions && !checkPermissions(interaction, command.permissions)) return;

            // Cooldown check
            if (!client.cooldowns.has(command.data.name)) {
                client.cooldowns.set(command.data.name, new Map());
            }
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.data.name);
            const cooldownAmount = (command.cooldown || 5) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} seconds before reusing \`${command.data.name}\`.`, ephemeral: true });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            // Handle button interactions (e.g., ticket creation)
            if (interaction.customId === 'create_ticket') {
                // Logic to create a ticket channel or thread
                await interaction.reply({ content: 'Ticket created!', ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            // Handle modal submissions
        } else if (interaction.isStringSelectMenu()) {
            // Handle dropdowns
        }
    },
};