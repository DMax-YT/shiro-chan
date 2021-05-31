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

async function kiss(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("kiss.selfError", locale));
    return;
  }

  const provider = getRandomItem([
    kissNeko,
    kissNekosBest,
    kissNekoChxdn,
    kissShiro,
    kissNekosFun,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    kiss(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    kiss(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("kiss.action", locale, {
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

async function kissNeko() {
  return await neko.sfw.kiss().then((r) => r.url);
}
async function kissNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/kiss/img")
    .then((req) => req.data.url);
}
async function kissNekosBest() {
  return await axios
    .get("https://nekos.best/kiss")
    .then((req) => req.data.url);
}
async function kissNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/kiss")
    .then((req) => req.data.image);
}
async function kissShiro() {
  return await axios
    .get("https://shiro.gg/api/images/kiss")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : kissShiro()));
}

module.exports = {
  name: "kiss",
  execute: kiss,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
