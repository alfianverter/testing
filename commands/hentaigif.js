const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {
    
    let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
    if (!message.channel.nsfw) return message.reply(" You must be in a N.S.F.W channel to use this command.");
  let postMsg = await message.channel.send('**🔍Please Wait...**');
  message.channel.startTyping();
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Hentai is art.")
    .setImage(body.url)
    .setColor("RANDOM")
    .setFooter("Powered by: nekos.life");
  setTimeout(() => {
postMsg.edit(hentaiEmbed) 
}, 1000);
message.channel.stopTyping(true);
}

module.exports.help = {
    name: "hentaigif"
}
