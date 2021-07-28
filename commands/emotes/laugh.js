const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

async function laugh(msg, args, locale) {
  const provider = getRandomItem([
    laughNekosBest,
    laughNekoChxdn,
    laughNekosFun,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    laugh(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    laugh(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("laugh.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function laughNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/laugh/img")
    .then((req) => req.data.url);
}
async function laughNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/laugh")
    .then((req) => req.data.image);
}
async function laughNekosBest() {
  return await axios
    .get("https://nekos.best/api/v1/laugh")
    .then((req) => req.data.url);
}

module.exports = {
  name: "laugh",
  execute: laugh,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
