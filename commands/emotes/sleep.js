const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function sleep(msg, args) {
  const locale = "ru-RU";

  let imageUrl;
  try {
    imageUrl = await sleepNekoChxdn();
  } catch {
    sleep(msg, args);
    return;
  }

  if (!imageUrl) {
    sleep(msg, args);
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

module.exports = {
  name: "sleep",
  execute: sleep,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
