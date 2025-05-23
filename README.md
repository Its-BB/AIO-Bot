# 🤖 All-in-One Discord Bot

A powerful, feature-rich Discord bot built with Node.js and Discord.js v14. This bot provides music streaming, moderation tools, utility commands, and much more to enhance your Discord server experience.

## ✨ Features

### 🎵 Music & Audio
- High-quality music streaming from YouTube, Spotify, and SoundCloud
- Queue management with shuffle, repeat, and skip functionality
- Voice channel integration with crystal clear audio
- Support for playlists and live streams

### 🛡️ Moderation & Administration
- Advanced moderation commands (kick, ban, mute, warn)
- Auto-moderation with customizable filters
- Role management and permission controls
- Server analytics and logging

### 🌍 Multi-Language Support
- Internationalization (i18n) with multiple language support
- Localized command responses and error messages
- Easy language switching per server

### 🎯 Utility & Fun
- Custom commands and automated responses
- Scheduled tasks and reminders
- Interactive games and entertainment
- Server statistics and user profiles

### 💾 Database Integration
- SQLite database with Sequelize ORM
- Data persistence for user preferences and server settings
- Efficient caching and performance optimization

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Discord application and bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Its-BB/AIO-Bot.git
   cd bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Discord Bot Configuration
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   CLIENT_SECRET=your_client_secret_here
   
   # Database Configuration
   DATABASE_URL=./database/bot.sqlite
   
   # Music Services (Optional)
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   
   # Web Dashboard (Optional)
   PORT=3000
   SESSION_SECRET=your_session_secret_here
   
   # Logging Level
   LOG_LEVEL=info
   ```

4. **Database Setup**
   ```bash
   npm run db:migrate
   ```

5. **Start the bot**
   ```bash
   # Production
   npm start
   
   # Development (with auto-restart)
   npm run dev
   ```

## 📁 Project Structure

```
bot/
├── 📂 commands/          # Slash commands and message commands
│   ├── 📂 admin/         # Administrative commands
│   ├── 📂 music/         # Music-related commands
│   ├── 📂 moderation/    # Moderation commands
│   └── 📂 utility/       # Utility commands
├── 📂 events/            # Discord.js event handlers
│   ├── ready.js          # Bot ready event
│   ├── messageCreate.js  # Message handling
│   └── interactionCreate.js # Slash command handling
├── 📂 features/          # Feature modules
│   ├── 📂 music/         # Music system
│   ├── 📂 moderation/    # Moderation system
│   └── 📂 dashboard/     # Web dashboard
├── 📂 database/          # Database files and models
│   ├── 📂 models/        # Sequelize models
│   └── 📂 migrations/    # Database migrations
├── 📂 locales/           # Internationalization files
│   ├── en.json           # English translations
│   ├── es.json           # Spanish translations
│   └── fr.json           # French translations
├── 📂 utils/             # Utility functions and helpers
├── 📂 config/            # Configuration files
├── 📄 index.js           # Main application entry point
├── 📄 config.js          # Bot configuration
└── 📄 package.json       # Project dependencies and scripts
```

## 🎮 Commands

### Music Commands
- `/play <song>` - Play a song or playlist
- `/pause` - Pause the current track
- `/resume` - Resume playback
- `/skip` - Skip to the next song
- `/queue` - Display the current queue
- `/volume <1-100>` - Adjust playback volume

### Moderation Commands
- `/kick <user> [reason]` - Kick a user from the server
- `/ban <user> [reason]` - Ban a user from the server
- `/warn <user> <reason>` - Warn a user
- `/clear <amount>` - Delete multiple messages

### Utility Commands
- `/help` - Display available commands
- `/ping` - Check bot latency
- `/serverinfo` - Display server information
- `/userinfo [user]` - Display user information

## ⚙️ Configuration

### Bot Permissions

Ensure your bot has the following permissions:
- Send Messages
- Use Slash Commands
- Connect (for voice channels)
- Speak (for music playback)
- Manage Messages (for moderation)
- Kick Members (if using moderation features)
- Ban Members (if using moderation features)

### Invite Link

Generate an invite link with proper permissions:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

## 🔧 Development

### Available Scripts

```bash
# Start the bot in production mode
npm start

# Start the bot in development mode with nodemon
npm run dev

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Commands

1. Create a new file in the appropriate `commands/` subdirectory
2. Export an object with the command structure:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example command'),
    async execute(interaction) {
        await interaction.reply('Hello World!');
    },
};
```

### Adding New Features

1. Create a new directory in `features/`
2. Implement your feature with proper error handling
3. Register event listeners in the appropriate `events/` file
4. Update configuration if needed

## 📦 Dependencies

### Core Dependencies
- **discord.js** - Discord API wrapper
- **@discordjs/rest** - REST API interactions
- **@discordjs/voice** - Voice connection handling
- **sequelize** - SQL ORM for database operations
- **better-sqlite3** - SQLite database driver

### Music & Media
- **@distube/soundcloud** - SoundCloud integration
- **@distube/spotify** - Spotify integration
- **ytdl-core** - YouTube audio extraction

### Utilities & Tools
- **axios** - HTTP client for API requests
- **canvas** - Image manipulation and generation
- **i18n** - Internationalization support
- **winston** - Logging framework
- **node-cron** - Task scheduling
- **dotenv** - Environment variable management

### Web Dashboard
- **express** - Web server framework
- **express-session** - Session management
- **passport** - Authentication middleware
- **passport-discord** - Discord OAuth2 strategy

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m 'Add: Amazing new feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Follow ESLint configuration
- Write descriptive commit messages
- Add JSDoc comments for functions
- Include error handling for all async operations

## 📝 Changelog

### Version 2.0.0 (Latest)
- Added Spotify and SoundCloud integration
- Implemented web dashboard
- Enhanced moderation features
- Multi-language support
- Performance optimizations

### Version 1.5.0
- Added slash command support
- Improved music quality
- Database integration
- Basic moderation commands

## 🐛 Troubleshooting

### Common Issues

**Bot not responding to commands:**
- Verify the bot token is correct
- Check if the bot has necessary permissions
- Ensure the bot is online and connected

**Music not playing:**
- Verify voice channel permissions
- Check if FFmpeg is installed
- Ensure YouTube/Spotify APIs are configured

**Database errors:**
- Run database migrations: `npm run db:migrate`
- Check file permissions for SQLite database
- Verify database path in configuration

## 👨‍💻 Author

**CoderBiBi**
- GitHub: [@CoderBiBi](https://github.com/CoderBiBi)
- Discord: CoderBiBi#0000

## 🙌 Acknowledgments

- Discord.js community for excellent documentation
- Contributors who helped improve this project
- The open-source community for inspiration and tools


<div align="center">
  <p>Made with ❤️ by CoderBiBi</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
