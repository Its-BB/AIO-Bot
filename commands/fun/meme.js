const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Fetches a random meme'),
    async execute(interaction, client) {
        try {
            const response = await axios.get('https://api.imgflip.com/get_memes');
            const memes = response.data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            interaction.reply({ content: randomMeme.url });
        } catch (error) {
            interaction.reply({ content: 'Failed to fetch a meme!', ephemeral: true });
        }
    },
};