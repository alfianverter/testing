const Discord = require("discord.js");
const superagent = require("superagent");
const send = require("quick.hook");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent
    .get(`https://nekos.life/api/lewd/neko`);
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");
  
  let postMsg = await message.channel.send('**🔍Please Wait...**');
   message.channel.startTyping();
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Why does someone put a command like this?")
    .setImage(body.neko)
    .setFooter("Powered by: nekos.life");

    setTimeout(() => {
        postMsg.edit(hentaiEmbed)
        }, 2000);
message.channel.stopTyping(true);

}

module.exports.help = {
    name: "lewd"
}
