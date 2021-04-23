const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function dance(msg, args) {
  const locale = "ru-RU";

  let imageUrl;
  try {
    imageUrl = await danceNekoChxdn();
  } catch {
    dance(msg, args);
    return;
  }

  if (!imageUrl) {
    dance(msg, args);
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

module.exports = {
  name: "dance",
  execute: dance,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
