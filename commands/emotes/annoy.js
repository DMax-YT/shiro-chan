const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function annoy(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await annoyNekoChxdn();
  } catch {
    annoy(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    annoy(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("annoy.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

async function annoyNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/annoy/img")
    .then((req) => req.data.url);
}

/*
module.exports = {
  name: "annoy",
  execute: annoy,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
*/
