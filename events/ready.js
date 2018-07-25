exports.run = async (bot) => {
  bot.user.setActivity('PLAYING');
  setInterval(() => {
    let status = [`Mention me (@${bot.user.username})`, `On SKZ Gaming!`, `On 📡 ${bot.channels.size} Channel!`, `On 🌎 ${bot.guilds.size} Server!`, `With 👥 ${bot.users.size} User!`]
    let random = Math.floor(Math.random() * status.length)
    bot.user.setActivity(status[random]);
  }, 20000);
  console.log(`${bot.user.username} Sudah online beb`);
};