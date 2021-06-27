const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function blowjob(msg, [user], locale) {
  if (!msg.channel.nsfw) {
    msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    blowjobNeko,
    blowjobNeko2,
    blowjobNekosFun,
    blowjobNekosFun2,
    blowjobPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    console.log("Error");
    blowjob(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    blowjob(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("blowjob.alone", locale),
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("blowjob.me", locale),
    });
  } else {
    await msg.channel.send({
      embed: {
        description: translate("blowjob.action", locale, {
          attacker: msg.member,
          victim: userMention,
        }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    });
  }
}

async function blowjobNeko() {
  return await neko.nsfw
    .blowJob()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko()));
}
async function blowjobNeko2() {
  return await neko.nsfw
    .bJ()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko2()));
}
async function blowjobNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/blowjob")
    .then((req) => req.data.image);
}
async function blowjobNekosFun2() {
  return await axios
    .get("http://api.nekos.fun:8080/api/bj")
    .then((req) => req.data.image);
}
async function blowjobPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/nsfw/blowjob/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "blowjob",
  execute: blowjob,
  alias: ["bj"],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
