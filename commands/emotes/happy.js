const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function happy(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await happyNekoChxdn();
  } catch {
    happy(msg, [user]);
    return;
  }

  if (!imageUrl) {
    happy(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} чувствует прилив счастья`,
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

module.exports = {
  name: "happy",
  description: "Позволяет вам почувствовать прилив счастья",
  execute: happy,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
