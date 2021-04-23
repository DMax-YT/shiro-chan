const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function confused(msg, args) {
  const locale = "ru-RU";

  let imageUrl;
  try {
    imageUrl = await confusedNekoChxdn();
  } catch {
    confused(msg, args);
    return;
  }

  if (!imageUrl) {
    confused(msg, args);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("confused.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function confusedNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/confused/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "confused",
  execute: confused,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
