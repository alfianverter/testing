const Discord = require ("discord.js");
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");
   let postMsg = await message.channel.send('**Please Wait...**');
   message.channel.startTyping();
    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor("hope you like it lol", bot.user.avatarURL)
                .setFooter("Random Image from random-puppy")
                .setImage(url);
            setTimeout(() => {
        postMsg.edit(embed)
        }, 2000);
message.channel.stopTyping(true);
        })
}

module.exports.help = { 
name: "xxx", 
description: "", 
usage: ""
} 