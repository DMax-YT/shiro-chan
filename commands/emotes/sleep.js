const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function sleep(msg, args, locale) {
  const provider = getRandomItem([sleepNekoChxdn, sleepShiro]);
  let imageUrl;
  try {
    imageUrl = await sleepNekoChxdn();
  } catch {
    sleep(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    sleep(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("sleep.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function sleepNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/sleep/img")
    .then((req) => req.data.url);
}

async function sleepShiro() {
  return await axios
    .get("https://shiro.gg/api/images/sleep")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : sleepShiro()));
}

module.exports = {
  name: "sleep",
  execute: sleep,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
