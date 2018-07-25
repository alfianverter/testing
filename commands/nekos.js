const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("Please use **NSFW** Channel.").then(m => m.delete(3000));
  let postMsg = await message.channel.send('**🔍Please Wait...**');
   message.channel.startTyping();
  const image = await neko.getNSFWNeko();
  const embed = new Discord.RichEmbed()
    .setAuthor("Minasaki -- Neko")
    .setColor('RANDOM')
    .setImage(image.url)
    .setFooter(`Powered by: nekos.life`);
  setTimeout(() => {
        postMsg.edit(embed)
        }, 2000);
message.channel.stopTyping(true);
};


module.exports.help = {
  name: "nsfwneko",
  category: "NSFW",
  description: "Print out neko hentai Images.",
  usage: "nsfwneko",
  param: "",
  aliases: "nneko"
}
