const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function blush(msg, args, locale) {
  const provider = getRandomItem([blushShiro, blushNekoChxdn, blushPurrbot]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    blush(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    blush(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("blush.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function blushNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/blush/img")
    .then((req) => req.data.url);
}

async function blushShiro() {
  return await axios
    .get("https://shiro.gg/api/images/blush")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : blushShiro()));
}

async function blushPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/blush/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "blush",
  execute: blush,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
