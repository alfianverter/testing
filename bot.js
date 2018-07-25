const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');
const db = require('quick.db');
const send = require('quick.hook');
const ms = require('ms');
const DEFAULTPREFIX = "skz";
const ownerID = "444454206800396309";
const active = new Map();
const os = require('os');
const arch = os.arch()
const cmdFiles = fs.readdir("./commands/");
const used = process.memoryUsage().heapUsed / 1024 / 1024;

let totalSeconds = process.uptime();
let realTotalSecs = Math.floor(totalSeconds % 60);
let days = Math.floor((totalSeconds % 31536000) / 86400);
let hours = Math.floor((totalSeconds / 3600) % 24);
let mins = Math.floor((totalSeconds / 60) % 60);
let cooldown = new Set();
let cdseconds = 5;
let usernameUser = 'displayAvatarURL';

var bot = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

const mentionHook = new Discord.WebhookClient("455572007644430346", "3h04jl6_fr7AUJ88D7vMrrsUOu5j9GlX3fcQAqat7Fto6h-1XBIArmglmBQf8R2DGIv7");

// Bot Stats
const botStats = {
  totalGuildsID: '458494762258006016',
  totalUsersID: '458494640828710913',
  totalChannelsID: '458495013811257344'
}

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
	if (err) console.log(err);
	files.forEach(file => {
		let eventFunc = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		bot.on(eventName, (...args) => eventFunc.run(bot, ...args));
	});
});


bot.on("message", async message => {
  
  var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!PREFIXES[message.guild.id]) {
    PREFIXES[message.guild.id] = {
      PREFIXES: DEFAULTPREFIX
    };
  }


  var PREFIX = PREFIXES[message.guild.id].PREFIXES;
  
  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  if (!message.guild) return;

  if (cooldown.has(message.author.id)) {
    return message.reply("You have to wait 5 seconds between commands.").then(m => m.delete(5000));
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  var args = message.content.slice(PREFIX.length).trim().split(' ');
  var command = args.shift().toLowerCase();
  let cmd;
	if (bot.commands.has(command)) {
		cmd = bot.commands.get(command);
	} else if (bot.aliases.has(command)) {
		cmd = bot.commands.get(bot.aliases.get(command));
	}
		cmd.run(bot, message, args, PREFIX);

  

fs.readdir('./commands/', (err, files) => {
	if (err)
		console.error(err);
	let jsfiles = files.filter(f => f.split('.')
		.pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('No commands to load!');
		return;
	}
	console.log(`[Commands]\tLoaded a total amount ${files.length} Commands`);
	jsfiles.forEach(f => {
		let props = require(`./commands/${ f }`);
		props.fileName = f;
		bot.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			bot.aliases.set(alias, props.help.name);
		});
	});
});


  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

  if (message.isMentioned("444454206800396309")) {
    mentionHook.send(`${message.author.tag} MENTION KAMU TADI`)
  }

  
  if (command == "esay") {
    if (!message.member.roles.some(r => ["Owner", "Admin", "Moderator", "CoLeader", "Mod", "Developer"].includes(r.name)))
      return message.reply("Sorry, you don't have role named: **Owner/mod/Coleader** to use this!");

    const sayMessage = args.join(" ");

    let servIcon = message.guild.iconURL;
    let esayEmbed = new Discord.RichEmbed()
      .setTitle("Say")
      .setColor("#0537ff")
      .setThumbnail(servIcon)
      .setDescription(`Said by ${message.author}`)
      .addField("Message", `${sayMessage}`)
      .setTimestamp();

    const esayMessage = args.join(" ");

    message.delete({timeout: 1000});

    message.channel.send(esayEmbed);
  }

  if (command == "botinfo") {
    let bicon = bot.user.displayAvatarURL;
    let helpmember = new Discord.RichEmbed()
      .setDescription("Bot Info:")
      .setColor('RANDOM')
      .addField("Bot Name", `${bot.user.tag}`)
      .addField("Creator", "<@!444454206800396309> | Sharif#2769")
      .addField("Created At", `${bot.user.createdAt}`)
      .addField('Node', `${process.version}`)
      .addField('Library', 'discord.js')
      .addField('Operating System', `${os.platform} ${arch}`)
      .addField(`Want to see last update ${bot.user.username}?`, `Usage \`${PREFIX}changelog\``)
      .addField(`Found any bug?`, `Usage \`${PREFIX}bug <specify a bug>\``)
      .addField("**Usefull link**", "[Invite me](https://discordapp.com/oauth2/authorize?client_id=452360666020577281&scope=bot&permissions=734931) | [Vote me](https://discordbots.org/bot/452360666020577281/vote) | [Support Server](https://discord.gg/kDAYc8M)") 
      .setThumbnail(bicon)
      .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(helpmember);
  };

  if (command == "serverinfo") {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
      .setAuthor("Info Server")
      .setColor("RANDOM")
      .setThumbnail(sicon)
      .addField("📝Server Name", message.guild.name)
      .addField("📅Created At", message.guild.createdAt)
      .addField(`👑Owner:`, `${message.guild.owner}`)
      .addField('👥Total Members', `**${message.guild.memberCount}**`, true)
      .addField('🙇🏻Humans', `**${message.guild.members.filter(member => !member.user.bot).size}**`, true)
      .addField('🤖Bots', `**${message.guild.members.filter(member => member.user.bot).size}**`, true)
      .addField('Member Status', `**${message.guild.members.filter(o => o.presence.status === 'online').size}**<:online:449590947165110283> Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}**<:away:449590947110584321> Idle/Away\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}**<:dnd:449590946879766539> Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}**<:offline:449590947047669760> Offline/Invisible`)
      .addField("You Joined", message.member.joinedAt)
      .addField('Your Current Roles', `${message.member.roles.map(roles => roles).join(' => ')}`) 
      .addField('Guild Current Roles', `${message.guild.roles.map(roles => roles).join('  ')}`) 
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(serverembed);

  };
});

