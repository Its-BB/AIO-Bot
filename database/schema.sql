CREATE TABLE IF NOT EXISTS configs (
  guild_id TEXT PRIMARY KEY,
  prefix TEXT DEFAULT '!',
  language TEXT DEFAULT 'en',
  welcome_channel TEXT,
  goodbye_channel TEXT,
  mod_log_channel TEXT,
  level_up_channel TEXT
);

CREATE TABLE IF NOT EXISTS users (
  user_id TEXT,
  guild_id TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  balance INTEGER DEFAULT 0,
  bank INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, guild_id)
);

CREATE TABLE IF NOT EXISTS mod_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT,
  user_id TEXT,
  action TEXT,
  reason TEXT,
  moderator_id TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS economy_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT,
  name TEXT,
  price INTEGER,
  description TEXT
);

CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT,
  user_id TEXT,
  channel_id TEXT,
  status TEXT DEFAULT 'open'
);