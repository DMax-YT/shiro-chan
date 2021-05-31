const axios = require("axios").default;
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

async function cum(msg, [user], locale) {
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
  if (userMention === msg.member) {
    msg.channel.send(translate("cum.selfError", locale));
    return;
  }

  const provider = getRandomItem([cumNeko, cumNekoChxdn, cumNekosFun]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    cum(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    cum(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("cum.action", locale, {
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

async function cumNeko() {
  return await neko.nsfw.cumsluts().then((r) => r.url);
}
async function cumNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cum/img")
    .then((req) => req.data.url);
}
async function cumNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/cum")
    .then((req) => req.data.image);
}

module.exports = {
  name: "cum",
  execute: cum,
  alias: [],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
