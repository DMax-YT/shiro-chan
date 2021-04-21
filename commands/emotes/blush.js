const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function blush(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await blushNekoChxdn();
  } catch {
    blush(msg, [user]);
    return;
  }

  if (!imageUrl) {
    blush(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} смущается`,
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

module.exports = {
  name: "blush",
  description: "Позволяет вам смутиться",
  execute: blush,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
