const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function cry(msg, args, locale) {
  const provider = getRandomItem([
    cryNekoChxdn,
    cryShiro,
    cryNekosBest,
    cryPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    cry(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    cry(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("cry.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function cryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cry/img")
    .then((req) => req.data.url);
}

async function cryShiro() {
  return await axios
    .get("https://shiro.gg/api/images/cry")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : cryShiro()));
}

async function cryNekosBest() {
  return await axios.get("https://nekos.best/cry").then((req) => req.data.url);
}

async function cryPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/cry/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "cry",
  execute: cry,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
