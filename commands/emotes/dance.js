const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");
const getRandomItem = require("../../helpers/getRandomItem");

async function dance(msg, args, locale) {
  const provider = getRandomItem([
    danceNekoChxdn,
    danceNekosBest,
    dancePurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    dance(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    dance(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("dance.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function danceNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/dance/img")
    .then((req) => req.data.url);
}

async function danceNekosBest() {
  return await axios
    .get("https://nekos.best/dance")
    .then((req) => req.data.url);
}

async function dancePurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/dance/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "dance",
  execute: dance,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
