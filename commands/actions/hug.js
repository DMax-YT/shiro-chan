const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function hug(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь обнять сам(а) себя...");
    return;
  }

  const provider = getRandomItem([
    hugNeko,
    hugNekoChxdn,
    hugSra,
    cuddleNeko,
    cuddleNekoChxdn,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    hug(msg, [user]);
    return;
  }

  if (!imageUrl) {
    hug(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} обнимает ${userMention}`,
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

async function cuddleNeko() {
  return await neko.sfw.cuddle().then((r) => r.url);
}
async function cuddleNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cuddle/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "hug",
  description: "Позволяет вам обнять кого-либо",
  execute: hug,
  alias: ["cuddle"],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
