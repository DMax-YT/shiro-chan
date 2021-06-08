const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

async function happy(msg, args, locale) {
  const provider = getRandomItem([happyNekoChxdn, happyPurrbot]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    happy(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    happy(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("happy.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function happyNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/happy/img")
    .then((req) => req.data.url);
}
async function happyPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/smile/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "happy",
  execute: happy,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
