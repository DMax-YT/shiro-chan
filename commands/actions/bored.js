const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function bored(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await boredNekoChxdn();
  } catch {
    bored(msg, [user]);
    return;
  }

  if (!imageUrl) {
    bored(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} скучает`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function boredNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/bored/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "bored",
  description: "Позволяет вам заскучать",
  execute: bored,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
