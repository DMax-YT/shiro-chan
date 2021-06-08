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

async function hug(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("hug.selfError", locale));
    return;
  }

  const provider = getRandomItem([
    hugNeko,
    hugNekosBest,
    hugNekoChxdn,
    hugNekosFun,
    hugSra,
    hugShiro,
    hugPurrbot,
    cuddleNeko,
    cuddleNekosBest,
    cuddleNekoChxdn,
    cuddleNekosFun,
    cuddlePurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    hug(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    hug(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("hug.action", locale, {
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

async function hugNeko() {
  return await neko.sfw.hug().then((r) => r.url);
}
async function hugNekosBest() {
  return await axios.get("https://nekos.best/hug").then((req) => req.data.url);
}
async function hugNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/hug/img")
    .then((req) => req.data.url);
}
async function hugSra() {
  return await axios
    .get("https://some-random-api.ml/animu/hug")
    .then((req) => req.data.link);
}
async function hugNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/hug")
    .then((req) => req.data.image);
}
async function hugShiro() {
  return await axios
    .get("https://shiro.gg/api/images/hug")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : hugShiro()));
}
async function hugPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/hug/gif")
    .then((req) => req.data.link);
}

async function cuddleNeko() {
  return await neko.sfw.cuddle().then((r) => r.url);
}
async function cuddleNekosBest() {
  return await axios
    .get("https://nekos.best/cuddle")
    .then((req) => req.data.url);
}
async function cuddleNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cuddle/img")
    .then((req) => req.data.url);
}
async function cuddleNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/cuddle")
    .then((req) => req.data.image);
}
async function cuddlePurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/cuddle/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "hug",
  execute: hug,
  alias: ["cuddle"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
