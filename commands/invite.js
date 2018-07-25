const Discord = require("discord.js");
module.exports.run = async (bot, message, args, ops, PREFIX) => {
  let API = (bot.ping).toFixed(2);
  let postMsg = await message.channel.send('**Please Wait...**');
  message.channel.startTyping();
 const embed = new Discord.RichEmbed()
    .setColor(0xf44336)
    .setTitle("Invite | Support:") 
    .setDescription("[Invite me](https://discordapp.com/oauth2/authorize?client_id=452360666020577281&scope=bot&permissions=309607479) | [Vote me](https://discordbots.org/bot/452360666020577281/vote) | [Support server](https://discord.gg/kDAYc8M)")    
    .addField(`Found any bug?`, `Usage: ${PREFIX}bug <specify a bug>`) 
    .setFooter("Thanks for support | Created By Sharif#2769");
  setTimeout(() => {
postMsg.edit(embed)
}, 1000);
  message.channel.stopTyping(true);
};

module.exports.help = { 
name: "invite" 
} 
