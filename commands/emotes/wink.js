const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function wink(msg, args) {
  const locale = "ru-RU";

  let imageUrl;
  try {
    imageUrl = await winkNekoChxdn();
  } catch {
    wink(msg, args);
    return;
  }

  if (!imageUrl) {
    wink(msg, args);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("wink.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function winkNekoChxdn() {
  return await axios
    .get("https://some-random-api.ml/animu/wink")
    .then((req) => req.data.link);
}

module.exports = {
  name: "wink",
  execute: wink,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
