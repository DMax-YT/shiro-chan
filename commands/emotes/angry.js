const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function angry(msg, [user]) {
  const locale = "ru-RU";

  let imageUrl;
  try {
    imageUrl = await angryNekoChxdn();
  } catch {
    angry(msg, [user]);
    return;
  }

  if (!imageUrl) {
    angry(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("angry.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function angryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/angry/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "angry",
  execute: angry,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