bot.on('guildCreate', guild => {

  bot.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${bot.guilds.size}`);
  bot.channels.get(botStats.totalUsersID).setName(`Total Users : ${bot.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  bot.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${bot.channels.size}`);
});

bot.on('guildDelete', guild => {

  bot.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${bot.guilds.size}`);
  bot.channels.get(botStats.totalUsersID).setName(`Total Users : ${bot.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  bot.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${bot.channels.size}`);
});

bot.on("guildCreate", guild => {
    const liveJoin = bot.channels.get("462111128114298890"); //CHANGE TO YOUR CHANNEL-ID TO GET NOTIFICATIONS
    let liveJEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Your Bot Has Started Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Gained**: ${guild.memberCount}`)
    send(liveJoin, liveJEmbed, {
        name: `Minasaki Life Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })
 });
 bot.on("guildDelete", guild => {
    const liveLeave = bot.channels.get("462111128114298890"); //CHANGE TO YOUR CHANNEL-ID TO GET NOTIFICATIONS
    let liveLEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Your Bot Has Stopped Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    send(liveLeave, liveLEmbed, {
        name: `Minasaki Life Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })
 });

bot.on("message", async autoresponder => {
  var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!PREFIXES[autoresponder.guild.id]) {
    PREFIXES[autoresponder.guild.id] = {
      PREFIXES: DEFAULTPREFIX
    };
  }

  var PREFIX = PREFIXES[autoresponder.guild.id].PREFIXES;

  if (autoresponder.author.bot) return;
  if (autoresponder.channel.type === "dm") return;

  let msg = autoresponder.content.toLowerCase();
  let sender = autoresponder.author;
  if (autoresponder.content.startsWith(PREFIX)) return;

  if (autoresponder.content === `<@${bot.user.id}>`) {
    return autoresponder.reply("My prefix is `" + PREFIX + "` \nneed help? type `" + PREFIX + "help`\nSupport Me!\nType `" + PREFIX + "invite` thanks.😊")
  }

  if (autoresponder.content === `<@!${bot.user.id}>`) {
    return autoresponder.reply("My prefix is `" + PREFIX + "` \nneed help? type `" + PREFIX + "help`\nSupport Me!\nType `" + PREFIX + "invite` thanks.😊")
  }

});

bot.login(process.env.TOKEN);